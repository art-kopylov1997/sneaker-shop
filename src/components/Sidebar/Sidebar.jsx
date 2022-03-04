import { useState } from "react";
import styles from "./Sidebar.module.scss";
import axios from "axios";
import Info from "../Info";
import { UseCart } from "../../hooks/useCart";
import { DeleteCross } from "../icons/DeleteCross";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Sidebar({ onClose, items, opened }) {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { cartItems, setCartItems, totalPrice } = UseCart();

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://62042007c6d8b20017dc3443.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://62042007c6d8b20017dc3443.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа =(");
    }
    setIsLoading(false);
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://62042007c6d8b20017dc3443.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.wrapper}>
        <h2>
          Корзина
          <button className={styles.cartButtonRemove} onClick={onClose}>
            <DeleteCross />
          </button>
        </h2>

        {items.length > 0 ? (
          <div className={styles.blockItemsWrapper}>
            <div className={styles.blockItems}>
              {items.map((item) => (
                <div className={styles.containerItem} key={item.image}>
                  <img
                    className={styles.itemPicture}
                    src={item.image}
                    alt="Кроссовки"
                  />

                  <div className={styles.itemDescription}>
                    <p>{item.title}</p>
                    <b>{item.price}</b>
                  </div>

                  <button
                    className={styles.cartButtonRemove}
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <DeleteCross />
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartTotalBLock}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div />
                  <b>{totalPrice} руб.</b>
                </li>

                <li>
                  <span>Налог 5%:</span>
                  <div />
                  <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
                </li>
              </ul>

              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className={styles.checkoutButton}
              >
                Оформить заказ
                <img src="../../assets/icons/arrowRight.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete
                ? "../assets/icons/completedOrder.png"
                : "../assets/icons/emptyBasket.png"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Sidebar;
