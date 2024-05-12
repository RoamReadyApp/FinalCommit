import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../firebase/Config";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {
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

  return (
    <View>
      <ActivityIndicator size={"large"}/>
      <Link href={"/account/login"}></Link>
      {/* {user ? <App /> : <Register />} */}
      <StatusBar  style="auto" />
    </View>
    
    // <Cities />
  );
}
