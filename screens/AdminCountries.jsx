import { router } from "expo-router";
import React, { useState } from "react";
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
} from "react-native";
// import { Button, TouchableOpacity } from "react-native-web";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import firebase from "firebase/compat/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const Hotels = () => {
  
    const [image, setImage] = useState("");
    const [country, setCountry] = useState("");
    const [uploading , setUploading] = useState(false);

    const [url, setUrl] = useState("");
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
      } catch (err) {
        console.error("Error Picking Image:", err);
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
      } catch (err) {
        console.error("Upload failed:", err);
        Alert.alert("Upload Failed");
      } finally {
        setUploading(false);
      }
    };
  
    const handleAddCountry = async () => {
      try {
        if (!country || !image) {
          Alert.alert("Error", "Please fill in all fields.");
          return;
        }
        // const storage = getStorage();
        // const photoRef = ref(storage, ${Date.now()}_${image.name});
        // const x = await uploadResumableBytes(photoRef, image.data);
        // const photoURL = await getDownloadURL(photoRef);
        const firestore = getFirestore();
        const productsCollection = collection(firestore, "country");
        const newProduct = {
          name: country,
          photoURL: url,
        };
        await addDoc(productsCollection, newProduct);
        Alert.alert("Success", "Product added successfully.");
        setCountry("");
        setImage(null);
      } catch (err) {
        console.error("Error adding product:", err);
        Alert.alert("Error", "Failed to add product. Please try again.");
      }
    };
  
    return (
    <View style={styles.container}>
      <View >
            <Pressable style={styles.backButton} onPress={()=> router.replace('/Admin/Home')}>
                    <FontAwesome name='chevron-circle-left' size={35} color={'#127ac1'}/>
                    {/* <Text style={styles.backButtonText}> </Text> */}
                   
            </Pressable>
            </View>
      <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:20 , color:'#127ac1'}} >
                ADD COUNTRY 
      </Text>
       <TouchableOpacity
            onPress={pickFile}
            style={styles.button1}
        >
            <Text style={styles.buttonText}>Choose Image </Text>
        </TouchableOpacity>
        <Text> </Text>
        <View style = {styles.image}>
          {image && <Image
              source = {{uri : image }}
              style ={{width:300 , height:300}}
          />}
          <TouchableOpacity
            onPress={uploadFile}
            style={styles.button1}
        >
            <Text style={styles.buttonText}>Upload Image </Text>
        </TouchableOpacity>
        <Text>  </Text>

        </View>
      <TextInput
        placeholder="Country Name"
        value={country}
        onChangeText={setCountry}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 }}
        />
        <TouchableOpacity
            onPress={handleAddCountry}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <Text>  </Text>
        {/* <TouchableOpacity
            onPress={handleDeleteCountry}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>       */}
        <Pressable onPress={()=>router.replace("/Admin/Hotel")}>
            <Text style={{ marginTop: 10 }}>Continue?</Text>
        </Pressable>
        <Pressable onPress={()=>router.replace("/Admin/Home")}>
            <Text style={{ marginTop: 10 }}>Go Home Page?</Text>
        </Pressable>
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
      backgroundColor: '#127ac1',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      shadowColor: 'rgba(0,0,0, .4)', // Optional shadow for iOS
      shadowOffset: { height: 1, width: 1 }, // Optional shadow for iOS
      shadowOpacity: 1, // Optional shadow for iOS
      shadowRadius: 1, // Optional shadow for iOS
      elevation: 2 // Optional elevation for Android
    },
    button1: {
      width:200,
      height:100,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: '#127ac1',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      shadowColor: 'rgba(0,0,0, .4)', // Optional shadow for iOS
      shadowOffset: { height: 1, width: 1 }, // Optional shadow for iOS
      shadowOpacity: 1, // Optional shadow for iOS
      shadowRadius: 1, // Optional shadow for iOS
      elevation: 2 // Optional elevation for Android
    },
    backButton:{
      color:'#127ac1',
      // borderStartWidth:30,
     alignContent:'space-around',
     paddingBottom:30,
     marginLeft:-180,
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
  
  
  export default Hotels ;
  