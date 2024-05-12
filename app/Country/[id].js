// import { useLocalSearchParams } from "expo-router";
// import Hotels from "../../screens/hotels";

// export default function Page() {
//     const cid = useLocalSearchParams() ;
//   return <Hotels/>
// }
import React from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Hotels from "../../screens/hotels";
const Id = () => {
  const { id } = useLocalSearchParams() || { id: "defaultId" };
  return <Hotels cid={id} />;
};

export default Id;