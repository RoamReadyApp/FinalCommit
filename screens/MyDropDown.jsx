import React, { useEffect, useState } from 'react';
import {Picker } from '@react-native-picker/picker';
import { View ,Text } from 'react-native';
// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const MyDropdown = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const items = ['Item 1', 'Item 2', 'Item 3'];

  //start up 


  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const firestore = getFirestore();
      const productsCollection = collection(firestore, "cities");
      const querySnapshot = await getDocs(productsCollection);
      
      const productsData = querySnapshot.docs.map(async (doc) => {
        const product = { id: doc.id, ...doc.data()  };
        console.log("doc.data  ",doc.id )
        if (product.photoURL) {
          try {
            // Fetch the download URL for the image from Firebase Storage
            const storage = getStorage();
            const imageRef = ref(storage, product.photoURL);
            const imageUrl = await getDownloadURL(imageRef);
            // Update the product with the correct image URL
            return { ...product.data, photoURL: imageUrl , id : doc.id };
          } catch (error) {
            console.error("Error fetching image:", error);
            // Handle the case where image download fails
            // For example, set a placeholder image URL or mark the product as having no image
            return { ...product, photoURL: null, id: doc.id };
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

  console.log("selectedValue : ", products);


  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {products.map((item) => (
          <Picker.Item label={item.name} value={item.id} key={item.id} /> // Use item.id as the value
        ))}
      </Picker>
      <Text>Selected Product ID: {selectedValue}</Text>
    </View>
  );
};

export default MyDropdown;
