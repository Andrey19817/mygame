

import React, { useState } from "react";
import './ContainerModal.css'
import { Avatar } from "./Avatar/Avatar";
import { HeroWindow } from "./HeroWindow/HeroWindow";
import { useDispatch, useSelector } from "react-redux";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import { nanoid } from "nanoid"



export function ContainerModal(props) {
  const dispatch = useDispatch()
  const pers = useSelector(({ pers }) => pers)
  const [value, setValue] = useState('')

  console.log('ContainerModal');

  const getName = (value) => {
    dispatch({ type: ContainerActivType.getName, payload: value })
  }

  // const soundFon = require('../audio/kirill-pokrovsky-original-sin (1).mp3')
  // const audioRef = useRef()
  // const [isAudioPlay, setIsAudioPlay] = useState(false)

  const audioClickAdress = require('../audio/567421 (online-audio-converter.com).mp3')
  const audioClick = new Audio(audioClickAdress)
  // useEffect(() => {
  //   audioRef.current.volume = 0.2
  // }, [])

  const return_image_selection = () => {
    setShow_image_selection(true)
  }

  const [show_image_selection, setShow_image_selection] = useState(false)//показать окно выбора картинки
  const [show_input, setShow_input] = useState(true)//показ инпута
  const [getPicture, setGetPicture] = useState([])


  return (

    <div className="wrapper_modal">
      <button onClick={() => {
        props.audioFon()
      }}>music</button>
      {pers.bestPers.level ? <div className="best_pers">Лучший игрок - {pers.bestPers.name} Уровень - {pers.bestPers.level}</div> : null}
      {show_input ? <div className="container_input">

        <input type="text" value={value} placeholder='Имя героя' onChange={event => setValue(event.target.value)} />
        <button className="getName" onClick={() => {
          if (value !== '') {
            audioClick.play()
            setShow_image_selection(true)
            setShow_input(false)
            // let key = 'c48Uu72vB5HOjYdeCrJcg82EkOmH9MDg'// персональный ключ API
            // fetch('https://api.giphy.com/v1/gifs/search?api_key=c48Uu72vB5HOjYdeCrJcg82EkOmH9MDg&q=Lord+of+the+Rings&limit=30&offset=0&rating=g&lang=en')

            fetch('https://api.giphy.com/v1/gifs/search?api_key=c48Uu72vB5HOjYdeCrJcg82EkOmH9MDg&q=dark+souls&limit=30&offset=0&rating=g&lang=en')
            // fetch('https://api.giphy.com/v1/gifs/trending?api_key=c48Uu72vB5HOjYdeCrJcg82EkOmH9MDg&limit=30&rating=r')
              .then((response) => response.json())
              .then(({ data }) => setGetPicture(data))
          }
        }}>назвать</button>
      </div> : null}


      {show_image_selection ? <div className="container_show_image_selection">
        <p>Выбери Аватарку</p>
        <div className="show_image_selection" onClick={(event) => {
          setShow_image_selection(false)
          props.setShowAvatar(event.target)
          audioClick.play()
        }}>
          {getPicture.map(elem => <Avatar key={nanoid(10)} avatar={elem.images.original.url} />)}
        </div>
      </div> : null}
      {!show_image_selection && !show_input ? <HeroWindow value={value} avatar={props.showAvatar} return_image_selection={return_image_selection} /> : null}
      <div className="container_buttonCreate">
        {!show_image_selection && !show_input ? <button className="buttonCreate" onClick={() => {
          if (value !== '') {
            getName(`${value}`)
            audioClick.play()
            props.audioRef.current.load()
            props.audioRef.current.pause()
            props.play()
            dispatch({ type: ContainerActivType.getAvatar, payload: props.showAvatar })

          }
        }}>Начать</button> : null}
      </div>

    </div>
  )
}