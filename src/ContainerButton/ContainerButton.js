import { useContext } from "react";
import { MainContext } from "../context";
import React, { useState, useRef } from "react";

export const ContainerButton = ({ FuncAtack, Atack20 }) => {
  const {
    isBtn,
    setisBtn,
    isBtn_20,
    displayDice_6,
    displayDice,
    isAudioPlay,
  } = useContext(MainContext);
  const [dice_20_activ, setDice_20_activ] = useState(false); //класс для запуска анимации д20
  const [dice_6_activ, setDice_6_activ] = useState(false); //класс для запуска анимации д6
  const audioRef = useRef();
  const audioDice = require("../audio/katyatsya-po-stolu.mp3");
  const audioHit = require("../audio/silnyiy-zamah-i-razrez-popolam.mp3");
  const audioHitPlay = useRef();

  const atack6 = () => {
    isAudioPlay && audioRef.current.play();
    setDice_6_activ(true);
    setTimeout(() => {
      isAudioPlay && audioHitPlay.current.play();
      FuncAtack();
    }, 1000);
    setTimeout(() => {
      setDice_6_activ(false);
      setisBtn(false);
    }, 2000);
  };
  const atack20 = () => {
    isAudioPlay && audioRef.current.play();
    setDice_20_activ(true);
    setTimeout(() => {
      Atack20();
    }, 1000);
    setTimeout(() => {
      setDice_20_activ(false);
    }, 2000);
  };

  return (
    <div className="container_button">
      {isAudioPlay && <audio src={audioDice} ref={audioRef}></audio>}
      {isAudioPlay && <audio src={audioHit} ref={audioHitPlay}></audio>}
      {isBtn && (
        <div className="container_button_atack6">
          <div
            className={`dice_6 ${dice_6_activ ? "dice_6_play" : ""}`}
            onClick={atack6}
          >
            {displayDice_6}
          </div>
        </div>
      )}
      {isBtn_20 && (
        <div className="containr_button_atack20 ">
          <div
            className={`dice_20 ${dice_20_activ ? "dice_20_play" : ""}`}
            onClick={atack20}
          >
            <div className="myDice">{displayDice}</div>
          </div>
        </div>
      )}
    </div>
  );
};
