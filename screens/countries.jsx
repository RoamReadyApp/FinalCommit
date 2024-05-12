import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {MaterialIcons} from '@expo/vector-icons';
const Countries = () => {
  
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

    return (
          
      <ScrollView  style={styles.scrollViewStyle} >
          <View style={styles.container}>
  
          <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:20 , color:'#127ac1'}} >
             CHOOSE COUNTRY 
          </Text>
          {/* <ScrollView contentContainerStyle={styles.scrollViewStyle}> */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        products.map((item) =>
        true ? (
          <TouchableOpacity
            onPress={() => {router.replace(`/Chose/${item.id}`);}}
            style={styles.button}
        >

              <View style={styles.container} key={item.id}>
              <Text style={styles.text}>{item.name}</Text>
              {item.photoURL ? (
                <Image
                  source={{ uri: item.photoURL }}
                  style={styles.imageButton}
                />
              ) : (
                <Text>No Image</Text>
              )}
            </View>        
            </TouchableOpacity>
            
          ) : null
        )
      )}
    {/* </ScrollView> */}

          </View>
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
      scrollViewStyle: {
          flex: 1,
          backgroundColor: '#fff',
        },
    container: {
      flex: 1,
      alignItems: "center" ,
    },
    button: {
           
      width: '30%', 
      height:300,
      marginLeft: 30,
      marginTop: 20,
      justifyContent: "flex-end",
      alignItems:"center",
      backgroundColor: '#fff',
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderRadius: 20,
      shadowColor: '#fff', // Optional shadow for iOS
      shadowOffset: { height: 1, width: 1 }, // Optional shadow for iOS
      shadowOpacity: 1, // Optional shadow for iOS
      shadowRadius: 1, // Optional shadow for iOS
      elevation: 2 // Optional elevation for Android
    },
    buttonText: {
      color: 'black',
      fontSize: 18,
      textAlign: 'center'
    },
    boldText: {
      fontWeight: 'bold',
      color: 'black', // optional if you want the bold text to have the same color
      fontSize:20
    },
  
    text: {
      fontSize: 18,
      marginBottom: 5,
    },
    imageButton: {
      width: 180,
      height: 250,
    },
  
  });
  
  
  export default Countries;
  