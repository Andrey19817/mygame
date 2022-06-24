import { createStore } from "redux";
import { pers } from "../ContainerPers/ContainerPers";
import { monstrArea } from "../contaiinerMonstr/ContainerMonstr";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";

const defaultState = {
  pers: pers,
  monstrArea: monstrArea,
  persArea: pers.persArea,
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ContainerActivType.increase_performance_life:
      return {
        ...state,
        state: (pers.pers.xp += 2),
        state: (pers.pers.level += 1),
      };
    case ContainerActivType.increase_performance_strong:
      return {
        ...state,
        state: (pers.pers.strong += 1),
        state: (pers.pers.level += 1),
      };
    case ContainerActivType.increase_performance_armor:
      return {
        ...state,
        state: (pers.pers.armor += 3),
        state: (pers.pers.level += 1),
      };
    case ContainerActivType.persReplay:
      if (
        state.pers.pers.level >= state.pers.bestPers.level &&
        state.pers.pers.name !== ""
      ) {
        return {
          ...state,
          state: (pers.bestPers = state.pers.pers),
          state: (pers.pers = {
            avatar: null,
            level: 1,
            name: "",
            strong: 1,
            xp: 10,
            armor: 5,
            counter: 0,
          }),
        };
      } else {
        return {
          ...state,
          state: (pers.pers = {
            level: 1,
            name: "",
            strong: 1,
            xp: 10,
            armor: 5,
            counter: 0,
          }),
        };
      }
    case ContainerActivType.getName:
      return {
        ...state,
        state: (pers.pers.name = action.payload),
      };
    case ContainerActivType.getAvatar:
      return {
        ...state,
        state: (pers.pers.avatar = action.payload),
      };
    case ContainerActivType.cheats_life:
      return {
        ...state,
        state: (pers.pers.xp = 30),
      };
    case ContainerActivType.cheats_strong:
      return {
        ...state,
        state: (pers.pers.strong = 30),
      };
    case ContainerActivType.cheats_armor:
      return {
        ...state,
        state: (pers.pers.armor = 30),
      };
    case ContainerActivType.getPersArea:
      return {
        ...state,
        state: pers.persArea.push(state.pers.pers),
      };
    case ContainerActivType.check:
      return {
        ...state,
        state: monstrArea.filter((elem) => elem.check),
      };
    case ContainerActivType.getCheck:
      return {
        ...state,
        state: monstrArea.map((elem) => {
          if (elem.id === action.payload) {
            elem.check = !elem.check;
          }
        }),
      };
    case ContainerActivType.getCounter:
      return {
        ...state,
        state: pers.pers.counter++,
      };
    case ContainerActivType.create_monstr:
      return {
        ...state,
        state: monstrArea.push(action.payload),
      };
    case ContainerActivType.life_editing:
      return {
        ...state,
        state: monstrArea.map((elem) => {
          if (elem.id === action.payload.id) {
            elem.xp = action.payload.xp;
            elem.strong = action.payload.strong;
            elem.armor = action.payload.armor;
          }
        }),
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
