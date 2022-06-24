import React, { useState, useRef, useEffect, useContext } from "react";
import { Battle } from "./battle/Battle";
import { ContainerModal } from "./ContainerModal/ContainerModal";
import "./App.css";
import ModalVictory from "./ModalVictory/ModalVictory";
import { MainContext } from "./context";
import Cheats from "./battle/Cheats";
import { useDispatch, useSelector } from "react-redux";
import { ContainerActivType } from "./ContainerActivType/ContainerActivType";
import { getMyXp, getXp } from "./GetXp/GetXp";

function App() {
  const [switchComponent, setSeitchComponent] = useState(true);
  const [getModalVictory, setGetModalVictory] = useState(false);
  const [batle, setBatle] = useState(false);
  const {
    showCheat,
    setisBtn,
    isAudioPlay,
    seisBtn_20,
    audioFon,
    setLevel,
    setMonstrArea,
    setMyXp,
    setMonstrXp,
    setTreatment,
    setRegulations,
  } = useContext(MainContext);
  const [show_image_selection, setShow_image_selection] = useState(false); //показать окно выбора картинки
  const [show_input, setShow_input] = useState(true); //показ инпута
  const dispatch = useDispatch();
  const defaultMonstr = useSelector(
    ({ monstrArea }) => monstrArea.filter((elem) => elem.check)[0]
  );
  const [admin, setAdmin] = useState(false);
  const audioRef = useRef();
  const soundFon = require("./audio/kirill-pokrovsky-original-sin (1).mp3");
  const audioClickAdress = require("./audio/567421 (online-audio-converter.com).mp3");
  const audioClick = new Audio(audioClickAdress);

  useEffect(() => {
    if (isAudioPlay && !batle && !getModalVictory) {
      audioRef.current.volume = 0.2;
    }
  });

  const [showAvatar, setShowAvatar] = useState("");

  const play = () => {
    setSeitchComponent(false);
    setBatle(true);
    setGetModalVictory(false);
  };
  const replay = () => {
    setSeitchComponent(true);
    setBatle(false);
    setShow_image_selection(false);
    setShow_input(true);
  };
  const replayVictory = () => {
    setGetModalVictory(false);
    setBatle(false);
    setSeitchComponent(true);
    setShow_image_selection(false);
    setShow_input(true);
  };
  const show_victory_window = () => {
    setSeitchComponent(false);
    setBatle(false);
    setGetModalVictory(true);
  };
  const funcExit = () => {
    isAudioPlay && audioClick.play();
    setAdmin(false);
    setSeitchComponent(true);
    setBatle(false);
    setShow_image_selection(false);
    setShow_input(true);
    setGetModalVictory(false);
    setisBtn(false);
    !show_input &&
      !switchComponent &&
      !getModalVictory &&
      dispatch({ type: ContainerActivType.getPersArea });
    dispatch({ type: ContainerActivType.persReplay });
    setMyXp(getMyXp(10));
    setLevel(0);
    setMonstrArea(defaultMonstr);
    setMonstrXp(getXp(defaultMonstr.xp));
    seisBtn_20(true);
    setTreatment(true);
    setRegulations(false);
  };

  return (
    <div className="wrapper_video">
      <div
        className={`${isAudioPlay ? "button_volume_on" : "button_volume_off"}`}
        onClick={() => {
          audioFon();
          audioClick.play();
        }}
      ></div>
      <video
        className="video"
        src="https://media.istockphoto.com/videos/realistic-dry-ice-smoke-clouds-fog-video-id1175691070"
        autoPlay
        loop
        muted
      ></video>
      {isAudioPlay && !batle && !getModalVictory ? (
        <audio src={soundFon} ref={audioRef} autoPlay loop></audio>
      ) : null}
      {showCheat && <Cheats />}
      {switchComponent && (
        <ContainerModal
          play={play}
          setShowAvatar={setShowAvatar}
          showAvatar={showAvatar}
          audioFon={audioFon}
          audioRef={audioRef}
          setShow_image_selection={setShow_image_selection}
          show_image_selection={show_image_selection}
          show_input={show_input}
          setShow_input={setShow_input}
          setAdmin={setAdmin}
          admin={admin}
        />
      )}
      {batle && (
        <Battle
          replay={replay}
          show_victory_window={show_victory_window}
          showAvatar={showAvatar}
        />
      )}
      {getModalVictory ? <ModalVictory replayVictory={replayVictory} /> : null}
      <div className="button_exit" onClick={funcExit}></div>
    </div>
  );
}
export default React.memo(App);
