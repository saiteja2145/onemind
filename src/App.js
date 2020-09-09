import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import axios from "axios";
import Product from "./Product";
import AddProduct from "./AddProduct";
import { INCREMENT, DECREMENT } from "./ActionTypes";
import { Button } from "antd";
import { message } from "antd";

function App() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const orderProducts = async () => {
    setLoading(true);

    const sendRes = [];
    products.forEach((product) => {
      if (product.addProduct > 0) {
        sendRes.push(
          axios.post(
            "/api/OrderProducts",
            {
              orderId: product.productId,
              customerId: product.productId,
              productId: product.productId,
              quantity: product.addProduct,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
        );
      }
    });
    try {
      await Promise.all(sendRes);
      const newProducts = products.map((product) => ({
        ...product,
        availableQuantity: product.availableQuantity - product.addProduct,
        addProduct: 0,
      }));
      message.success("Order Placed Successfully.", 5);

      setproducts(newProducts);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios("api/Product", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = res.data.map((val) => ({ ...val, addProduct: 0 }));
        setproducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const addProduct = (data) => {
    message.success("Products Added Successfully.", 5);
    const newProducts = [...products, { ...data, addProduct: 0 }];
    setproducts(newProducts);
  };

  const incrementDecrementProductOrder = (type, id) => {
    const newProducts = [...products];
    const index = newProducts.findIndex((product) => product.productId === id);
    const product = newProducts[index];
    if (type === INCREMENT) {
      product.addProduct += 1;
      newProducts[index] = { ...product };
      setproducts(newProducts);
    } else if (type === DECREMENT) {
      product.addProduct -= 1;
      newProducts[index] = { ...product };
      setproducts(newProducts);
    }
  };

  return (
    <div className="App">
      <div className="products__container">
        {products.map((product) => (
          <Product
            product={product}
            key={product.productId}
            incrementDecrementProductOrder={incrementDecrementProductOrder}
          />
        ))}
      </div>
      <div className="product__container">
        <AddProduct addProduct={addProduct} />
        <Button
          type="primary"
          onClick={orderProducts}
          loading={loading}
          disabled={loading}
          data-testid="order"
        >
          Order Products
        </Button>
      </div>
    </div>
  );
}

export default App;
