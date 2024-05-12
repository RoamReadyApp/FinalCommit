import React from "react";
import { useLocalSearchParams } from "expo-router";
import TripPaymentPage from "../../screens/Payment";
const Id = () => {
  const { id } = useLocalSearchParams() || { id: "defaultId" };
  return <TripPaymentPage cid={id} />;
};

export default Id;