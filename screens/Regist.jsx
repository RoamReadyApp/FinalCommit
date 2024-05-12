import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { register } from "../firebase/auth";
import MyButton from "../Components/MyButton";
// import { addUser } from "../firebase/todos";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const Regist = () => {
    // const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

  const handlePress = async () => {
    try {
        const credentials = await register(email, password);
        await addUser(credentials.user.uid);
        console.log('credentials', credentials);
        console.log('user', credentials.user);
        console.log('uid', credentials.user.uid);
        router.navigate(`/app`);
    } catch (error) {
        console.log('error', JSON.stringify(error));
        setError(error);
    }
  };


  console.log("User phone: " , phone);
  console.log("User name: " , name);

  async function addUser(uid) {
    try {
      const firestore = getFirestore();
          const UsersCollection = collection(firestore, "User");
          const newUser = {
            uid : uid,
            name: name,
            email : email ,
            phone : phone ,
          };

          console.log("User phone in add: " , phone);
          console.log("User name in add : " , name);

          console.log("User phone in adddd : " , newUser.phone);
          console.log("User name in addddd: " , newUser.name);


          await addDoc(UsersCollection, newUser);
          Alert.alert("Success", "User added successfully.");
          setEmail("");
          setName("");
          setPhone("");
        
      // const docRef = await addDoc(collection(db, uid), {uid,email});
      console.log("Document written with ID: ", uid);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:20 , color:'blue'}} >
        Sign Up
      </Text>
      {/* <TextInput
        placeholder="Name"
        value={userName}
        onChangeText={setUserName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      /> */}
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 , marginHorizontal:190 , width:400 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 , marginHorizontal:190 , width:400 }}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        keyboardType="numeric"
        onChangeText={setPhone}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 , marginHorizontal:190 , width:400 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 , marginHorizontal:190 , width:400 }}
      />
      <MyButton onPress={handlePress} >
        <Text>Register</Text>
      </MyButton>
      <Pressable onPress={()=>router.replace("/account/login")}>
        <Text style={{ marginTop: 10 }}>if you have an account .. <Text style={styles.boldText}>Sign In</Text></Text>
      </Pressable>
      <Pressable  onPress={()=>router.navigate("/account/forgotPassword")}>
        <Text style={{ marginTop: 10 }}>Forgot Password</Text>
      </Pressable>
      <Text>{error.code}</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: 15,
    },
    button: {
      width:200,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: 'blue',
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
  
  export default Regist;