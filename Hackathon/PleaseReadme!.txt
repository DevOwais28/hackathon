`getDoc` (Read a single document)

Used to fetch one document from Firestore by its reference.

import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const fetchStudent = async (id) => {
  const docRef = doc(db, "students", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
};

`addDoc` (Add a new document with auto-ID)

Used to add a document with a random ID.

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const addStudent = async () => {
  await addDoc(collection(db, "students"), {
    name: "John Doe",
    age: 20
  });
  console.log("Student added!");
};

`updateDoc` (Update existing document fields)

Used to update only specific fields in a document.

import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateStudent = async (id) => {
  const docRef = doc(db, "students", id);
  await updateDoc(docRef, {
    age: 21
  });
  console.log("Student updated!");
};

`deleteDoc` (Delete a single document)

Deletes a document from a collection.

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const removeStudent = async (id) => {
  await deleteDoc(doc(db, "students", id));
  console.log("Student deleted!");
};

Delete all documents in a collection

Firestore doesn’t have a direct “deleteAll” — you loop through and delete.

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const deleteAllStudents = async () => {
  const snapshot = await getDocs(collection(db, "students"));
  snapshot.forEach((document) => {
    deleteDoc(doc(db, "students", document.id));
  });
  console.log("All students deleted!");
};

`onSnapshot` (Real-time listener)

Keeps listening for changes in a document or collection.

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebaseConfig";

const listenStudents = () => {
  onSnapshot(collection(db, "students"), (snapshot) => {
    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Updated list:", students);
  });
};

