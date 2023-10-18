import logo from './logo.svg';
import './App.css';
import {db} from './firebase';
import {uid} from 'uid';
import {set,getDatabase} from 'firebase/database';
import {ref as sRef} from 'firebase/storage';
import {useState,useEffect} from 'react';
import {doc,collection,addDoc,updateDoc,deleteDoc,getDocs,Timestamp} from 'firebase/firestore';
import Tabledata from './Tabledata';
function App() {
  return (
    <>
      <div>
        <Tabledata/>
      </div>
    </>
  );
}

export default App;
