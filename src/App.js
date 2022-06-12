import React, { useState, useRef, useEffect,useContext } from "react";
import { Battle } from './battle/Battle';
import { ContainerModal } from './ContainerModal/ContainerModal'
import './App.css'
import ModalVictory from "./ModalVictory/ModalVictory";
import { useSelector } from 'react-redux'
import { MainContext } from "./context";
import Cheats from "./battle/Cheats";


function App() {
  const [switchComponent, setSeitchComponent] = useState(true)
  const [getModalVictory, setGetModalVictory] = useState(false)
  const [batle, setBatle] = useState(false)
  const [isAudioPlay, setIsAudioPlay] = useState(false)
  // const pers = useSelector(({ pers: { pers } }) => pers)
  const {showCheat, setShowCheat} = useContext(MainContext)

  const audioRef = useRef()
  const soundFon = require('./audio/kirill-pokrovsky-original-sin (1).mp3')

  useEffect(() => {
    audioRef.current.volume = 0.2
  }, [])

  const [showAvatar, setShowAvatar] = useState('')

  const play = () => {
    setSeitchComponent(false)
    setBatle(true)
    setGetModalVictory(false)
  }
  const replay = () => {
    setSeitchComponent(true)
    setBatle(false)
    audioRef.current.play()
  }
  const replayVictory = () => {
    setGetModalVictory(false)
    setBatle(false)
    setSeitchComponent(true)
    audioRef.current.play()
  }
  const show_victory_window = () => {
    setSeitchComponent(false)
    setBatle(false)
    setGetModalVictory(true)
  }
  const audioFon = () => {
    if (isAudioPlay) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsAudioPlay(isAudioPlay => !isAudioPlay)
  }
  // const [showCheat,setShowCheat] = useState(false)
  return (
    <div className="wrapper_video">
      <video className="video" src='https://media.istockphoto.com/videos/realistic-dry-ice-smoke-clouds-fog-video-id1175691070' autoPlay loop muted ></video>
      <audio src={soundFon} ref={audioRef} loop ></audio>
      {showCheat && <Cheats/>}
      {switchComponent ? <ContainerModal play={play} setShowAvatar={setShowAvatar} showAvatar={showAvatar} audioFon={audioFon} audioRef={audioRef} /> : null}
      {batle ? <Battle replay={replay} show_victory_window={show_victory_window} showAvatar={showAvatar} /> : null}
      {getModalVictory ? <ModalVictory replayVictory={replayVictory} /> : null}
    </div>
  )
}
export default React.memo(App)
// export default App;
