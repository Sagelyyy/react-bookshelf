import React from "react";

import {getAuth} from 'firebase/auth'

import '../App.css'


const UserInfo = ({user}) => {
    const auth = getAuth()
    return (
        <div className="userInfo--container">
            <img className="userInfo--avatar" referrerpolicy="no-referrer" src={user.photoURL} alt='' ></img>
            <div className="userInfo--name--container">
                <p className="userInfo--name">{user.displayName}</p>
            <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
            </div>
        </div>
    )
}

export default UserInfo