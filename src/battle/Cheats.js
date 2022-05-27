import React,{useState} from "react"
import { useDispatch,useSelector } from "react-redux";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import { getMyXp } from "../GetXp/GetXp";


export const Cheats = ({setMyXp})=>{
    const pers = useSelector(({pers:{pers}})=>pers)
    // console.log(pers);
    const [cheatsValue,setChetsValue] = useState('')
    const dispatch = useDispatch()
    const getPassword = (cheatsValue)=>{
        if(cheatsValue === ContainerActivType.cheats_life){
            dispatch({type:ContainerActivType.cheats_life})
            setMyXp(getMyXp(pers.xp))
        }if(cheatsValue === ContainerActivType.cheats_strong){
            dispatch({type:ContainerActivType.cheats_strong})
        }if(cheatsValue === ContainerActivType.cheats_armor){
            dispatch({type:ContainerActivType.cheats_armor})
            
        }
        
    }
    return (
        <div className="container_cheats" style={{margin:'100px auto'}}>
        <input type='password'  value = {cheatsValue} onChange={(event)=>setChetsValue(event.target.value)} />
        <button onClick={()=>{
            getPassword(cheatsValue)
            
        }}>Принять</button>
        </div>
    )
}