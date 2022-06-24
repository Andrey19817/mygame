import React, { useContext } from "react";
import "./ContainerModalDeath.css";
import { useDispatch, useSelector } from "react-redux";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import { getMyXp } from "../GetXp/GetXp";
import { MainContext } from "../context";
import { getXp } from "../GetXp/GetXp";

function ContainerModalDeath(props) {
  const audioClickAdress = require("../audio/567421 (online-audio-converter.com).mp3");
  const audioClick = new Audio(audioClickAdress);
  const pers = useSelector(({ pers: { pers } }) => pers);
  const defaultMonstr = useSelector(({ monstrArea }) => monstrArea[0]);
  const dispatch = useDispatch();
  const {
    setMyXp,
    setDeath,
    setMonstrArea,
    setLevel,
    setMonstrXp,
    seisBtn_20,
    setChange,
    isAudioPlay,
  } = useContext(MainContext);
  return (
    <>
      <h2>Вы закончили игру</h2>
      <div className="container_modal_death">
        <p className="result">Имя: {pers.name}</p>
        <p className="result">Уровень: {pers.level}</p>
        <p className="result">Жизнь: {pers.xp}</p>
        <p className="result">Сила: {pers.strong}</p>
        <p className="result">Броня: {pers.armor}</p>
        <button
          className="button_container_death"
          onClick={() => {
            dispatch({ type: ContainerActivType.getPersArea });
            isAudioPlay && audioClick.play();
            props.replay();
            dispatch({ type: ContainerActivType.persReplay });
            setMyXp(getMyXp(10));
            setDeath(false);
            setLevel(0);
            setMonstrArea(defaultMonstr);
            setMonstrXp(getXp(3));
            seisBtn_20(true);
            setChange(true);
          }}
        >
          Начать еще раз ?
        </button>
      </div>
    </>
  );
}
export default React.memo(ContainerModalDeath);
