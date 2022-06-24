import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import { MainContext } from "./context";
import { getMyXp } from "./GetXp/GetXp";
import { useSelector } from "react-redux";
import { getXp } from "./GetXp/GetXp";

const Main = () => {
  const pers = useSelector(({ pers: { pers } }) => pers);
  const [level, setLevel] = useState(0);
  const [showCheat, setShowCheat] = useState(false);
  const [myXp, setMyXp] = useState(getMyXp(pers.xp)); // жизнь героя
  const [treatment, setTreatment] = useState(true);
  const [death, setDeath] = useState(false); // переключатель отображения окна смерти героя
  const [monstrArea, setMonstrArea] = useState(
    useSelector(({ monstrArea }) => monstrArea[level])
  );
  const [treatment_play, setTreatment_play] = useState(false);
  const [monstrXp, setMonstrXp] = useState(getXp(monstrArea.xp)); // жизнь противника
  const [damageMy_Display, setDamageMy_Display] = useState(false);
  const [damageMy, setDamageMy] = useState(null);
  const [damageMonstr_Display, setDamageMonstr_Display] = useState(false); //отображение урона монстра
  const [damageMonstr, setDamageMonstr] = useState(null); //результат урона монстра
  const [change, setChange] = useState(true); // переключатель хода
  const [isBtn, setisBtn] = useState(false); // переключатель отображения кнопки д6 и попадания
  const [isBtn_20, seisBtn_20] = useState(true); // переключатель отображения кнопки д20
  const [displayDice, setDisplayDice] = useState(null); // переключатель отображения результат кубика
  const [displayDice_6, setDisplayDice_6] = useState(3); //отображение результата кубика д6
  const [isAudioPlay, setIsAudioPlay] = useState(false);
  const persArea = useSelector(({ persArea }) => persArea);
  const [regulations, setRegulations] = useState(true);
  const audioFon = () => {
    setIsAudioPlay((isAudioPlay) => !isAudioPlay);
  };

  return (
    <MainContext.Provider
      value={{
        persArea,
        showCheat,
        setShowCheat,
        myXp,
        setMyXp,
        pers,
        treatment,
        setTreatment,
        death,
        setDeath,
        setTreatment_play,
        treatment_play,
        level,
        monstrArea,
        setLevel,
        setMonstrArea,
        monstrXp,
        setMonstrXp,
        damageMy_Display,
        setDamageMy_Display,
        damageMy,
        setDamageMy,
        damageMonstr_Display,
        setDamageMonstr_Display,
        damageMonstr,
        setDamageMonstr,
        change,
        setChange,
        isBtn,
        setisBtn,
        isBtn_20,
        seisBtn_20,
        displayDice,
        setDisplayDice,
        displayDice_6,
        setDisplayDice_6,
        isAudioPlay,
        setIsAudioPlay,
        audioFon,
        regulations,
        setRegulations,
      }}
    >
      <App />,
    </MainContext.Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);
