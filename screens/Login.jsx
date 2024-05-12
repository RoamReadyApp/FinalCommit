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
import { login } from "../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { TouchableOpacity } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // console.log("auth().currentUser", auth.currentUser);
    const unsub = onAuthStateChanged(auth, 
      (user) => {
        if(user){
          AsyncStorage.setItem("user", JSON.stringify(user));
          router.replace("/app");
        }
        else{
          AsyncStorage.removeItem("user");
          router.replace("/account/login");
        }
        // setUser(user)
      });

    return () => {
      unsub();
    };
  }, []);

  const handleLogin = async () => {
    try {
      if(await email=='Admin@gmail.com' && password == 'Admin2024'){
        router.navigate(`/Admin`);
      }
        else{const credentials = await login(email, password);
        console.log('credentials', credentials);
        router.navigate(`/app`);}
    } catch (error) {
        console.log('errorh jkhk  ', error.message);
        setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:20 , color:'#841584'}} >
        Log In
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 }}
      />
      {/* <Button style={styles.button} title="Login" onPress={handleLogin} /> */}
      {/* <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity> */}
        
      <Pressable style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable  onPress={()=>router.replace("/account/register")}>
        <Text style={{ marginTop: 10 }}>Don't have an account? <Text style={styles.boldText}>Sign Up</Text></Text>
      </Pressable>
      <Pressable onPress={()=>router.navigate("/account/forgotPassword")}>
        <Text style={{ marginTop: 10 }}>Forgot Password</Text>
      </Pressable>
      <Pressable onPress={()=>router.push("/account/welcome")}>
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


export default Login ;
