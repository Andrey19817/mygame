import React, { useContext } from "react";
import "./ModalVictory.css";
import { useDispatch, useSelector } from "react-redux";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import PersArea from "../PersArea/PersArea";
import { MainContext } from "../context";
import { getMyXp, getXp } from "../GetXp/GetXp";

function ModalVictory(props) {
  const {
    setMyXp,
    setMonstrArea,
    setLevel,
    setMonstrXp,
    seisBtn_20,
    isAudioPlay,
    setTreatment
  } = useContext(MainContext);
  const audioClickAdress = require("../audio/567421 (online-audio-converter.com).mp3");
  const audioClick = new Audio(audioClickAdress);
  const dispatch = useDispatch();
  const audioVictory = require("../audio/kirill-pokrovsky-bittersweet-regrets.mp3");
  const defaultMonstr = useSelector(({ monstrArea }) => monstrArea[0]);
  return (
    <>
      {isAudioPlay && <audio src={audioVictory} autoPlay loop></audio>}
      <div className="wrapper_victory">
        <div className="dispalay_victory">Поздравляю,ты легенда !</div>
        <div className="container_button_victory_modal">
          <button
            className="button_victory"
            onClick={() => {
              props.replayVictory();
              isAudioPlay && audioClick.play();
              dispatch({ type: ContainerActivType.persReplay });
              setMyXp(getMyXp(10));
              setLevel(0);
              setMonstrArea(defaultMonstr);
              setMonstrXp(getXp(3));
              seisBtn_20(true);
              setTreatment(true)
            }}
          >
            Давай добьем кого не добили ?
          </button>
        </div>
        <PersArea />
      </div>
    </>
  );
}
export default React.memo(ModalVictory);
