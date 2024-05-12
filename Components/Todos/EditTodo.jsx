import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";
import { editTodo } from "../../firebase/todos";
import { router } from "expo-router";
import MyButton from "./../MyButton";

const EditTodo = ({ todo: todoToEdit, onSave }) => {
  const [todoToEditName, setTodoToEditName] = useState(todoToEdit.name);
  console.log('todoToEditName', todoToEditName);
  return (
    <View >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
          width:"100%"
        }}
      >
        <TextInput
          onChangeText={setTodoToEditName}
          defaultValue={todoToEdit.name}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
        <MyButton
          onPress={() => {
            if(!todoToEditName || todoToEditName === todoToEdit.name){
              router.navigate("/home");
              return;
            }
            editTodo({ ...todoToEdit, name: todoToEditName || todoToEdit.name })
              .then((d) => {
                onSave();
                router.navigate("/home");
              })
              .catch((e) => console.log(e));
          }}
        ><Text style={{color: "white"}}>Save todo</Text></MyButton>
      </View>
    </View>
  );
};

export default EditTodo;

const styles = StyleSheet.create({});
