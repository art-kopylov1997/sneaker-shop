import styles from "./Pages.module.scss";
import Card from "../components/Card/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const emptyArray = [1, 2, 3, 4, 5, 6];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://62042007c6d8b20017dc3443.mockapi.io/orders"
        );
        // console.log(data.map((obj) => obj.items).flat());
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Произошла ошибка при запросе покупок");
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      <div className={styles.contentWrapper}>
        <div className={styles.subhead}>
          <h1>Мои покупки</h1>
        </div>

        <div className={styles.cardContainer}>
          {(isLoading ? emptyArray : orders).map((order, index) => (
            <Card key={index} loading={isLoading} {...order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
