import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { UseCart } from "../../hooks/useCart";

function Header(props) {
  const { totalPrice } = UseCart();

  return (
    <>
      <header>
        <Link className={styles.navigationLink} to="/">
          <div className={styles.leftBlock}>
            <img
              width={40}
              height={40}
              src="../../assets/icons/logo.svg"
              alt="logo"
            />

            <div>
              <h3>React sneakers</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>

        <ul className={styles.rightBlock}>
          <li onClick={props.onClickCart}>
            <img
              width={18}
              height={18}
              src="../../assets/icons/basket.svg"
              alt="basket"
            />
            <span>{totalPrice} руб.</span>
          </li>

          <Link className={styles.navigationLink} to="/favourites">
            <li>
              <img
                width={18}
                height={18}
                src="../../assets/icons/profileFavourite.svg"
                alt="favourite"
              />
            </li>
          </Link>

          <Link className={styles.navigationLink} to="/orders">
            <li>
              <img
                width={18}
                height={18}
                src="../../assets/icons/profileUser.svg"
                alt="profile"
              />
            </li>
          </Link>
        </ul>
      </header>
      <div className={styles.lineDivider} />
    </>
  );
}

export default Header;
