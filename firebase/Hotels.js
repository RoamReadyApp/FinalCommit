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
} from "firebase/firestore";

async function getHotels() {
    const hotelsCol = collection(db, "test");
    const hotelSnapshot = await getDocs(hotelsCol);
    const hotelList = hotelSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    return hotelList;
  }

  export {getHotels};