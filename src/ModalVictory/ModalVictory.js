import React,{useContext} from "react";
import './ModalVictory.css'
import { useDispatch, useSelector } from "react-redux";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import PersArea from "../PersArea/PersArea";
import { MainContext } from "../context";
import {getMyXp} from '../GetXp/GetXp'



function ModalVictory(props) {
    console.log('ModalVictory');
    const audioClickAdress = require('../audio/567421 (online-audio-converter.com).mp3')
    const audioClick = new Audio(audioClickAdress)
    const {setMyXp} = useContext(MainContext)
    const dispatch = useDispatch()
    const audioVictory = require('../audio/kirill-pokrovsky-bittersweet-regrets.mp3')

    return (
        <>
            <audio src={audioVictory} autoPlay loop></audio>
            <div className="wrapper_victory">
                <div className="dispalay_victory">Поздравляю,ты легенда !</div>
                <div className="container_button_victory_modal">
                    <button className="button_victory" onClick={() => {
                        props.replayVictory()
                        audioClick.play()
                        dispatch({ type: ContainerActivType.persReplay })
                        setMyXp(getMyXp(10))
                    }}>Давай добьем кого не добили ?</button>
                </div>
                <PersArea />
            </div>
        </>
    )
}
export default React.memo(ModalVictory)
