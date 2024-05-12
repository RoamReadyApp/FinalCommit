import { Stack, router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import EditTodo from '../../../Components/Todos/EditTodo'
import { getTodo } from "../../../firebase/todos";
import { useEffect, useState } from "react";

export default function Page() {
  const { id, uid } = useLocalSearchParams();
  const [todo, setTodo] = useState({ id, uid });

  const getTodoFromFirebase = async (uid, id) => {
    const t = await getTodo(uid, id);
    if(!t) router.back();
    setTodo(t);
    console.log("getting todo with id ", id, t?.name, t?.id);
  };
  useEffect(() => {
    getTodoFromFirebase(uid, id);
  }, []);

  return (
    todo && 
    (<View>
      <Stack.Screen
        options={{
          title: "Edit Todo",
        }}
      />
      <EditTodo onSave={()=>{}} todo={todo} />
    </View>)
  );
}
