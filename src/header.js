import React, { useState } from "react";

function Header({
  items,
  sort,
  setSort,
  press,
  login,
  isLoggedIn,
  user,
  register,
}) {
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

      {isLoggedIn ? (
        <>
          <p className="wlcmMsg">Hello, {user}</p>
          <button className="logOut">Log-Out</button>
        </>
      ) : (
        <>
          <button className="loginBtn" onClick={login}>
            Login
          </button>
          <button className="regBtn" onClick={register}>
            Register
          </button>
        </>
      )}
    </form>
  );
}

export default Header;
