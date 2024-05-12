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
// Get a list of flights from your database
async function getFlights() {
  const flightsCol = collection(db, "flights");
  const flightSnapshot = await getDocs(flightsCol);
  const flightList = flightSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return flightList;
}

async function editFlight(flight) {
  console.log("at editFlight", flight);
  await setDoc(doc(db, "flights", flight.id), flight);
}

async function deleteFlight(id) {
  try {
    await deleteDoc(doc(db, "flights", id));
    console.log("Document deleted with ID: ", id);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

async function addFlight(flight) {
  try {
    const docRef = await addDoc(collection(db, "flights"), flight);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function subscribe(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "flights")),
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

export { getFlights, addFlight, editFlight, deleteFlight, subscribe };
