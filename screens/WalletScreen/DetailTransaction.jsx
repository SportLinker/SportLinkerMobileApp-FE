import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import InfoPayment from "./InfoPayment";
import InfoCustomer from "./InfoCustomer";

export default function DetailTransaction() {
  return (
    <SafeAreaView
      style={{
        alignItems: "center",
        backgroundColor: "#b0c5ff",
        height: "100%",
      }}
    >
      <InfoPayment />
      <InfoCustomer />
    </SafeAreaView>
  );
}
