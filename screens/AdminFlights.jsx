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

import { FontAwesome } from '@expo/vector-icons';

const AdminFlights = () => {
  return (
    
    <ScrollView  style={styles.scrollViewStyle} >
        <View style={styles.container}>
        {/* <MaterialIcons name="person-pin-circle" size={50} color="black" /> */}
        <View >
            <Pressable style={styles.backButton} onPress={()=> router.replace('/Admin/Home')}>
                    <FontAwesome name='chevron-circle-left' size={35} color={'#127ac1'}/>
                    {/* <Text style={styles.backButtonText}> </Text> */}
                   
            </Pressable>
            </View>

        <Text  style={{fontSize: 50,textAlign: "center" ,marginTop:200, marginBottom:70 , color:'#40e3ec'}} >
        <Pressable style={({ pressed }) => [
                        {
                            transform: pressed
                                ? [{ scale: 1.1 }] // Scale up when pressed
                                : [{ scale: 1 }]  // Normal scale
                        },
                        styles.button
                      ]}
                    onPress={() => router.replace("/Admin/Flights")}>
                        <Text style={styles.buttonText}>Add Flight</Text>
          </Pressable>
        </Text>

        <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:70 , color:'#40e3ec'}} >
        <Pressable style={({ pressed }) => [
                        {
                            transform: pressed
                                ? [{ scale: 1.1 }] // Scale up when pressed
                                : [{ scale: 1 }]  // Normal scale
                        },
                        styles.button
                      ]}
                    onPress={() => router.replace("/account/")}>
                        <Text style={styles.buttonText}>delete Flight</Text>
          </Pressable>
        </Text>
        <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:70 , color:'#40e3ec'}} >
        <Pressable style={({ pressed }) => [
                        {
                            transform: pressed
                                ? [{ scale: 1.1 }] // Scale up when pressed
                                : [{ scale: 1 }]  // Normal scale
                        },
                        styles.button
                      ]}
                    onPress={() => router.replace("/account/")}>
                        <Text style={styles.buttonText}>Edit Flight</Text>
          </Pressable>
        </Text>
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
    fontSize: 20,
    textAlign: 'center',
    fontFamily:'serif',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    fontFamily:'serif',
    marginBottom: 110,
    marginTop: 100,
    // optional if you want the bold text to have the same color
  },


});

export default AdminFlights;