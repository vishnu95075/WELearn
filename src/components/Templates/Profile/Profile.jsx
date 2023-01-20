import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import './Profile.css'
import RegistraionSignUp from '../RegistrationSignUp/RegistraionSignUp';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const Profile = ({ currentUser, userDbData }) => {
    const navigation = useNavigate();
    const auth = getAuth();
    const signOutCurrentUser = () => {
        signOut(auth).then(() => {
            navigation("/");
        }).catch((error) => {
            alert(error);
        });
    }

    if (currentUser && userDbData) {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <button
                        onClick={signOutCurrentUser}
                        style={{ float: "right" }}
                    >
                        Log Out
                    </button>
                    <div className="child">
                        <h3>Your Profile is</h3>
                        <br />
                        <div className="profile-img-cropper">
                            <img src={currentUser.photoURL}
                                height="150"
                                width="170"
                                alt='userImage' />
                        </div>
                        <h4>Welcome {currentUser.displayName}</h4>
                        <h4>Email:- {currentUser.email}</h4>
                        <h4>Email:- {userDbData.name}</h4>
                        <h4>Email:- {userDbData.email}</h4>
                        <h4>Contact No {userDbData.contact}</h4>
                        <h4>Student Id {userDbData.studentId}</h4>
                        <h4>Deapartment is {userDbData.department}</h4>
                        <h4>Role is {userDbData.role}</h4>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <>
                <RegistraionSignUp />
            </>
        )
    }

}

export default Profile