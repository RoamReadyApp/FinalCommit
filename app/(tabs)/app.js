

import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import myImage from "../../assets/NESO/welcome.jpg";

function Home() {
  
  return (
        
    <ScrollView  style={styles.scrollViewStyle} >
        <View style={styles.container}>

        <Text style={styles.headingTxt}>Welcome in the Airport</Text>

        <View>
        <Image source={myImage} style={styles.image} />
        </View>
        <Text style={styles.headingTxt}>Explore The Beautiful World!</Text>

        <Pressable
          onPress={()=>router.push("/account/Countries")}
          style={[styles.footerBtn, styles.footerBookBtn]}
        >
          <Text style={styles.footerBtnTxt}>CHOOSE COUNTRY !</Text>
        </Pressable>
        
        <View style={{ flex : 1 ,
                        flexDirection: "column",
                        justifyContent: "",    
                        alignItems:"center",
                }}>

            </View>

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
    width:200,
    height:300,
    marginLeft: 10,
    marginTop: 10,
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
  },
  image: {
    justifyContent:"center",
    alignItems: "center",
    width: 700,
    height: 500,
  },
  imageButton: {
    width: 180,
    height: 200,
  },
  headingTxt: {
    fontSize: 28,
    fontWeight: "500",
    color: "black",
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    padding: 20,
    paddingBottom: 30,
    width: 300,
  },
  footerBtn: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  footerBookBtn: {
    marginTop: 20,
    flex: 2,
    backgroundColor: "#127ac1",
    marginRight: 20,
  },
  footerBtnTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },

});

export default Home;

