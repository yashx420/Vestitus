import React, { useEffect, useState } from "react";
import "./App.css";
import LoginOverlay from "./login";
import RegisterOverlay from "./register";
import Header from "./header";
import Cart from "./cart";

export default function App() {
  const [sort, setSort] = useState("input");
  const [productList, setProductList] = useState([]);
  const [press, setPress] = useState(false);
  const [press1, setPress1] = useState(false);
  const [press2, setPress2] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("/data")
      .then((res) => res.json())
      .then((data) => setProductList(data));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`/cart?user_id=${user.id}`)
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, [isLoggedIn, user]);

  let sortedItems = productList;
  if (sort === "price") {
    sortedItems = productList
      .slice()
      .sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  } else if (sort === "description") {
    sortedItems = productList
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  function showUser(user) {
    setUser(user);
  }

  function cart(e) {
    setPress2(!press2);
    e.preventDefault();
  }

  function login(e) {
    setPress(!press);
    e.preventDefault();
  }

  function register(e) {
    setPress1(!press1);
    e.preventDefault();
  }

  function addToCart(product, size) {
    const data = {
      user_id: user.id,
      product_id: product.id,
      size: size,
    };

    fetch("/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setCartItems([...cartItems, { ...product, size: size }]);
      });
  }

  function removeFromCart(product) {
    const data = {
      user_id: user.id,
      product_id: product.id,
    };

    fetch("/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setCartItems(cartItems.filter((item) => item.id !== product.id));
      });
  }

  return (
    <div>
      <Header
        items={sortedItems}
        sort={sort}
        setSort={setSort}
        press={press}
        press1={press1}
        login={login}
        register={register}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user}
        cart={cart}
      />
      {sortedItems.map((pro) => (
        <Product
          productObj={pro}
          key={pro.id}
          press={press}
          login={() => setPress(!press)}
          user={username}
          setUser={setUsername}
          pass={password}
          setPass={setPassword}
          isLoggedIn={isLoggedIn}
          addToCart={addToCart}
        />
      ))}
      {press && (
        <LoginOverlay
          login={login}
          user={username}
          setUser={setUsername}
          pass={password}
          setPass={setPassword}
          logined={isLoggedIn}
          setLogined={setIsLoggedIn}
          showUser={showUser}
        />
      )}
      {press1 && (
        <RegisterOverlay
          user={username}
          setUser={setUsername}
          pass={password}
          setPass={setPassword}
          logined={isLoggedIn}
          register={register}
          setLogined={setIsLoggedIn}
          showUser={showUser}
        />
      )}
      {press2 && (
        <Cart
          cart={cart}
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
}

function Product({
  productObj,
  press,
  login,
  user,
  setUser,
  pass,
  setPass,
  isLoggedIn,
  addToCart,
}) {
  const [overlay, isOverlay] = useState(false);
  const [select, setSelect] = useState(null);

  function toggleOverlay() {
    isOverlay(!overlay);
    setSelect(null);
    console.log(user);
    console.log(isLoggedIn);
  }

  function handleAddToCart() {
    if (select) {
      addToCart(productObj, select);
      toggleOverlay();
    } else {
      alert("Please select a size.");
    }
  }

  return (
    <>
      <div className={`product${productObj.soldOut ? "SoldOut" : ""}`}>
        <img
          className="product_img"
          src={productObj.image1}
          alt="product-image"
        />
        <img
          className="product_img2"
          src={productObj.image2}
          alt="back image"
        />
        <div className="product_info">
          <p className="name">{productObj.name}</p>
          <p className="price">
            {productObj.soldOut ? `SOLD OUT` : `$${productObj.price}`}
          </p>
        </div>
        {productObj.soldOut ? null : (
          <div className="options">
            <button className="cart" onClick={toggleOverlay}>
              Add To Cart
            </button>
            <button className="buy">Buy Now</button>
          </div>
        )}
      </div>
      {overlay && (
        <div className="modal">
          <div className="layer" onClick={toggleOverlay}></div>
          <div className="modal_menu">
            <div className="sizes">
              <Button num={1} click={select} setClick={setSelect}>
                XS
              </Button>
              <Button num={2} click={select} setClick={setSelect}>
                S
              </Button>
              <Button num={3} click={select} setClick={setSelect}>
                M
              </Button>
              <Button num={4} click={select} setClick={setSelect}>
                L
              </Button>
              <Button num={5} click={select} setClick={setSelect}>
                XL
              </Button>
            </div>
            <button className="close_modal" onClick={toggleOverlay}>
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABM0lEQVQ4T4WTCU7DQAxFM21R4aB0Q2I5CW0luiT3BKRSwvPgH5xpKiJZmRnb3/a3ndq23VdVtUCOKaUF9zHnb84t/+7jPXEZ8X4OPnXi8o5iakpkh8FDCVI4v2G3siDIyQCOHGbIJ3JbZuIpKPKB+zzYNpZWBciO3xL5QO6QA5kseZ+YnvNXSFs2e95XlsHY66qxvQ8gmRMPoMhybtDNsm9Rn8qR4dpLeA7ANc7zjiePEBkWyAndjQPo3HemU5mDAGLlWL0b3h6NZVcb0Bbdk/NyVpuvAbziYGlHgDVOL4MABQ8ibKiEi2ErSdRUisStl2DllC3+ndjQxsFWOT+DLc6+bqDxVBSxHQepbHEee8tAaWuUuyGxFL0EjbIy+Rv7Ypk0wr2NvLKJF8vUi/zPOquc5gdTCBJf1wDangAAAABJRU5ErkJggg==" />
            </button>

            <button className="modal-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ children, num, click, setClick }) {
  const isSelected = num === click;
  function toggleColor() {
    setClick(isSelected ? null : num);
  }
  return (
    <button
      className={`sizeBtn ${isSelected ? "open" : ""}`}
      onClick={toggleColor}
    >
      {children}
    </button>
  );
}
