import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import {resetPassword } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
        const credentials = await resetPassword(email, password);
        console.log('credentials', credentials);
        router.navigate(`/app`);
    } catch (error) {
        console.log('error', JSON.stringify(error));
        setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400}}
      />
      <Button title="Send" onPress={handleReset} />

      <Pressable onPress={()=>router.replace("/account/register")}>
        <Text style={{ marginTop: 10 }}>Don't have an account? <Text style={styles.boldText}>Sign Up</Text></Text>
      </Pressable>
      <Pressable onPress={()=>router.replace("/app")}>
        <Text style={{ marginTop: 10 }}>HOME</Text>
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


export default Login;
