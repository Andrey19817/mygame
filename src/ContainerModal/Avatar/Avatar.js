import React from "react";
import './Avatar.css'



export function Avatar({avatar}){
    return (
        <>
        <div >
            <img className="imgAvatar" src={avatar} style={{border: '1px solid',
    borderImage: 'url(https://i.gifer.com/RRr2.gif)  77 '}} alt='' />
        </div>
        </>
    )
}