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
} from "react-native";
import { register } from "../firebase/auth";
import MyButton from "../Components/MyButton";
import { addUser } from "../firebase/todos";

const Register = () => {
    // const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

  const handlePress = async () => {
    try {
      
      if(email=='Admin@gmail.com' && password == 'Admin2024'){
        router.navigate(`/Admin`);
      }
        const credentials = await register(email, password);
        await addUser(credentials.user)
        console.log('credentials', credentials);
        console.log('user', credentials.user);
        console.log('uid', credentials.user.uid);
        router.navigate(`/app`);
    } catch (error) {
        console.log('error', JSON.stringify(error));
        setError(error);
    }
  };

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
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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

export default Register;
