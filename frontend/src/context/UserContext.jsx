import React, { useState } from 'react';         
import { UserDataContext } from './UserDataContext';

const UserContext = ({ children }) => {
    const [user ,setUser]=useState({
        email:'',
        fullName:{
            fristName:'',
            lastName:''
        }
    })
    return (
        <UserDataContext.Provider value={[user,setUser]}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext;
