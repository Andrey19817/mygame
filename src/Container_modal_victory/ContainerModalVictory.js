import React,{useContext} from "react";
import './ContainerModalVictory.css'
import { useDispatch } from "react-redux";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import { MainContext } from "../context";


 function ContainerModalVictory(props){
    const dispatch = useDispatch()
    const audioClickAdress = require('../audio/567421 (online-audio-converter.com).mp3')
    const audioClick = new Audio(audioClickAdress)
    const {isAudioPlay} = useContext(MainContext)

    return(
        <>
        <div className="container_button_victory">
        <h2>Вы победили врага,можете улучшить характеристики</h2>
            <div  className="button_get_xp">
                <p className="victory_sckill">Жизнь</p>
                <button onClick={()=>{
                    dispatch({type:ContainerActivType.increase_performance_life})
                    props.next_level()
                    isAudioPlay && audioClick.play()
                    }
                    }>+</button>
            </div>
            <div  className="button_get_strong">
            <p className="victory_sckill">Сила</p>
            <button onClick={()=>{
                dispatch({type:ContainerActivType.increase_performance_strong})
                props.next_level()
                isAudioPlay && audioClick.play()
            }}>+</button>
            </div>
            <div  className="button_get_armor">
            <p className="victory_sckill">Броня</p>
            <button onClick={()=>{
                dispatch({type:ContainerActivType.increase_performance_armor})
                props.next_level()
                isAudioPlay && audioClick.play()
            }}>+</button>
            </div>
        </div>
        </>
    )
}
export default React.memo(ContainerModalVictory)
