import { nanoid } from "nanoid"
import React from 'react'



export function getXp(num) {    // функция формирования линии жизни противника
    let arr = []
    for (let i = 0; i < num; i++) {
      arr.push(<div className="xp" key={nanoid(10)}></div>)
    }

    return arr
  }

  export function getMyXp(num) {    // функция формирования линии жизни героя
    let myArr = []
    for (let i = 0; i < num; i++) {
      myArr.push(<div className="xp" key={nanoid(10)}></div>)
    }
    return myArr
  }