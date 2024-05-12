import React from "react";
import { useLocalSearchParams } from "expo-router";
import Chose from "../../screens/Chose";
const Id = () => {
  const { id } = useLocalSearchParams() || { id: "defaultId" };
  return <Chose id={id} />;
};

export default Id;