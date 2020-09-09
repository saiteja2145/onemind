import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Product from "./Product";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders product data", () => {
  const fakeProduct = {
    productName: "string",
    productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    availableQuantity: 5,
    addProduct: 0,
  };

  act(() => {
    render(<Product product={fakeProduct} />, container);
  });

  expect(container.querySelector("[data-testid=productName]").textContent).toBe(
    fakeProduct.productName
  );

  expect(
    container.querySelector("[data-testid=productAvail]").textContent
  ).toBe(`Available Products : ${fakeProduct.availableQuantity}`);

  expect(+container.querySelector("[data-testid=addProduct]").textContent).toBe(
    fakeProduct.addProduct
  );
});

it("changes value when clicked", () => {
  const fakeProduct = {
    productName: "string",
    productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    availableQuantity: 5,
    addProduct: 0,
  };
  const incrementDecrementProductOrder = jest.fn();
  act(() => {
    render(
      <Product
        incrementDecrementProductOrder={incrementDecrementProductOrder}
        product={fakeProduct}
      />,
      container
    );
  });

  // get ahold of the button element, and trigger some clicks on it
  const button = document.querySelector("[data-testid=increment]");
  expect(+container.querySelector("[data-testid=addProduct]").textContent).toBe(
    0
  );

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(incrementDecrementProductOrder).toHaveBeenCalledTimes(1);

  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });
  expect(incrementDecrementProductOrder).toHaveBeenCalledTimes(6);
});
