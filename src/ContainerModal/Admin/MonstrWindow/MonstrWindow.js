import React, { useState, useContext } from "react";
import "./MonstrWindow.css";
import { useDispatch } from "react-redux";
import { ContainerActivType } from "../../../ContainerActivType/ContainerActivType";
import { MainContext } from "../../../context";

export const MonstrWindow = ({
  name,
  avatar,
  xp,
  strong,
  armor,
  check,
  id,
}) => {
  const { isAudioPlay } = useContext(MainContext);
  const dispatch = useDispatch();
  const [opacity, setOpacity] = useState(check);
  const [valueLife, setValueLife] = useState(xp);
  const [valueStrong, setValueStrong] = useState(strong);
  const [valueArmor, setValueArmor] = useState(armor);
  const audioClickAdress = require("../../../audio/567421 (online-audio-converter.com).mp3");
  const audioClick = new Audio(audioClickAdress);

  return (
    <div className={`div_container_monstr ${!opacity ? "opacity" : null}`}>
      <img
        style={{ width: "100px", height: "100px" }}
        src={avatar}
        alt=""
        onClick={() => {
          //блокировка на удаление первого монстра
          isAudioPlay && audioClick.play();
          if (id !== 1) {
            dispatch({ type: ContainerActivType.getCheck, payload: id });
            setOpacity((prev) => !prev);
          }
        }}
      />
      <p>{name}</p>
      <div className="container_characteristic">
        <div className="characteristic">
          Жизнь -{" "}
          <input
            className="input_monstr_window"
            value={valueLife}
            onChange={(event) => {
              setValueLife(event.target.value);
            }}
          ></input>
        </div>
        <div className="characteristic">
          Сила -{" "}
          <input
            className="input_monstr_window"
            type="text"
            value={valueStrong}
            onChange={(event) => {
              setValueStrong(event.target.value);
            }}
          />
        </div>
        <div className="characteristic">
          Броня -{" "}
          <input
            className="input_monstr_window"
            type="text"
            value={valueArmor}
            onChange={(event) => {
              setValueArmor(event.target.value);
            }}
          />
        </div>
        <button
          className="button_reestablish"
          onClick={() => {
            dispatch({
              type: ContainerActivType.life_editing,
              payload: {
                id: id,
                xp: valueLife,
                strong: valueStrong,
                armor: valueArmor,
              },
            });
            isAudioPlay && audioClick.play();
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};
