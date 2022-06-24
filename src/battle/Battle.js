import React, { useEffect, useState, useRef, useContext } from "react";
import "./Battle.css";
import { Atack6 } from "../Atack6/Atack6";
import { getMyXp, getXp } from "../GetXp/GetXp";
import ContainerModalVictory from "../Container_modal_victory/ContainerModalVictory";
import ContainerModalDeath from "../ContainerModalDeath/ContainerModalDeath";
import { useSelector, useDispatch } from "react-redux";
import { ContainerCharacteristics } from "../ContainerCharacteristics/ContainerCharacteristics";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import { MainContext } from "../context";
import { ContainerButton } from "../ContainerButton/ContainerButton";

// ============================================================
export function Battle({ replay, show_victory_window, showAvatar }) {
  const dispatch = useDispatch();
  const {
    setShowCheat,
    myXp,
    setMyXp,
    pers,
    setTreatment,
    death,
    setDeath,
    level,
    monstrArea,
    setLevel,
    setMonstrArea,
    monstrXp,
    setMonstrXp,
    setDamageMy_Display,
    setDamageMy,
    damageMonstr_Display,
    setDamageMonstr_Display,
    setDamageMonstr,
    change,
    setChange,
    setisBtn,
    seisBtn_20,
    setDisplayDice_6,
    setDisplayDice,
    isAudioPlay,
  } = useContext(MainContext);
  const monstrArea_next_level_for_filter = useSelector(
    ({ monstrArea }) => monstrArea
  );
  const monstrArea_next_level = monstrArea_next_level_for_filter.filter(
    (elem) => elem.check
  );
  const [isBtn_20_miss, setisBtn_20_miss] = useState(false); // переключатель отображения кнопки д20 и попадания
  const [displayDiceMonstr, setDisplayDiceMonstr] = useState(null); // переключатель отображения результата кубика
  const [displayDiceMonstr_d6, setDisplayDiceMonstr_d6] = useState(3);
  const [victory, setVictory] = useState(false); //отображение кнопки продолжить
  const [dice_20_monstr_activ, setDice_20_monstr_activ] = useState(false);
  const [dice_6_monstr_activ, setDice_6_monstr_activ] = useState(false);
  const [displayResult, setDisplayResult] = useState(false); //отображение строки - попадание
  const audioDice = require("../audio/katyatsya-po-stolu.mp3");
  const audioBattleFon = require("../audio/kirill-pokrovsky-beyond-the-waves-of-time.mp3");
  const audioDiceMonstr = new Audio(audioDice);
  const audioRef_batle_fon = useRef();
  const audioHit = require("../audio/silnyiy-zamah-i-razrez-popolam.mp3");
  const audioHitMonstr = new Audio(audioHit);
  const audioDeathAdress = require("../audio/kirill-pokrovsky-memories-of-the-future.mp3");

  const FuncAtackMonstr = () => {
    // функция атаки противника
    isAudioPlay && audioDiceMonstr.play();
    setDice_20_monstr_activ(true);
    setDice_6_monstr_activ(true);
    setTimeout(() => {
      let res20 = Math.round(Math.random() * (20 - 1) + 1);
      setDisplayDiceMonstr(res20);
      if (res20 + monstrArea.strong >= pers.armor) {
        setDisplayResult(true);
        setTimeout(() => {
          setDisplayResult(false);
        }, 1000);
        let res = [...myXp];
        let res6 = Atack6(setDisplayResult);
        setDisplayDiceMonstr_d6(res6);
        setDamageMonstr(res6 + Number(monstrArea.strong));
        res.splice(0, res6 + Number(monstrArea.strong));
        setMyXp(res);
        setDamageMonstr_Display(true);
        isAudioPlay && audioHitMonstr.play();
        setChange(true);
        seisBtn_20(true);
        setTimeout(() => {
          setDamageMonstr_Display(false);
        }, 2000);
      } else {
        setisBtn_20_miss(true);
        setTimeout(() => {
          setisBtn_20_miss(false);
        }, 1000);
        seisBtn_20(true);
        setChange(true);
        seisBtn_20(true);
      }
      if (myXp.length === 0) {
        setDeath(true);
        setChange(false);
      } else {
        setChange(true);
        seisBtn_20(true);
      }
    }, 1000);
    setTimeout(() => {
      setDice_20_monstr_activ(false);
      setDice_6_monstr_activ(false);
    }, 2000);
  };

  const Atack20 = () => {
    // функция броска д20
    dispatch({ type: ContainerActivType.getCounter });
    setisBtn_20_miss(false);
    let result = Math.round(Math.random() * (20 - 1) + 1);
    setDisplayDice(result);
    if (result + pers.strong >= monstrArea.armor) {
      setTimeout(() => {
        seisBtn_20(false);
        setisBtn(true);
      }, 1000);
      setDisplayResult(true);
      setTimeout(() => {
        setDisplayResult(false);
      }, 1000);
    } else {
      setisBtn_20_miss(true);
      setTimeout(() => {
        setisBtn_20_miss(false);
      }, 1000);
      seisBtn_20(false);
      setTimeout(() => {
        FuncAtackMonstr();
        seisBtn_20(true);
      }, 1000);
      seisBtn_20(true);
    }
    return result;
  };

  const FuncAtack = () => {
    // функция атаки
    let res = [...monstrXp];
    let res6 = Atack6(setDisplayResult);
    setDisplayDice_6(res6);
    res.splice(0, res6 + pers.strong);
    setMonstrXp(res);
    setDamageMy(res6 + pers.strong);
    setDamageMy_Display(true);
    setTimeout(() => {
      setDamageMy_Display(false);
    }, 2000);
    if (res.length > 0) {
      setTimeout(() => {
        FuncAtackMonstr();
      }, 1000);
    }
  };

  const next_level = () => {
    if (monstrArea_next_level[level + 1] + 1) {
      setLevel(level + 1);
      setMonstrArea(monstrArea_next_level[level + 1]);
      setMonstrXp(getXp(monstrArea_next_level[level + 1].xp));
      setMyXp(getMyXp(pers.xp));
      seisBtn_20(true);
      setTreatment(true);
    } else {
      show_victory_window();
    }
  };
  useEffect(() => {
    if (isAudioPlay && !death) {
      audioRef_batle_fon.current.volume = 0.2;
    }
  }, [isAudioPlay]);

  useEffect(() => {
    if (monstrXp.length === 0) {
      seisBtn_20(false);
      setVictory(true);
    } else {
      setVictory(false);
    }
    if (myXp.length === 0) {
      setDeath(true);
      setChange(false);
    }
  }, [monstrXp, myXp, monstrArea]);

  return (
    <div
      className="wrapper"
      tabIndex={0}
      onKeyDown={(event) => {
        // показ окна для читов
        event.key === `Escape` && setShowCheat(true);
      }}
    >
      {damageMonstr_Display && <div className="myTakesDamage"></div>}

      {!death && isAudioPlay && (
        <audio
          src={audioBattleFon}
          autoPlay
          loop
          ref={audioRef_batle_fon}
        ></audio>
      )}
      {death && isAudioPlay && (
        <audio src={audioDeathAdress} autoPlay loop></audio>
      )}

      <div
        className={`container_atack_monstr_d20 ${
          dice_20_monstr_activ ? "dice_20_monstr_play" : ""
        } `}
      >
        <div className="diceMonstr">{displayDiceMonstr}</div>
      </div>

      <div
        className={`container_atack_monstr_d6 ${
          dice_6_monstr_activ ? "dice_6_monstr_play" : ""
        }`}
      >
        {displayDiceMonstr_d6}
      </div>
      <div className="nameMonstr">- {monstrArea.name} -</div>

      <ContainerCharacteristics showAvatar={showAvatar} />

      {displayResult && <p className="message message_hit">Попадание</p>}
      {monstrXp.length === 0 && (
        <p className="message message_victory">Победа</p>
      )}
      {death && <p className="message message_death">Вы погибли</p>}
      {isBtn_20_miss && (
        <p className="message message_miss">
          мимо
          <br />
        </p>
      )}
      <div className="container_my_xp">{myXp.map((elem) => elem)}</div>
      <div className="containerPers">
        <div className="myName">- {pers.name} -</div>
      </div>
      {change && <ContainerButton FuncAtack={FuncAtack} Atack20={Atack20} />}
      {victory && <ContainerModalVictory next_level={next_level} />}
      {death && <ContainerModalDeath replay={replay} />}
    </div>
  );
}

// ======================================================

// ==========================================================

// ============================================================
