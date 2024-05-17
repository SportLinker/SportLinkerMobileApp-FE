import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TruncatedText = ({ text, maxCharsPerLine, maxLines }) => {
  // Split the text into segments of maxCharsPerLine
  const lines = [];
  for (let i = 0; i < text.length; i += maxCharsPerLine) {
    lines.push(text.substring(i, i + maxCharsPerLine));
  }

  // Join only the first maxLines segments, add ellipsis if there are more lines
  let displayedText = lines.slice(0, maxLines).join("\n");
  if (lines.length > maxLines) {
    displayedText = displayedText.trimEnd() + "...";
  }

  return (
    <Text style={styles.text} numberOfLines={maxLines}>
      {displayedText}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default TruncatedText;
