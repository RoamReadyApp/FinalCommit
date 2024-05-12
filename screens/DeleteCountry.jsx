import React, { useState ,useEffect } from "react";
import { View, TextInput, Button, Alert, Image , StyleSheet ,Text, TouchableOpacity} from "react-native";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadResumableBytes,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker";
import { db } from "../firebase/Config";
import { router } from "expo-router";
const AddFlights = () => {
  const [productName, setProductName] = useState("");
  const [SinglePrice, setSinglePrice] = useState("");
  const [DoublePrice, setDoublePrice] = useState("");
//   const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setUploading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const items = ['Item 1', 'Item 2', 'Item 3'];

  //start up 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const firestore = getFirestore();
      const productsCollection = collection(firestore, "country");
      const querySnapshot = await getDocs(productsCollection);
      const productsData = querySnapshot.docs.map(async (doc) => {
        const product = { id:doc.id ,...doc.data()};
        if (product.photoURL) {
          try {
            // Fetch the download URL for the image from Firebase Storage
            const storage = getStorage();
            const imageRef = ref(storage, product.photoURL);
            const imageUrl = await getDownloadURL(imageRef);
            // Update the product with the correct image URL
            return { ...product, photoURL: imageUrl };
          } catch (error) {
            console.error("Error fetching image:", error);
            // Handle the case where image download fails
            // For example, set a placeholder image URL or mark the product as having no image
            return { ...product, photoURL: null };
          }
        }
        return product;
      });
      const updatedProductsData = await Promise.all(productsData);
      setProducts(updatedProductsData);
      setIsLoading(false); // Set loading to false after fetching and updating data
    };

    fetchProducts();
  }, []);

  const pickFile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All, // Images and videos
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error Picking Image:", error);
    }
  };

  const uploadFile = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await fetch(uri).then((response) => response.blob());
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);
      await ref.put(blob);
     setUrl(await ref.getDownloadURL());
      console.log("Download URL:", url);
      Alert.alert("Upload Completed");
      // setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };
//   console.log("selectedValue : ", products);

  
async function handleDeleteCountry(id) {
    try {
      await deleteDoc(doc(db, "country", id));
      console.log("Document deleted with ID: ", id);
      router.replace(`Admin/CountryDelete`);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }
  

//   console.log('cid : ' , selectedValue);
  // console.log('name : ' , productName);
  // console.log('image : ' , image);
  // console.log('des : ' , description);
  // console.log('single : ' , SinglePrice);
  // console.log('double : ' , DoublePrice);


  return (
    <View style={styles.container}>
      <Picker
        // style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 , borderRadius: 5,}}
        style={styles.button}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {products.map((item) => (
            
          <Picker.Item label={item.name} value={item.id} key={item.id} /> // Use item.id as the value
        
        ))}
      </Picker>
      
        <TouchableOpacity
            onPress={() => {
                handleDeleteCountry(selectedValue);
              }}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Delete Country</Text>
        </TouchableOpacity>
      
    </View>
  );
};



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center" ,
      margin: 15,
    },
    button: {
      width:200,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: '#841584',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      color:'white',
      shadowColor: 'rgba(0,0,0, .4)', // Optional shadow for iOS
      shadowOffset: { height: 1, width: 1 }, // Optional shadow for iOS
      shadowOpacity: 1, // Optional shadow for iOS
      shadowRadius: 1, // Optional shadow for iOS
      elevation: 2, // Optional elevation for Android
      marginTop:5,
      marginBottom:10,
    },
    button1: {
      width:200,
      height:100,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: '#841584',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      shadowColor: 'rgba(0,0,0, .4)', // Optional shadow for iOS
      shadowOffset: { height: 1, width: 1 }, // Optional shadow for iOS
      shadowOpacity: 1, // Optional shadow for iOS
      shadowRadius: 1, // Optional shadow for iOS
      elevation: 2 // Optional elevation for Android
    },
    
    buttonText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center'
    },
    boldText: {
      fontWeight: 'bold',
      color: 'black', // optional if you want the bold text to have the same color
    }
  });
export default AddFlights;