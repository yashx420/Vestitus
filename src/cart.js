import React from "react";
import "./Cart.css";

const sizeMapping = {
  1: "XS",
  2: "S",
  3: "M",
  4: "L",
  5: "XL",
};

export default function Cart({ cart, cartItems, removeFromCart }) {
  return (
    <div className="loginOverlay2">
      <div className="layer2" onClick={cart}></div>
      <div className="cartModal">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cartItem">
              <img src={item.image1} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>Size: {sizeMapping[item.size]}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
