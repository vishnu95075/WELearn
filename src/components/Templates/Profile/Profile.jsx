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
        // console.log(currentUser.displayName);
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
                       
                        <h3>{currentUser.displayName}</h3>
                        <h4 className='email'>Email:- {currentUser.email}</h4>
                        <h4 className='contact'>Contact No {userDbData.contact}</h4>
                        <h4 className='studentId'>Student Id {userDbData.studentId}</h4>
                        <h4 className='department'>Deapartment is {userDbData.department}</h4>
                        <h4 className='role'>Role is {userDbData.role}</h4>
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