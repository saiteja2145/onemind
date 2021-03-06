import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act, waitForElement } from "react-dom/test-utils";
import axios from "axios";
import App from "./App";

jest.mock("axios");

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

it("renders App data", () => {
  act(() => {
    render(<App />, container);
  });

  expect(container.querySelector("[data-testid=order]").textContent).toBe(
    "Order Products"
  );

  const button = container.querySelector("[data-testid=addProduct]");
  expect(button.textContent).toBe("+ Add Product");
});
