import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { ContainerActivType } from "../ContainerActivType/ContainerActivType";
import "./PersArea.css";

const PersArea = () => {
  const persArea = useSelector(({ persArea }) => persArea);
  const dispatch = useDispatch();
  dispatch({ type: ContainerActivType.getPersArea });
  console.log('PersArea');
  return (
    <>
      <h2>Список героев</h2>
      <div className="container_persArea">
        {persArea.reverse().map((elem) => (
          <div
            key={nanoid(10)}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={elem.avatar.src}
              style={{ width: "20px", height: "20px" }}
              alt=""
            />
            <p className="persArea_p" key={nanoid(10)}>
              Уровень: {elem.level}
            </p>
            <p className="persArea_p" key={nanoid(10)}>
              Имя: {elem.name}
            </p>
            <p className="persArea_p" key={nanoid(10)}>
              Жизнь: {elem.xp}
            </p>
            <p className="persArea_p" key={nanoid(10)}>
              Сила: {elem.strong}
            </p>
            <p className="persArea_p" key={nanoid(10)}>
              Броня: {elem.armor}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default React.memo(PersArea);
