// import { StyleSheet, Text, Image, Pressable } from "react-native";

// export default function Item({ iconSrc, text, onPress }) {
//   return (
//     // <View style={styles.item}>
//     <Pressable
//       onPress={onPress}
//       style={({ pressed }) => [{ opacity: pressed ? 0.2 : 1 }, styles.item]}
//     >
//       <Image source={iconSrc} style={styles.image} />
//       <Text style={styles.title}>{text}</Text>
//     </Pressable>
//     // </View>
//   );
// }

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: "#f9c2ff",
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   title: {
//     flex: 1,
//     fontSize: 32,
//     textAlign: "right",
//   },
//   image: {
//     width: 50,
//     height: 50,
//   },
// });
import React from "react";
import{safeAreaView , View , Pressable ,Text , StyleSheet ,Image} from 'react-native';



export default function item ({img , onPress , text}) {

    return(
        <View style ={styles.container}>

            <Pressable style={({pressed}) =>[
                 {
                    transform: pressed
                        ? [{ scale: 1.1 }] // Scale up when pressed
                        : [{ scale: 1 }]  // Normal scale
                },
                styles.button
            ]} onPress={onPress}>
              
                <View style ={styles.image}>
                    <Image source={img}/>
                </View>
                 
                 <Text style={styles.text}>{text}</Text>
            </Pressable>
            

        </View>
    );

}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: "center" ,
    },
        button: {
          width:20,
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
        image: {
          width: 8,
          height: 20,
        },
    
});