import React, { useState, useRef, useEffect,useContext } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import { getMyXp } from "../GetXp/GetXp";
import './Cheats.css'
import { MainContext } from "../context";

const Cheats = () => {
    const {showCheat, setShowCheat,myXp, setMyXp} = useContext(MainContext)
    const pers = useSelector(({ pers: { pers } }) => pers)
    const ref = useRef()
    const [cheatsValue, setChetsValue] = useState('')
    const [cheatsPlay, setCheatsPlay] = useState(false)
    const dispatch = useDispatch()
 const Shao_Kahns_laugh_adress = require('../audio/567478 (online-audio-converter.com).m4a')
 const Shao_Kahns_laugh = new Audio(Shao_Kahns_laugh_adress)

    const getPassword = (cheatsValue) => {   // ввод чита
        if (cheatsValue === ContainerActivType.cheats_life) {
            Shao_Kahns_laugh.play()
            dispatch({ type: ContainerActivType.cheats_life })
            setMyXp(getMyXp(pers.xp))
            cheatsWindowPlay()
        } if (cheatsValue === ContainerActivType.cheats_strong) {
            Shao_Kahns_laugh.play()
            dispatch({ type: ContainerActivType.cheats_strong })
            cheatsWindowPlay()
        } if (cheatsValue === ContainerActivType.cheats_armor) {
            Shao_Kahns_laugh.play()
            dispatch({ type: ContainerActivType.cheats_armor })
            cheatsWindowPlay()
        }
        
    }
    const cheatsWindowPlay = () => { //запуск анимации чита
        setCheatsPlay(true)
        setTimeout(() => {
            setCheatsPlay(false)
        }, 1000)
    }
    useEffect(() => {
        ref.current.focus()
    }, [])

    return (
        <>
            {cheatsPlay && <div className="container_cheats_play"></div>}
            <div className="container_cheats">
                <input ref={ref} className="cheats_input" value={cheatsValue} onChange={(event) => setChetsValue(event.target.value)} onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        getPassword(cheatsValue)
                        setChetsValue('')
                        setTimeout(() => {
                            setShowCheat(false)
                        }, 1000)

                    }
                }} />
            </div>
        </>
    )
}
export default React.memo(Cheats)