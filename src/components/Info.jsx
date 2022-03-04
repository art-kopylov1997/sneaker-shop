import { useContext } from "react";
import styles from "./Sidebar/Sidebar.module.scss";
import AppContext from "../context";

const Info = ({ title, description, image }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className={styles.emptyBasketWrapper}>
      <img className={styles.emptyBasketImage} src={image} alt="" />
      <h2>{title}</h2>
      <span>{description}</span>
      <button onClick={() => setCartOpened(false)}>
        <img src="../../assets/icons/arrowLeft.svg" alt="arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
