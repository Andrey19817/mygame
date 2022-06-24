import React, { useContext, useRef } from "react"
import  './CreateMonstr.css'
import { useSelector, useDispatch } from 'react-redux'
import { ContainerActivType } from "../../ContainerActivType/ContainerActivType"
import { MainContext } from "../../context"






export const CreateMonstr = ({setShowCreateMonstr})=>{
const {isAudioPlay} = useContext(MainContext)
const audioClickAdress = require('../../audio/567421 (online-audio-converter.com).mp3')
const audioClick = new Audio(audioClickAdress)
const dispatch = useDispatch()
const inputImg = useRef()
const inputName = useRef()
const inputXp = useRef()
const inputStrong = useRef()
const inputArmor = useRef()
const monstrArea = useSelector(({monstrArea})=>monstrArea)

const createMonstr =  ()=>{
    if(inputImg.current.value !== '' && inputName.current.value !== '' && inputXp.current.value !== '' && Number(inputXp.current.value) && inputStrong.current.value !== '' && Number(inputStrong.current.value) && inputArmor.current.value !== '' && Number(inputArmor.current.value)){
        dispatch({type:ContainerActivType.create_monstr,payload:{
            id: monstrArea[monstrArea.length - 1].id + 1,
            name: `${inputName.current.value}`,
            xp: Number(inputXp.current.value),
            strong: Number(inputStrong.current.value),
            armor: Number(inputArmor.current.value),
            img: `${inputImg.current.value}`,
            check:true
    }})
    setShowCreateMonstr(false)
    }else{
        alert('чтобы добавить монстра - заполните поля')
        setShowCreateMonstr(false)
    }
    
}

    return (
        <div className="container_create_monstr">
        <input className="input_create_monstr" type="text" placeholder="URL-портрета" ref={inputImg} /><br />
        <input className="input_create_monstr" type="text" placeholder="Имя" ref={inputName}/><br />
        <input className="input_create_monstr" type="text"  placeholder="количество жизни" ref={inputXp}/><br />
        <input className="input_create_monstr" type="text" placeholder="сила" ref={inputStrong}/><br />
        <input className="input_create_monstr" type="text" placeholder="броня" ref={inputArmor}/><br />
        <button className="button_create_monstr" onClick={()=>{isAudioPlay && audioClick.play()
            createMonstr()
        }} >создать</button>
        </div>
    )
}