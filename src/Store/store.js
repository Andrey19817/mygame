import { createStore } from 'redux'
import { pers } from '../ContainerPers/ContainerPers'
import { monstrArea } from '../contaiinerMonstr/ContainerMonstr'
import { ContainerActivType } from '../ContainerActivType/ContainerActivType'




const defaultState = {
   pers: pers,
   monstrArea: monstrArea,
}
const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case ContainerActivType.increase_performance_life:
         return {
            ...state, state: pers.pers.xp += 2,
            state: pers.pers.level += 1
         }
      case ContainerActivType.increase_performance_strong:
         return {
            ...state, state: pers.pers.strong += 1,
            state: pers.pers.level += 1
         }
      case ContainerActivType.increase_performance_armor:
         return {
            ...state, state: pers.pers.armor += 3,
            state: pers.pers.level += 1
         }
      case ContainerActivType.persReplay:
         if (state.pers.pers.level >= state.pers.bestPers.level) {
            return {
               ...state,  state:pers.bestPers=state.pers.pers,
               state: pers.pers= {
                  level: 1,
                  name: '',
                  strong: 1,
                  xp: 10,
                  armor: 5
                },
            }
         }else{
            return {
               ...state,state: pers.pers= {
                  level: 1,
                  name: '',
                  strong: 1,
                  xp: 10,
                  armor: 5
                }
            }
         }
      case ContainerActivType.getName:
         return {
            ...state, state: pers.pers.name = action.payload
         }
         case ContainerActivType.cheats_life:
            return {
               ...state, state: pers.pers.xp += 30
            }
            case ContainerActivType.cheats_strong:
               return {
                  ...state,state:pers.pers.strong += 30
               }
               case ContainerActivType.cheats_armor:
                  return {
                     ...state,state:pers.pers.armor += 30
                  }
      default: return state
   }
}




export const store = createStore(reducer)




