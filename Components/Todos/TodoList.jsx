import { View, Text, Button, TextInput, ActivityIndicator, SafeAreaView } from "react-native";
import { useCallback, useEffect, useState } from "react";
import {
  getTodos,
  addTodo,
  deleteTodo,
  subscribe,
  editTodo,
} from "../../firebase/todos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Dimensions } from "react-native";
import Itemcheckbox from "../Itemcheckbox";
import { router, useFocusEffect } from "expo-router";
import MyButton from "../MyButton";

const TodosList = () => {
  const [user, setUser] = useState();
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [todoName, setTodoName] = useState("");

  const getTodosList = async () => {
    const u = user?user:JSON.parse(await AsyncStorage.getItem("user"))
    if(!u?.uid) {
      router.navigate("/");
      return;
    }
    const t = await getTodos(u.uid);
    setTodos(t);
    setUser(u);
    setLoaded(true);
    console.log("user", u);
    console.log("todos", t);
  };

  // useEffect(() => {
  //     getTodosList();
  //     console.log('early');
  //   }, []);

  useFocusEffect(
    useCallback(() => {
      getTodosList();
      console.log('late');
      setLoaded(true);
    }, []));

  useEffect(() => {
    console.log('user.uid sub', user?.uid);
    // u = JSON.parse(AsyncStorage.getItem("user"));
    const unsubscribe = subscribe(user?.uid, ({ change, snapshot }) => {
      //   console.log("changes", change, snapshot, change.type);
      // if (snapshot.metadata.hasPendingWrites) {
      if (change.type === "added") {
        console.log("New todo: ", change.doc.data());
        getTodosList();
      }
      if (change.type === "modified") {
        console.log("Modified todo: ", change.doc.data());
        getTodosList();
      }
      if (change.type === "removed") {
        console.log("Removed todo: ", change.doc.data());
        getTodosList();
      }
      // }
    });

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);
 
  return (
    <SafeAreaView style={{flex:1}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
          width: Dimensions.get("window").width
        }}
      >
        <TextInput
          onChangeText={setTodoName}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
        <MyButton
          onPress={() =>
            addTodo(user.uid, {
              name: todoName || "new todo" + todos.length,
              isDone: false,
              uid: user.uid,
            })
          }
        ><Text style={{color: "white"}}>Add todo</Text></MyButton>
      </View>
      {!loaded ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          // style={styles.list}
          data={todos}
          // keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Itemcheckbox
              text={item.name}
              isDone={item.isDone}
              onPress={() => {
                router.push({ pathname: "/home/todos/[id]", params: item })
              }}
              onDelete={() => deleteTodo(item)}
              onDone={() => editTodo({...item, isDone:!item.isDone})}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default TodosList;
