import React, { useState } from "react";
import {View , Text, StyleSheet , Image} from 'react-native'
import MyButton from "../Components/MyButton";
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useRouter  } from "expo-router";


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
    );
}

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
         
    width: '30%', 
    height:300,
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
    color: 'black',
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
  },
  imageButton: {
    width: 180,
    height: 250,
  },

});


export default Chose ;