//email , name , phone 
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Alert } from 'react-native';
import a1 from './../assets/NESO/noPhoto.jpg';
import { CollectionReference, collection, doc, getDocs, getFirestore, query, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { getCurrentUserUuid } from './../firebase/auth';
import { ActivityIndicator, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { db } from '../firebase/Config';
import { router } from 'expo-router';
const Profile = () => {
  const id = getCurrentUserUuid();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rec, setRec] = useState([]);
  const [phone, setPhone] = useState([]);
  const [name, setName] = useState([]);

// console.log(id);
  useEffect(() => {
    const fetchProducts = async () => {
      const firestore = getFirestore();
      const productsCollection = collection(firestore, "User");
      const querySnapshot = await getDocs(productsCollection);
      const productsData = querySnapshot.docs.map(async (doc) => {
        const product = { id:doc.id ,...doc.data()};
        if (product.photoURL) {
          try {
            // Fetch the download URL for the image from Firebase Storage
            const storage = getStorage();
            const imageRef = ref(storage, product.photoURL);
            const imageUrl = await getDownloadURL(imageRef);
            // Update the product with the correct image URL
            return { ...product, photoURL: imageUrl };
          } catch (error) {
            console.error("Error fetching image:", error);
            // Handle the case where image download fails
            // For example, set a placeholder image URL or mark the product as having no image
            return { ...product, photoURL: null };
          }
        }
        return product;
      });
      const updatedProductsData = await Promise.all(productsData);
      setProducts(updatedProductsData);
      setIsLoading(false); // Set loading to false after fetching and updating data
    };

    fetchProducts();
  }, []);

  const getUser = async (uid) => {
    const q = query(CollectionReference , where('uid' , '==' , uid));
    try {
        const promise = await getDocs(q);
        return {...promise.docs[0].data() , id: promise.docs[0].id};
    } catch (err) {
        console.log('getUser: ' , err.message);
    }
  }

  const updateUser = async () => {
    try {
      console.log("eccc" , rec);

      if (!rec || !rec.id) {
        console.log("User record is invalid.");
        console.log("eccccccccccccccc" , rec);

        return null;

      }
      const data = {
        name: name,
        phone :phone,
        uid : rec.uid,
      };
      rec.name = data.name;
      rec.phone = data.phone;
      const documentReference = doc(db, "User", rec.id);
      await updateDoc(documentReference, data);
      // status("user updated successfully!");
      console.log("user updated successfully!");
      router.replace(`/account/Profile`);

      return rec;
    } catch (err) {
      console.log("updateUser: ", err.message);
    }
  };
  return (
    // <ScrollView contentContainerStyle={styles.scrollViewStyle}>
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>
      {
    isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      products.map((item) =>
        item.uid == id 
       ? (
        
          <View style={styles.container} key={item.id}>
            
          <Image
            style={styles.profilePicture}
            source={a1}
            
          />
         
         <Text style={styles.name}>Email : {item.email}</Text>
        <Text style={styles.name}>Name :{item.name} </Text>
           
          <TextInput
        placeholder='Edit your name'
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 ,marginHorizontal:190, width: 400 }}
      />
          
      <Text style={styles.phone}>Phone:{item.phone} </Text>
           
        <TextInput
        placeholder='Edit your phone'
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"
        style={{ borderWidth: 1,marginTop:-30, padding: 10, marginBottom: 30 ,marginHorizontal:190, width: 400 }}
      />
          <Text  style={{fontSize: 50,textAlign: "center" , marginBottom:70 , color:'#40e3ec'}} >
        <Pressable style={({ pressed }) => [
                        {
                            transform: pressed
                                ? [{ scale: 1.1 }] // Scale up when pressed
                                : [{ scale: 1 }]  // Normal scale
                        },
                        styles.button
                      ]}

                    onPress={() => {
                      console.log("itemmmm" , item);
                      setRec(item);
                      console.log(";;l" , rec);
                      updateUser();
                    }}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
          </Pressable>
        </Text>
        </View>
        ) : null
      )
    )
  // </ScrollView>
}</View>
);
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: '#127ac1',
    padding: 10,
},
buttonText: {
  color: 'black',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
  fontFamily:'serif',
},
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 70,

  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -30,
    marginBottom:20,
    padding:8,
  },
  phone: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -30,
    margin:20,
    padding:25,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  header: {
    fontSize:30,
    fontFamily:'serif',
    fontWeight: 'bold',
    marginTop:90,

  },
});

export default Profile;