import React from "react";
import { useLocalSearchParams } from "expo-router";
import Flights from "../../screens/Flights";
const Id = () => {
  const { id } = useLocalSearchParams() || { id: "defaultId" };
  return <Flights cid={id} />;
};

export default Id;