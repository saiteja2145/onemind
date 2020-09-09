import React from "react";
import { DECREMENT, INCREMENT } from "./ActionTypes";

const Product = ({ product, incrementDecrementProductOrder }) => {
  return (
    <div className="product__card">
      <h1 data-testid="productName" id="productName">
        {product.productName}
      </h1>
      <h3 data-testid="productAvail">
        Available Products : {product.availableQuantity}
      </h3>
      <div className="bth__continer">
        <button
          data-testid="decrement"
          onClick={() =>
            incrementDecrementProductOrder(DECREMENT, product.productId)
          }
          disabled={product.addProduct < 1}
        >
          -
        </button>
        <p data-testid="addProduct">{product.addProduct}</p>
        <button
          data-testid="increment"
          onClick={() =>
            incrementDecrementProductOrder(INCREMENT, product.productId)
          }
          disabled={product.addProduct >= product.availableQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
