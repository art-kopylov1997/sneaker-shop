import { useContext, useState } from "react";
import styles from "./Card.module.scss";
import { FavoriteIcon } from "../icons/FavoriteIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { CheckIcon } from "../icons/CheckIcon";
import { UnFavoriteIcon } from "../icons/UnFavouriteIcon";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({
  id,
  image,
  title,
  price,
  onFavourite,
  onPlus,
  favourited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(favourited);
  const obj = { id, parentId: id, title, image, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavourite = () => {
    onFavourite(obj);
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={styles.root}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={260}
          viewBox="0 0 210 260"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="140" rx="5" ry="5" width="170" height="20" />
          <rect x="0" y="230" rx="8" ry="8" width="90" height="25" />
          <rect x="0" y="175" rx="5" ry="5" width="120" height="20" />
          <rect x="0" y="30" rx="5" ry="5" width="200" height="85" />
          <rect x="170" y="225" rx="5" ry="5" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favouriteItem}>
            {onFavourite && (
              <button
                className={isFavourite ? styles.buttonFavourite : null}
                onClick={onClickFavourite}
              >
                {isFavourite ? <FavoriteIcon /> : <UnFavoriteIcon />}
              </button>
            )}
          </div>

          <img
            className={styles.sneakersPictures}
            src={image}
            alt="кроссовки"
          />
          <h5>{title}</h5>
          <div className={styles.priceBlock}>
            <div>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <button
                className={isItemAdded(id) ? styles.buttonChecked : null}
                onClick={onClickPlus}
              >
                {isItemAdded(id) ? <CheckIcon /> : <PlusIcon />}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
