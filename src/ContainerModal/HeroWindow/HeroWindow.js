import React from "react";
import './HeroWindow.css'



export function HeroWindow({ avatar, value, return_image_selection }) {
    const audioClickAdress = require('../../audio/567421 (online-audio-converter.com).mp3')
    const audioClick = new Audio(audioClickAdress)

    return (
        <>
            <div className="container_hero_window">
                <div className="hero_window" >
                    <img className="hero_window_avatar" style={{
                        width: '90px', height: '90px', boxShadow: '0 0 10px 2px black', border: '2px solid',
                        borderImage: 'url(https://i.gifer.com/RRr2.gif)  1 '
                    }} src={avatar.src} onClick={() => {
                        return_image_selection()
                        audioClick.play()
                    }} />

                </div>
                <div className="name_hero">
                    <p className="heroWindow_p">{value}</p>
                </div>
            </div>
        </>
    )
}