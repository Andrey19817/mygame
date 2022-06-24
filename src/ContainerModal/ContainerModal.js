
import React, { useState,useContext } from "react";
import './ContainerModal.css'
import { Avatar } from "./Avatar/Avatar";
import { HeroWindow } from "./HeroWindow/HeroWindow";
import { useDispatch, useSelector } from "react-redux";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import { nanoid } from "nanoid"
import { MainContext } from "../context";
import { Admin } from "./Admin/Admin";


export function ContainerModal({play,setShowAvatar,showAvatar,setShow_image_selection,show_image_selection,show_input, setShow_input,setAdmin,admin}) {
  const dispatch = useDispatch()
  const pers = useSelector(({ pers }) => pers)
  const [value, setValue] = useState('')
  const {isAudioPlay} = useContext(MainContext)
  const [showBestPers,setShowBestPers] = useState(true)
  const audioClickAdress = require('../audio/567421 (online-audio-converter.com).mp3')
  const audioClick = new Audio(audioClickAdress)

  const getName = (value) => {
    dispatch({ type: ContainerActivType.getName, payload: value })
  }

  const return_image_selection = () => {
    setShow_image_selection(true)
  }

  const [getPicture, setGetPicture] = useState([])

  return (
    <div className="wrapper_modal">
      <div>.</div>
      {pers.bestPers.level && showBestPers ? <div className="best_pers">Лучший игрок - {pers.bestPers.name} Уровень - {pers.bestPers.level}</div> : null}
      {show_input ? <div className="container_input">
        <input type="text" value={value} placeholder='Имя героя' onChange={event => setValue(event.target.value)} />
        <button className="getName" onClick={() => {
          if (value !== '' && value !== 'admin') {
            isAudioPlay && audioClick.play()
            setShow_image_selection(true)
            setShow_input(false)
            // let key = 'c48Uu72vB5HOjYdeCrJcg82EkOmH9MDg'// персональный ключ API
            fetch('https://api.giphy.com/v1/gifs/search?api_key=c48Uu72vB5HOjYdeCrJcg82EkOmH9MDg&q=dark+souls&limit=30&offset=0&rating=g&lang=en')
              .then((response) => response.json())
              .then(({ data }) => setGetPicture(data))
          }if(value === 'admin'){
            isAudioPlay && audioClick.play()
            setShow_image_selection(false)
            setShow_input(false)
            setAdmin(true)
          }
        }}>назвать</button>
      </div> : null}
        {admin && <Admin setShowBestPers={setShowBestPers}/>}

      {show_image_selection ? <div className="container_show_image_selection">
        <p>Выбери Аватарку</p>
        <div className="show_image_selection" onClick={(event) => {
          setShow_image_selection(false)
          setShowAvatar(event.target)
          isAudioPlay && audioClick.play()
        }}>
          {getPicture.map(elem => <Avatar key={nanoid(10)} avatar={elem.images.original.url} />)}
        </div>
      </div> : null}
      {!show_image_selection && !show_input && !admin ? <HeroWindow value={value} avatar={showAvatar} return_image_selection={return_image_selection} /> : null}
      <div className="container_buttonCreate">
        {!show_image_selection && !show_input && !admin ? <button className="buttonCreate" onClick={() => {
          if (value !== '') {
            getName(value)
            isAudioPlay && audioClick.play()
            dispatch({ type: ContainerActivType.getAvatar, payload: showAvatar })
            play()
          }
        }}>Начать</button> : null}
      </div>
    </div>
  )
}