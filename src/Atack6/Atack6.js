



export const Atack6 = (setDisplayResult) => { 
    setDisplayResult(false)   // функция броска д6
    let result = Math.round(Math.random() * (6 - 1) + 1)
    return result
  }