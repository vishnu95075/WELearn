import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, FirestoreDb } from './config/firebase';
import RegistraionSignUp from './components/RegistrationSignUp/RegistraionSignUp';
import { getDoc, doc } from 'firebase/firestore';
import Notice from './components/Notice/Notice';
import Contact from './components/Contact/Contact';
import Home from './components/Home/Home';
import Classroom from './components/Classroom/Classroom';
import ClassNotice from './components/ClassNotice/ClassNotice';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Administration from './components/Administration/Administration';


function Routers() {
  const [currentUser, setCurrentUser] = useState("");
  const [userDbData, setUserDbData] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
      userDataGet(user.uid);

    } else {
      setCurrentUser("");
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('localStorageUserName', currentUser.displayName);
  }, [currentUser])

  const userDataGet = async (id) => {
    const docRef = doc(FirestoreDb, "users", id);
    const userData = await getDoc(docRef);
    if (userData.exists()) {
      setUserDbData(userData.data());
    }
    else {
      console.log("No such document");
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path='/notice' element={<Notice currentUser={currentUser} userDbData={userDbData} />} />
          <Route path="/contact" element={<Contact currentUser={currentUser} />} />
          <Route path='/classroom' element={<Classroom currentUser={currentUser} userDbData={userDbData}/>} />
          <Route path='/classnotice/:id' element={<ClassNotice currentUser={currentUser}  userDbData={userDbData}/>} />
          <Route path='signup' element={<RegistraionSignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/navbar' element={<Navbar currentUser={currentUser} />} />
          <Route path='/profile' element={<Profile currentUser={currentUser} userDbData={userDbData} />} />
          <Route path='/admin' element={<Administration currentUser={currentUser} userDbData={userDbData} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Routers;
