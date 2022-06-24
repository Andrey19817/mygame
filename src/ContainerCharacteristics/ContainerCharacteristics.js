import React,{useState,useContext} from "react"
import { useSelector } from "react-redux"
import { MainContext } from "../context"
import { getMyXp } from '../GetXp/GetXp'
import './ContainerCharacteristics.css'


export const ContainerCharacteristics = ({
   showAvatar})=>{
      const {treatment,setTreatment,death,setMyXp,myXp,setTreatment_play,monstrXp,damageMy_Display,damageMy,damageMonstr_Display,monstrArea,damageMonstr,treatment_play,isAudioPlay} = useContext(MainContext)
        const [pers, setPers] = useState(useSelector(({pers:{pers}})=>pers))
        const audioTreatmentAdress = require('../audio/568274 (online-audio-converter.com).mp3')
        const audioTreatment = new Audio(audioTreatmentAdress)
        
    return (
        <div className="container_characteristics">
          {treatment_play ? <div className="treatment_play"></div> : null}
        <div className="container_my_characteristics">
          <img src={showAvatar.src} style={{ width: '60px', height: '60px', boxShadow: '0 0 10px 2px green',border: '1px solid',
    borderImage: 'url(https://i.gifer.com/RRr2.gif)  1 ' }} alt="" />
          <p>Уровень {pers.level}</p>
          <p>Жизнь {myXp.length}</p>
          <p>Сила {pers.strong}</p>
          <p>Броня {pers.armor}</p>
          {treatment && !death ? <div className="treatment" onClick={() => {
            isAudioPlay && audioTreatment.play()
            setTreatment_play(true)
            setMyXp(getMyXp(pers.xp))
            setTreatment(false)
            setTimeout(() => {
              setTreatment_play(false)
            }, 1000)
            myXp.map(elem => elem)
          }}></div> : null}
        </div>

        <div className="container_monstr_display">
          <div className="container_monstr_xp">
            {monstrXp.map(elem => elem)}
          </div>

          <div className="monstr" style={{
            backgroundImage: `url(${monstrArea.img})`,
          }}>
            {damageMy_Display ? <div className="damageMy">{- damageMy}</div> : null}
            {damageMy_Display ? <div className="monsterTakesDamage"></div> : null}
          </div>
          {damageMonstr_Display ? <div className="damageMonstr">{- damageMonstr}</div> : null}

        </div>
        <div className="container_monstr_characteristics">
          <img src={monstrArea.img} style={{ width: '60px', height: '60px', boxShadow: '0 0 10px 2px red',border: '1px solid',
    borderImage: 'url(https://acegif.com/wp-content/gifs/fire-13.gif)  27 '  }} alt="" />

          <p>Уровень {monstrArea.id}</p>
          <p>Жизнь {monstrXp.length}</p>
          <p>Сила {monstrArea.strong}</p>
          <p>Броня {monstrArea.armor}</p>
        </div>
      </div>
    )
}