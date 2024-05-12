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
import { MaterialIcons } from '@expo/vector-icons';


const AdminHome = () => {
  console.log("admin page ");
    return (
        <SafeAreaView>
      <ScrollView  >
          <View style={styles.container}>
          {/* <MaterialIcons name="person-pin-circle" size={50} color="black" /> */}

           <Text style={styles.boldText}> Welcome to your account</Text>
            
          <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:70 , color:'#40e3ec'}} >
          <Pressable style={({ pressed }) => [
                          {
                              transform: pressed
                                  ? [{ scale: 1.1 }] // Scale up when pressed
                                  : [{ scale: 1 }]  // Normal scale
                          },
                          styles.button
                        ]}
                      onPress={() => router.replace("/Admin/AdminCountries")}>
                          <Text style={styles.buttonText}>Countries</Text>
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
                      onPress={() => router.replace("/Admin/Hotel")}>
                          <Text style={styles.buttonText}>Hotels</Text>
            </Pressable>
          </Text>
          <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:50 , color:'#40e3ec'}} >
          <Pressable style={({ pressed }) => [
                          {
                              transform: pressed
                                  ? [{ scale: 1.1 }] // Scale up when pressed
                                  : [{ scale: 1 }]  // Normal scale
                          },
                          styles.button
                        ]}
                      onPress={() => router.replace("/Admin/AdminFlights")}>
                          <Text style={styles.buttonText}>Flights</Text>
            </Pressable>
          </Text>
          <View>
          </View>

  
          </View>
      </ScrollView>
      </SafeAreaView>
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
  
  
  export default AdminHome;