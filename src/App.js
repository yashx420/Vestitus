import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [sort, setSort] = useState("input");
  const [productList, setProductList] = useState([]);
  const [press, setPress] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/data")
      .then((res) => res.json())
      .then((data) => setProductList(data));
  }, []);

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

  function login(e) {
    setPress(!press);
    e.preventDefault();
  }

  return (
    <div>
      <Header
        items={sortedItems}
        sort={sort}
        setSort={setSort}
        press={press}
        login={login}
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
        />
      ))}
      {press && (
        <LoginOverlay
          login={login}
          user={username}
          setUser={setUsername}
          pass={password}
          setPass={setPassword}
        />
      )}
    </div>
  );
}

function Header({ items, sort, setSort, press, login }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <form className="header">
      <div className="input">
        <input
          className="searchBar"
          type="text"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
        <button className="searchButton">🔎</button>
      </div>

      <div className="sort">
        <p style={{ marginRight: "10px" }}>Sort:</p>
        <select
          className="sortOptions"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="input">by input order</option>
          <option value="description">by description</option>
          <option value="price">by price</option>
        </select>
      </div>

      <button className="loginBtn" onClick={login}>
        Login
      </button>
    </form>
  );
}

function Product({ productObj, press, login, user, setUser, pass, setPass }) {
  const [overlay, isOverlay] = useState(false);
  const [select, setSelect] = useState(null);

  function toggleOverlay() {
    isOverlay(!overlay);
    setSelect(null);
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

            <button className="modal-cart" onClick={toggleOverlay}>
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function LoginOverlay({ login, user, setUser, pass, setPass, message }) {
  return (
    <div className="loginOverlay">
      <div className="layer" onClick={login}></div>
      <form className="login" onSubmit={login}>
        <h1>Log-in</h1>
        <input
          type="text"
          className="username"
          placeholder="Enter Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        ></input>
        <input
          type="password"
          className="password"
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <button type="submit" className="login_submit">
          Submit
        </button>
      </form>
    </div>
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
