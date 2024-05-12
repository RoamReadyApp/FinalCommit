import { db } from "./Config";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
// Get a list of todos from your database
async function getTodos(uid) {
  const todosCol = collection(db, `users/${uid}/todos`);
  const todoSnapshot = await getDocs(todosCol);
  const todoList = todoSnapshot.docs.map((doc) => {
    return { id: doc.id, uid, ...doc.data() };
  });
  return todoList;
}

async function getTodo(uid, id) {
  const docRef = doc(db, `users/${uid}/todos`, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return { id: id, uid, ...docSnap.data()};
  }
  
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
  return undefined
}

async function editTodo(todo) {
  console.log("at editTodo", todo);
  await setDoc(doc(db, `users/${todo.uid}/todos`, todo.id), todo);
}

async function deleteTodo(todo) {
  try {
    await deleteDoc(doc(db, `users/${todo.uid}/todos`, todo.id));
    console.log("Document deleted with ID: ", todo.id);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function addUser({uid,email}) {
  try {
    await setDoc(doc(db, "users", uid), {uid,email})
    // const docRef = await addDoc(collection(db, uid), {uid,email});
    console.log("Document written with ID: ", uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function addTodo(uid,todo) {
  try {
    const docRef = await addDoc(collection(db, `users/${uid}/todos`), todo);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function subscribe(uid,callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, `users/${uid}/todos`)),
    (snapshot) => {
      const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      snapshot.docChanges().forEach((change) => {
        // console.log("changes", change, snapshot.metadata);
        if (callback) callback({ change, snapshot });
      });
      // console.log(source, " data: ", snapshot.data());
    }
  );
  return unsubscribe;
}

export { getTodos, addTodo, editTodo, deleteTodo, getTodo, subscribe, addUser };
