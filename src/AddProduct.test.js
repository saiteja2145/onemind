import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import AddProduct from "./AddProduct";

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

it("renders Add product data", () => {
  act(() => {
    render(<AddProduct />, container);
  });

  const button = container.querySelector("[data-testid=addProduct]");
  expect(button.textContent).toBe("+ Add Product");
});
