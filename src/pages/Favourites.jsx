import { useContext } from "react";
import styles from "./Pages.module.scss";
import Card from "../components/Card/Card";
import AppContext from "../context";

const Favourites = () => {
  const { favourites, onAddToFavourite } = useContext(AppContext);

  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.subhead}>
          <h1>Мои закладки</h1>
        </div>

        <div className={styles.cardContainer}>
          {favourites.map((item) => (
            <Card
              key={item.title}
              favourited={true}
              onFavourite={onAddToFavourite}
              {...item}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favourites;
