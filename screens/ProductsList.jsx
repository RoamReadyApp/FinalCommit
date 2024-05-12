import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const firestore = getFirestore();
      const productsCollection = collection(firestore, "hotel");
      const querySnapshot = await getDocs(productsCollection);
      const productsData = querySnapshot.docs.map(async (doc) => {
        const product = doc.data();
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

        console.log("product: ", product );

        return product;
      });
      const updatedProductsData = await Promise.all(productsData);
      setProducts(updatedProductsData);
      setIsLoading(false); // Set loading to false after fetching and updating data
    };

    fetchProducts();
  }, []);
  console.log("array: ", products);

  return (
    <View>
      {isLoading? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Text>Name: {item.name}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Price: ${item.singlePrice}</Text>
              {item.photoURL ? (
                <Image
                  source={{ uri: item.photoURL }}
                  style={{ width: 200, height: 200 }}
                />
              ) : (
                <Text>No Image</Text>
              )}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default ProductsList;