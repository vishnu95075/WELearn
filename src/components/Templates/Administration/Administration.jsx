import React from 'react'
import { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { FirestoreDb } from "../../../config/firebase";
import Navbar from '../Navbar/Navbar';
import './Administration.css'


const Administration = ({ currentUser, userDbData }) => {
    const collageNoticesDb = "users";
    const [noticesInfo, setNoticesInfo] = useState([]);


    const deleteHandler = async (idd) => {
        const deleteDocData = doc(FirestoreDb, collageNoticesDb, idd);

        const confirmMessage = `Sure, You want to Update`;
        if (window.confirm(confirmMessage)) {
            await updateDoc(doc,{
                rolsdse : "hoo"
            });
        } else {
            alert(`Not deleted `);
        }
    }

    useEffect(() => {
        onSnapshot(collection(FirestoreDb, collageNoticesDb), (snap) => {
            setNoticesInfo(snap.docs.map((iteam) => ({ ...iteam.data(), id: iteam.id })));
        });

    }, [setNoticesInfo]);

    return (
        <>
           <Navbar/>
            <div className="college-notice">
                <div className="">
                    <h1 className="text-center">ADMINISTRATION</h1>
                </div>

                <div className='Noticefication-box-main'>

                    <div className='notice-box shadow-lg' >
                        <div className="list">
                            <table>
                                <tr>
                                    <th>Avtar</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Auth</th>
                                </tr>

                                {
                                    noticesInfo.map((doc) => {
                                        return (
                                            <tr key={doc.id}>
                                                <td>
                                                    <img src={doc.avtarURL} alt={doc.name + " img"} />
                                                </td>
                                                <td>{doc.name}</td>
                                                <td>{doc.email}</td>
                                                <td>{doc.contact}</td>
                                                <td>
                                                    <button
                                                        onClick={() => {
                                                            deleteHandler(doc.id);
                                                        }}
                                                    >{doc.role}</button>
                                                </td>
                                            </tr>

                                        )
                                    })
                                }
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Administration