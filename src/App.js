import React, { useState } from "react";
import Battle from './battle/Battle';
import { ContainerModal } from './ContainerModal/ContainerModal'
import './App.css'
import { ModalVictory } from "./ModalVictory/ModalVictory";
 



function App() {
  const [switchComponent, setSeitchComponent] = useState(true)
  const [getModalVictory, setGetModalVictory] = useState(false)
  const [batle, setBatle] = useState(false)

  const [showAvatar,setShowAvatar] = useState('')

  const play = () => {
    setSeitchComponent(false)
    setBatle(true)
    setGetModalVictory(false)
  }
  const replay = () => {
    setSeitchComponent(true)
    setBatle(false)
  }
  const replayVictory = () => {
    setGetModalVictory(false)
    setBatle(false)
    setSeitchComponent(true)
  }
  const show_victory_window = () => {
    setSeitchComponent(false)
    setBatle(false)
    setGetModalVictory(true)
  }
 
  
  return (
    <div className="wrapper_video">
      <video className="video" src='https://media.istockphoto.com/videos/realistic-dry-ice-smoke-clouds-fog-video-id1175691070' autoPlay loop muted ></video>

      {switchComponent ? <ContainerModal play={play} setShowAvatar={setShowAvatar} showAvatar={showAvatar}/> : null}
      {batle ? <Battle  replay={replay} show_victory_window={show_victory_window} showAvatar={showAvatar}/> : null}
      {getModalVictory ? <ModalVictory replayVictory={replayVictory} /> : null}

    </div>
  )

}

export default App;
