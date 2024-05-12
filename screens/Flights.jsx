import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const Flights = ({cid}) => {
  
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      const firestore = getFirestore();
      const productsCollection = collection(firestore, "flights");
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
  return (
    <ScrollView contentContainerStyle={styles.scrollViewStyle}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        products.map((item) =>
          item.cid === cid 
         ? (
            <View style={styles.container} key={item.id}>
              <Text style={styles.text}>Name: {item.name}</Text>
              <Text style={styles.text}>Busniss price: {item.BusniessPrice}</Text>
              <Text style={styles.text}>First price: ${item.firstPrice}</Text>
             

              {item.photoURL ? (
                
                <Image
                  source={{ uri: item.photoURL }}
                  style={styles.imageButton}
                />
              ) : (
                <Text>No Image</Text>
              )}
              <TouchableOpacity
                onPress={() =>router.replace(`account/Payment`)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>DETAILS</Text>
              </TouchableOpacity>
            </View>
          ) : null
        )
      )}
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  scrollViewStyle: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    width: "90%",
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
  imageButton: {
    width: 180,
    height: 250,
    marginBottom: 10,
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
});

export default Flights;
