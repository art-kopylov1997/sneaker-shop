import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import AppContext from "./context";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Orders";

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const onAddToFavourite = async (obj) => {
    try {
      if (favourites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://62042007c6d8b20017dc3443.mockapi.io/favourites/${obj.id}`,
          obj
        );
        setFavourites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://62042007c6d8b20017dc3443.mockapi.io/favourites",
          obj
        );
        setFavourites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        setItems,
        cartItems,
        favourites,
        setFavourites,
        isItemAdded,
        onAddToFavourite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="root">
        <Sidebar
          items={cartItems}
          onClose={() => setCartOpened(false)}
          setCartItems={setCartItems}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/favourites" element={<Favourites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
