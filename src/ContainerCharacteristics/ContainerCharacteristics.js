import React,{useState} from "react"
import { useSelector } from "react-redux"
import { getMyXp } from '../GetXp/GetXp'


export const ContainerCharacteristics = ({treatment,death,audioTreatment,setTreatment_play,setMyXp,setTreatment,
    myXp,monstrXp,damageMy_Display,damageMy,damageMonstr_Display,damageMonstr,showAvatar,monstrArea})=>{
        const [pers, setPers] = useState(useSelector(({pers:{pers}})=>pers))
        
    return (
        <div className="container_characteristics">
        <div className="container_my_characteristics">
          <img src={showAvatar.src} style={{ width: '60px', height: '60px', boxShadow: '0 0 10px 2px green',border: '1px solid',
    borderImage: 'url(https://i.gifer.com/RRr2.gif)  1 ' }} alt="" />
          <p>Уровень {pers.level}</p>
          <p>Жизнь {myXp.length}</p>
          <p>Сила {pers.strong}</p>
          <p>Броня {pers.armor}</p>
          {treatment && !death ? <div className="treatment" onClick={() => {
            audioTreatment.play()
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