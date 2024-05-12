import { useState } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import MyButton from "./MyButton";

export default function Item({
  isDone,
  text,
  onPress,
  onDelete,
  onDone,
}) {
  return (
    // <View style={styles.item}>

    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { opacity: pressed ? 0.2 : 1 },
        styles.item,
      ]}
    >
      <Pressable onPress={()=>{onDone();}}>
        {({ pressed }) => (
          <View
            style={[
              styles.checkbox,
              pressed && styles.pressed,
            ]}
          >
            {isDone && (
              <Text style={styles.x}>
                {/* {pressed?"o":"x"} */}x
              </Text>
            )}
          </View>
        )}
      </Pressable>
      <Text style={styles.title}>{text}</Text>
      <MyButton color={"red"} onPress={onDelete}><Text style={{color: "white"}}>Delete</Text></MyButton>
    </Pressable>
    // </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    height: 24,
    width: 24,
    backgroundColor: "#0ff",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "white",
  },
  checked: {
    backgroundColor: "pink",
    borderColor: "black",
  },
  pressed: {
    margin: 2,
    height: 20,
    width: 20,
    // backgroundColor: "pink",
  },
  x: {
    fontSize: 24,
    margin: -12,
    paddingLeft: 14,
    color: "white",
  },
  selected: {
    color: "black",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: 32,
    marginRight:5,
    textAlign: "right",
  },
  image: {
    width: 50,
    height: 50,
  },
});
