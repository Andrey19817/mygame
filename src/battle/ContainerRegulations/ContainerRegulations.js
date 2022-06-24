import React, { useContext } from "react";
import { MainContext } from "../../context";
import "./ContainerRegulations.css";

export const ContainerRegulations = () => {
  const { setRegulations, isAudioPlay } = useContext(MainContext);
  const audioClickAdress = require("../../audio/567421 (online-audio-converter.com).mp3");
  const audioClick = new Audio(audioClickAdress);
  return (
    <div className="ContainerRegulations">
      <h2 className="rule_header">Правила игры</h2>
      <p>У игрока и его противника есть характеристики:</p>
      <ul className="regulations_ul">
        <li>колличество жизни</li>
        <li>сила</li>
        <li>броня</li>
      </ul>
      <p>
        Если бросок кубика <span>D20</span> + параметр силы превышает или равен
        параметру брони противника то засчитывается попадание и появляется
        возможность броска кубика <span>D6</span>,значением которого + параметр
        силы наносится урон.
      </p>
      <p>
        Если же бросок кубика <span>D20</span> + параметр силы не превышает
        параметр брони то засчитываеся промах
      </p>
      <p>
        по окончанию каждого раунда у игрока появляется возможность увеличить
        свои характеристики и стать сильнее.
      </p>
      <h2 className="rule_header">Удачной игры герой !</h2>
      <button
        className="regulations_button"
        onClick={() => {
          setRegulations(false);
          isAudioPlay && audioClick.play();
        }}
      >
        Далее
      </button>
    </div>
  );
};
