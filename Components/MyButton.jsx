import { Pressable, StyleSheet} from "react-native";
import React from "react";

export default function MyButton({onPress, style, children, color}){
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {

          backgroundColor: color || "#127ac1",
          opacity: pressed ? 0.2 : 1,
        },
        styles.wrapperCustom,
      ]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapperCustom: {
    // flex: 1,
    alignItems: "center",
    justifyContent:"center",
    borderRadius: 2,
    marginRight:10,
    padding: 8,
  },
});