import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function IntroductionSection({ stadium }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giới thiệu</Text>
      <Text style={styles.subtitle}>{stadium.stadium_description}</Text>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: "#707070",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
  description: {
    color: "#707070",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "justify",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
    marginVertical: 20,
  },
});

export default IntroductionSection;
