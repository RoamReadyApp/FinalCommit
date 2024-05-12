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



const Hotels = () => {
  
    const [image, setImage] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");
    const [edit, setEdit] = useState(false);
    const [deletehotel, setDelete] = useState(false);
    const [addHotel, setAdd] = useState(false);




    const handleDeleteHotel = async () => {
        try {
    
        } catch (error) {
            console.log('error', JSON.stringify(error));
            setError(error);
        }
      };

      

    const handleAddHotel = async () => {
        try {
    
        } catch (error) {
            console.log('error', JSON.stringify(error));
            setError(error);
        }
      };

      

    const handleEditHotel = async () => {
        try {
    
        } catch (error) {
            console.log('error', JSON.stringify(error));
            setError(error);
        }
      };


    return (
          
    
    <View style={styles.container}>
      
        <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:20 , color:'#841584'}} >Hotels </Text>
        <TouchableOpacity
            onPress={() => {setAdd(true);setEdit(false);setDelete(false);}}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <Text>  </Text>
        <TouchableOpacity
            onPress={() => {setDelete(true);setAdd(false);setEdit(false); }}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>  
        <Text> </Text>
        <TouchableOpacity
            onPress={() => {setEdit(true);setDelete(false);setAdd(false);}}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <Text>  </Text>
        <View>
            {edit ? (
                <View>
                    <TextInput
                        placeholder="Hotel Name"
                        value={country}
                        onChangeText={setCountry}
                        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 }}
                    />
                    <TextInput
                        placeholder="New Price"
                        value={country}
                        onChangeText={setCountry}
                        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 }}
                    />
                    <Text> </Text>
                    
                    <TouchableOpacity
                        onPress={() => {handleEditHotel}}
                        style={styles.button1}
                    >
                        <Text style={styles.buttonText}>EDIT</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text></Text>
            )}
        </View> <View> 
            {deletehotel ? (
                <View>
                    <TextInput
                        placeholder="Hotel Name"
                        value={country}
                        onChangeText={setCountry}
                        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 }}
                    />
                    
                    <TouchableOpacity
                        onPress={() => {handleDeleteHotel}}
                        style={styles.button1}
                    >
                        <Text style={styles.buttonText}>DELETE</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text></Text>
            )}
        </View>
        <View>
            {addHotel ? (
                <View>
                    <TextInput
                        placeholder="Image"
                        value={country}
                        onChangeText={setCountry}
                        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 }}
                    />
                    <TextInput
                        placeholder="Hotel Name"
                        value={country}
                        onChangeText={setCountry}
                        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 }}
                    />
                    <TextInput
                        placeholder="Price"
                        value={country}
                        onChangeText={setCountry}
                        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 }}
                    />
                    
                    <TouchableOpacity
                        onPress={() => {handleAddHotel}}
                        style={styles.button1}
                    >
                        <Text style={styles.buttonText}>ADD</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text></Text>
            )}
        </View>
             
        <Pressable onPress={()=>router.replace("/Admin/Hotels")}>
            <Text style={{ marginTop: 10 }}>Continue?</Text>
        </Pressable>
        <Pressable onPress={()=>router.navigate("/Admin/Home")}>
            <Text style={{ marginTop: 10 }}>Go Home Page?</Text>
        </Pressable>
  <Text>{error.code}</Text>
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
      shadowColor: 'rgba(0,0,0, .4)', // Optional shadow for iOS
      shadowOffset: { height: 1, width: 1 }, // Optional shadow for iOS
      shadowOpacity: 1, // Optional shadow for iOS
      shadowRadius: 1, // Optional shadow for iOS
      elevation: 2 // Optional elevation for Android
    },
    button1:{
      width:200,
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
      elevation: 2, // Optional elevation for Android
      marginLeft:290,
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
  