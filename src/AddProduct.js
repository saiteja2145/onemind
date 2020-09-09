import React, { useState } from "react";
import { v4 } from "uuid";
import Axios from "axios";
import { Button } from "antd";
import { Modal } from "antd";

const AddProduct = ({ addProduct }) => {
  const [visible, setVisible] = useState(false);
  const [productName, setproductName] = useState("");
  const [productVal, setproductVal] = useState(0);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const clearProducts = () => {
    setError({});
    setproductName("");
    setproductVal(0);
  };

  const handleSubmit = async () => {
    setError({});
    const error = {};
    if (productName === "") {
      error.productName = "Product name should not be empty";
    }
    if (productVal < 1 || productVal > 9999) {
      error.productVal =
        "Available products should not be less than 0 and grater than 9999";
    }
    if (error.productName || error.productVal) {
      setError(error);
      return;
    }
    setLoading(true);
    const data = {
      productName: productName,
      productId: v4(),
      availableQuantity: +productVal,
    };
    try {
      await Axios.post("api/Product", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setVisible(false);
      addProduct(data);
      clearProducts();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={(e) => {
          setVisible(true);
        }}
        data-testid="addProduct"
      >
        + Add Product
      </Button>
      <Modal
        visible={visible}
        title="Add Products"
        onCancel={() => {
          setVisible(false);
          clearProducts();
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
            data-testid="submitData"
          >
            Submit
          </Button>,
        ]}
      >
        <div className="input__grid">
          <label htmlFor="productName">Product Name</label>
          <div className="input__data">
            <input
              type="text"
              id="productName"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setproductName(e.target.value)}
            />
            {error.productName && (
              <span className="error">{error.productName}</span>
            )}
          </div>
          <label htmlFor="productsAvalilable">Products Avalilable</label>
          <div className="input__data">
            <input
              type="number"
              id="productsAvalilable"
              placeholder="Email"
              value={productVal}
              onChange={(e) => setproductVal(e.target.value)}
            />
            {error.productVal && (
              <span className="error">{error.productVal}</span>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddProduct;
