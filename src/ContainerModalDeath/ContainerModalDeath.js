import React from "react";
import './ContainerModalDeath.css'
import { useDispatch, useSelector } from "react-redux";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";

export function ContainerModalDeath(props){
    const audioClickAdress = require('../audio/567421 (online-audio-converter.com).mp3')
    const audioClick = new Audio(audioClickAdress)
    const pers = useSelector(({pers:{pers}})=>pers)

    const dispatch = useDispatch()

    return (
        <>
        <h2>Вы закончили игру</h2>
        <div className="container_modal_death">
        <p className="result">Имя: {pers.name}</p>
            <p className="result">Уровень: {pers.level}</p>
            <p className="result">Жизнь: {pers.xp}</p>
            <p className="result">Сила: {pers.strong}</p>
            <p className="result">Броня: {pers.armor}</p>
            <button className="button_container_death" onClick={()=>{
                audioClick.play()
                props.replay()
                dispatch({type:ContainerActivType.persReplay})
            }}>Начать еще раз ?</button>
        </div>
        </>
    )
}

