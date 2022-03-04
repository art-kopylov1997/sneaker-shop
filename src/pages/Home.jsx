import { useContext, useEffect, useState } from "react";
import styles from "./Pages.module.scss";
import Card from "../components/Card/Card";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import axios from "axios";
import AppContext from "../context";

function Home() {
  const {
    items,
    setItems,
    cartItems,
    setCartItems,
    setFavourites,
    onAddToFavourite,
  } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favouritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://62042007c6d8b20017dc3443.mockapi.io/cart"),
            axios.get("https://62042007c6d8b20017dc3443.mockapi.io/favourites"),
            axios.get("https://62042007c6d8b20017dc3443.mockapi.io/items"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);

        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных ;(");
        console.error(error);
      }
    }

    fetchData();
  }, [setCartItems, setFavourites, setItems]);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://62042007c6d8b20017dc3443.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://62042007c6d8b20017dc3443.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderItems = () => {
    const emptyArray = [1, 2, 3, 4, 5, 6, 7];

    return (isLoading ? emptyArray : filteredItems).map((item, index) => (
      <Card
        id={item.id}
        key={index}
        onFavourite={(obj) => onAddToFavourite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.bannerWrapper}>
        <img src="/img/banner.jpg" alt="banner" />
      </div>
      <div className={styles.subhead}>
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
        />
      </div>

      <div className={styles.cardContainer}>{renderItems()}</div>
    </div>
  );
}

export default Home;
