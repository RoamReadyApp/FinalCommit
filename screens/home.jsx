import { router } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
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
import myImage from '../assets/NAHLA/3.jpg'
import fligth from '../assets/NAHLA/1.jpg'
import hotels from '../assets/NAHLA/hotels.jpg'
import offers from '../assets/NAHLA/2.jpg';
import Item from "../Components/Item";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";
import { getHotels } from "../firebase/Hotels";

const Home = () => {
  
const [test,setTest] = useState([]);
const getTestData = async () => {
  const promise = await getDocs(collection(db,"test"));
  const list= [];
  promise.docs.forEach(doc => {
    list.push({...doc.data() ,id:doc.id});
    console.log({...doc.data() ,id:doc.id});
  });
  console.log("list[0]: " , list);

  console.log("list[0]: " , list[0].image);
  setTest(list);
  // setTest (await getHotels());
} 
useLayoutEffect(()=>{
  getTestData();
},[]);
// console.log("test[0]: " , test[0].image);

// console.log("test : " , test[0].image);
// const image = test[0].image;
// const {name,id,image} = test[0];
// console.log("name:",name);
// console.log("id:",id);
// console.log("image:",image);


  return (
        
    <ScrollView  style={styles.scrollViewStyle} >
      
    {/* {console.log("Image",image)} */}
        <View style={styles.container}>

        <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:20 , color:'#81cce1'}} >
            Welcome in the AirPort
        </Text>
        <View>
        <Image source={myImage} style={styles.image} />
        </View>
        <View style={{ flex : 1 ,
                        flexDirection: "column",
                        justifyContent: "",    
                        alignItems:"center",
                }}>

            <Pressable style={({ pressed }) => [
                        {
                            transform: pressed
                                ? [{ scale: 1.1 }] // Scale up when pressed
                                : [{ scale: 1 }]  // Normal scale
                        },
                        styles.button
                    ]} 
                    onPress={() => router.replace("/account/login")}>
                    <Image source={fligth} style={styles.imageButton} />
                <Text style={styles.buttonText}>Flights</Text>
            </Pressable>

            {/* <Item  img={fligth} onPress={()=>router.replace("/account/login")} text={'fff'} >
            </Item> */}

            <Pressable style={({ pressed }) => [
                        {
                            transform: pressed
                                ? [{ scale: 1.1 }] // Scale up when pressed
                                : [{ scale: 1 }]  // Normal scale
                        },
                        styles.button
                    ]} onPress={() => router.replace("/account/hotels")}>
                    <Image source={hotels} style={styles.imageButton} />
                <Text style={styles.buttonText}>Hotels</Text>
            </Pressable>

            <Pressable style={({ pressed }) => [
                        {
                            transform: pressed
                                ? [{ scale: 1.1 }] // Scale up when pressed
                                : [{ scale: 1 }]  // Normal scale
                        },
                        styles.button
                    ]}  onPress={() => router.replace("/account/login")}>
                    <Image source={offers} style={styles.imageButton} />
                <Text style={styles.buttonText}>OFFERS</Text>
            </Pressable>

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
    width: 350,
    height: 300,
  },
  imageButton: {
    width: 180,
    height: 200,
  },

});


export default Home;
