import React, { useState } from "react";
import {View , Text, StyleSheet , Image, Pressable} from 'react-native'
import MyButton from "../Components/MyButton";
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useRouter  } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';



const Chose = ({id}) => {
    //const {id} = useLocalSearchParams();
    
    //const country = Data.find((item) => item.id === id);

    

    const flight = require('./../assets/NESO/1.jpg');
    const hotel = require('./../assets/NESO/2.jpg');



    const handleFlights = () => {
        router.replace(`/Flight/${id}`);    
    };
    console.log('isdddd',id)
    const handleHotels = () => {
        router.replace(`/Country/${id}`);    
    };

    return (
        <View style={styles.container}>
            <View>
            <Pressable style={styles.backButton} onPress={()=> router.replace(`/account/Countries`)}>
                    <FontAwesome name='chevron-circle-left' size={35} color={'#127ac1'}/>
                    {/* <Text style={styles.backButtonText}> </Text> */}        
            </Pressable>
            </View>
            <View style={{alignItems:'center'}}>
            <View style={styles.button}>
                <MyButton
                    onPress={handleFlights}
                    children={()=>(
                        <View style={styles.container}>
                            <Image source={flight} style={styles.imageButton}/>
                            <Text style ={styles.text}>Flights</Text>
                        </View>
                    )}
                    //color={'#4f9cd0'}
                    
                />
            </View>
            <View style={styles.button}>
                <MyButton
                    onPress={handleHotels}
                    children={()=>(
                        <View style={styles.container}>
                            <Image source={hotel} style={styles.imageButton}/>
                            <Text style ={styles.text}>Hotels</Text>
                        </View>
                    )}
                    
                />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollViewStyle: {
        flex: 1,
        backgroundColor: '#fff',
      },
  container: {
    flex: 1,
    // marginTop:25,
  },
  button: {
    alignItems: "center" ,
    width: '30%', 
    height:350,
    marginLeft: 30,
    marginTop: 20,
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
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black', // optional if you want the bold text to have the same color
    fontSize:20
  },

  text: {
    fontSize: 18,
    marginBottom: 5,
    color:'white'
  },
  imageButton: {
    width: 180,
    height: 250,
  },
  backButton:{
    marginTop:30,
    color:'#127ac1',
    marginLeft:20,
    // borderStartWidth:30,
   alignContent:'space-around',
   paddingBottom:10,
  },

});


export default Chose ;