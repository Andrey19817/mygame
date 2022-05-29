import React, { useEffect, useState, useRef } from "react";
import './Battle.css'
import { Atack6 } from '../Atack6/Atack6'
import { getMyXp, getXp } from '../GetXp/GetXp'
import { ContainerModalVictory} from "../Container_modal_victory/ContainerModalVictory";
import { ContainerModalDeath } from '../ContainerModalDeath/ContainerModalDeath'
import {useSelector} from 'react-redux'
import {ContainerCharacteristics} from '../ContainerCharacteristics/ContainerCharacteristics'
import {Cheats} from './Cheats'

// ============================================================
function Battle(props) {
  const pers = useSelector(({pers:{pers}})=>pers)
  const [level, setLevel] = useState(0)
  const monstrArea_next_level = useSelector(({monstrArea})=>monstrArea)
  const [monstrArea, setMonstrArea] = useState(useSelector(({monstrArea})=>monstrArea[level]))
  let armorMonstr = monstrArea.armor // броня противника
  let armorMy = pers.armor  // броня героя
  let strongMonstr = monstrArea.strong
  let strongMy = pers.strong
  const [monstrXp, setMonstrXp] = useState(getXp(monstrArea.xp))// жизнь противника
  const [myXp, setMyXp] = useState(getMyXp(pers.xp))// жизнь героя
  const [isBtn, setisBtn] = useState(false)// переключатель отображения кнопки д6 и попадания
  const [isBtn_20, seisBtn_20] = useState(true)// переключатель отображения кнопки д20
  const [isBtn_20_miss, setisBtn_20_miss] = useState(false)// переключатель отображения кнопки д20 и попадания
  const [change, setChange] = useState(true)// переключатель хода
  const [death, setDeath] = useState(false)// переключатель отображения окна смерти героя
  const [displayDice, setDisplayDice] = useState(null)// переключатель отображения результат кубика
  const [displayDice_6, setDisplayDice_6] = useState(3) //отображение результата кубика д6
  const [displayDiceMonstr, setDisplayDiceMonstr] = useState(null)// переключатель отображения результата кубика
  const [displayDiceMonstr_d6, setDisplayDiceMonstr_d6] = useState(3)
  const [damageMonstr, setDamageMonstr] = useState(null)//результат урона монстра
  const [damageMonstr_Display, setDamageMonstr_Display] = useState(false)//отображение урона монстра
  const [damageMy, setDamageMy] = useState(null)
  const [damageMy_Display, setDamageMy_Display] = useState(false)
  const [victory, setVictory] = useState(false)//отображение кнопки продолжить
  const [dice_20_activ, setDice_20_activ] = useState(false) //класс для запуска анимации д20
  const [dice_6_activ, setDice_6_activ] = useState(false)//класс для запуска анимации д6
  const [dice_20_monstr_activ, setDice_20_monstr_activ] = useState(false)
  const [dice_6_monstr_activ, setDice_6_monstr_activ] = useState(false)
  const [displayResult, setDisplayResult] = useState(false)//отображение строки - попадание

  const audioRef = useRef()
  const audioDice = require('../audio/katyatsya-po-stolu.mp3')
  const audioBattleFon = require('../audio/kirill-pokrovsky-beyond-the-waves-of-time.mp3')
  const audioDiceMonstr = new Audio(audioDice)
  const audioRef_batle_fon = useRef()
  const audioHit = require('../audio/silnyiy-zamah-i-razrez-popolam.mp3')
  const audioHitPlay = useRef()
  const audioHitMonstr = new Audio(audioHit)
  const [treatment_play, setTreatment_play] = useState(false)
  const [treatment, setTreatment] = useState(true)
  const audioTreatmentAdress = require('../audio/568274 (online-audio-converter.com).mp3')
  const audioTreatment = new Audio(audioTreatmentAdress)
  const audioDeathAdress = require('../audio/kirill-pokrovsky-memories-of-the-future.mp3')

  const FuncAtackMonstr = () => {   // функция атаки противника
    audioDiceMonstr.play()
    setDice_20_monstr_activ(true)
    setDice_6_monstr_activ(true)
    setTimeout(() => {
      let res20 = Math.round(Math.random() * (20 - 1) + 1)
      setDisplayDiceMonstr(res20)
      if (res20 + strongMonstr >= armorMy) {
        setDisplayResult(true)
        setTimeout(() => {
          setDisplayResult(false)
        }, 1000)
        let res = [...myXp]
        let res6 = Atack6(setDisplayResult)
        setDisplayDiceMonstr_d6(res6)
        setDamageMonstr(res6 + strongMonstr)
        res.splice(0, res6 + strongMonstr)
        setMyXp(res)
        setDamageMonstr_Display(true)
        audioHitMonstr.play()
        setChange(true)
        seisBtn_20(true)
        setTimeout(() => {
          setDamageMonstr_Display(false)
        }, 2000)
      } else {
        setisBtn_20_miss(true)
        setTimeout(() => {
          setisBtn_20_miss(false)
        }, 1000)
        seisBtn_20(true)
        setChange(true)
        seisBtn_20(true)
      } if (myXp.length === 0) {
        setDeath(true)
        setChange(false)
      } else {
        setChange(true)
        seisBtn_20(true)
      }
    }, 1000)
    setTimeout(() => {
      setDice_20_monstr_activ(false)
      setDice_6_monstr_activ(false)
    }, 2000)
  }

  const Atack20 = () => {     // функция броска д20
    setisBtn_20_miss(false)
    let result = Math.round(Math.random() * (20 - 1) + 1)
    setDisplayDice(result)
    if (result + strongMy >= armorMonstr) {
      setTimeout(() => {
        seisBtn_20(false)
        setisBtn(true)
      }, 1000)
      setDisplayResult(true)
      setTimeout(() => {
        setDisplayResult(false)
      }, 1000)
    } else {
      setisBtn_20_miss(true)
      setTimeout(() => {
        setisBtn_20_miss(false)
      }, 1000)
      seisBtn_20(false)
      setTimeout(() => {
        FuncAtackMonstr()
        seisBtn_20(true)
      }, 1000)
      seisBtn_20(true)
    }
    return result
  }

  const FuncAtack = () => {                 // функция атаки
    let res = [...monstrXp]
    let res6 = Atack6(setDisplayResult)
    setDisplayDice_6(res6)
    res.splice(0, res6 + strongMy)
    setMonstrXp(res)
    setDamageMy(res6 + strongMy)
    setDamageMy_Display(true)
    setTimeout(() => {
      setDamageMy_Display(false)
    }, 2000)
    if (res.length > 0) {
      setTimeout(() => {
        FuncAtackMonstr()
      }, 1000)
    }
  }

  const next_level = () => {
    if (monstrArea_next_level[level + 1] + 1) {
      setLevel(level + 1)
      setMonstrArea(monstrArea_next_level[level + 1])
      setMonstrXp(getXp(monstrArea_next_level[level + 1].xp))
      setMyXp(getMyXp(pers.xp))
      seisBtn_20(true)
      setTreatment(true)
    } else {
      props.show_victory_window()
    }
  }

  useEffect(() => {
    audioRef_batle_fon.current.volume = 0.2
  }, [])

  
    useEffect(() => {
      if (monstrXp.length === 0) {
        seisBtn_20(false)
        setVictory(true)
      } else {
        setVictory(false)
      }
      if (myXp.length === 0) {
        setDeath(true)
        setChange(false)
      }
    }, [monstrXp, myXp, monstrArea])
  

  return (
    <div className="wrapper">
      {damageMonstr_Display ? <div className="myTakesDamage"></div> : null}
      {treatment_play ? <div className="treatment_play"></div> : null}
      <audio src={audioDice} ref={audioRef}></audio>
      {!death ? <audio src={audioBattleFon} autoPlay loop ref={audioRef_batle_fon}></audio> : <audio src={audioDeathAdress} autoPlay loop></audio>}
      <audio src={audioHit} ref={audioHitPlay}></audio>
      <div className={`container_atack_monstr_d20 ${dice_20_monstr_activ ? 'dice_20_monstr_play' : ''} `} >
        {/* <div className="diceMonstr_bacground">
        </div> */}
                <div className="diceMonstr">{displayDiceMonstr}</div>

      </div>
      <div className={`container_atack_monstr_d6 ${dice_6_monstr_activ ? 'dice_6_monstr_play' : ''}`}>{displayDiceMonstr_d6}</div>
      <div className="nameMonstr">- {monstrArea.name} -</div>

    <ContainerCharacteristics level = {level} treatment={treatment} death={death} audioTreatment={audioTreatment}
    setTreatment_play={setTreatment_play} setMyXp={setMyXp} setTreatment={setTreatment} myXp={myXp} monstrXp={monstrXp}
    damageMy_Display={damageMy_Display} damageMy={damageMy} damageMonstr_Display={damageMonstr_Display} 
    damageMonstr={damageMonstr} showAvatar={props.showAvatar} monstrArea={monstrArea}
    />

      {displayResult ? <p className="message message_hit">Попадание</p> : null}
      {monstrXp.length === 0 ? <p className="message message_victory">Победа</p> : null}
      {death ? <p className="message message_death">Вы погибли</p> : null}
      {isBtn_20_miss ? <p className="message message_miss">мимо<br /></p> : null}

      <div className="container_my_xp">
        {myXp.map(elem => elem)}
      </div>

      <div className="containerPers">
        <div className="myName" style={{color:'#DCA97E'}}>- {pers.name} -</div>
      </div>
      {change ? <div className="container_button">
        {isBtn ? <div className="container_button_atack6">
          <div className={`dice_6 ${dice_6_activ ? 'dice_6_play' : ''}`} onClick={() => {
            audioRef.current.play()
            setDice_6_activ(true)
            setTimeout(() => {
              audioHitPlay.current.play()
              FuncAtack()
            }, 1000)
            setTimeout(() => {
              setDice_6_activ(false)
              setisBtn(false)
            }, 2000)
          }}>{displayDice_6}</div>
        </div> : null}

        {isBtn_20 ? <div className="containr_button_atack20 ">

          <div className={`dice_20 ${dice_20_activ ? 'dice_20_play' : ''}`} onClick={() => {
            audioRef.current.play()
            setDice_20_activ(true)
            setTimeout(() => {
              Atack20()
            }, 1000)
            setTimeout(() => {
              setDice_20_activ(false)
            }, 2000)
          }}><div className="myDice">{displayDice}</div></div>
        </div> : null}
      </div> : null}
         
      {victory ? <ContainerModalVictory next_level={next_level} /> : null}
      {death ? <ContainerModalDeath  replay={props.replay} /> : null}
      <Cheats setMyXp = {setMyXp} armorMy={armorMy}/>
    </div>
  )
}

export default React.memo(Battle)
// ======================================================

// ==========================================================

// ============================================================

