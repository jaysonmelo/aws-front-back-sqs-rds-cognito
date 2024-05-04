import React, { Component } from 'react';
import userpool from './userpool';
import { useEffect, useState } from 'react';

function Logout(userpool) {

    const { user } = userpool

    
    useEffect(() => {
        // call api or anything
        console.log("loaded");
        user.signOut();
        window.location.href = '/';
     });
    function logout() {
        user.signOut();
        window.location.href = '/';
      }

    return (
        <div onLoad={logout}>LOGOUT</div>
    );
}

export default Logout;