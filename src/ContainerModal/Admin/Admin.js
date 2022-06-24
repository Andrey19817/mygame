import React, { useContext, useState } from "react"
import cls from './Admin.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { MonstrWindow } from "./MonstrWindow/MonstrWindow"
import { ContainerActivType } from '../../ContainerActivType/ContainerActivType'
import { CreateMonstr } from "../CreateMonstr/CreateMonstr"
import { MainContext } from "../../context"




export const Admin = ()=>{
const {isAudioPlay} = useContext(MainContext)
const audioClickAdress = require('../../audio/567421 (online-audio-converter.com).mp3')
const audioClick = new Audio(audioClickAdress)
const monstrArea = useSelector(({monstrArea})=>monstrArea)
const [showCreateMonstr,setShowCreateMonstr] = useState(false)
const dispatch = useDispatch()
const [noFilter,setNoFilter] = useState(true)
return (
    <div className={cls.wrapper_admin}>
         {showCreateMonstr && <CreateMonstr setShowCreateMonstr={setShowCreateMonstr}/>}
       <div className={cls.wrapper_monstr}> {noFilter && monstrArea.filter(elem=>elem.check===true).map(elem=><MonstrWindow check={elem.check} id={elem.id} key={elem.id} avatar={elem.img} name={elem.name} strong={elem.strong} armor={elem.armor} xp={elem.xp}/>)}
       
       </div>
       <button className={cls.add_monstr} onClick={()=>{setShowCreateMonstr(true)
    isAudioPlay && audioClick.play()
    }} >Добавить</button>
       
       <button className={cls.button_reestablish} onClick={()=>{
           isAudioPlay && audioClick.play()
           monstrArea.map(elem=>elem.check = true)
           setNoFilter(false)
           setTimeout(()=>{
            setNoFilter(true)
           },1)
    }}>Востановить</button>
   
    </div>
   
)
}