export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input", //based on this we will decide the type of component
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input", //based on this we will decide the type of component
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input", //based on this we will decide the type of component
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input", //based on this we will decide the type of component
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input", //based on this we will decide the type of component
    type: "password",
  },
];

export const addProductFormControl = [
  {
    name: "title",
    label: "Product Title",
    placeholder: "Enter a product title",
    componentType: "input",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    componentType: "input",
    type: "textarea",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    options: [
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" },
      { label: "Home", value: "home" },
      { label: "Books", value: "books" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "Enter brand name",
    componentType: "input",
    type: "text",
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    componentType: "input",
    type: "number",
  },
  {
    name: "salePrice",
    label: "Sale Price",
    placeholder: "Enter discount price",
    componentType: "input",
    type: "number",
  },
  {
    name: "stock",
    label: "Stock Quantity",
    placeholder: "Enter available stock",
    componentType: "input",
    type: "number",
  },
  //For this part we don't have the case in the common form.js
  {
    name: "image",
    label: "Product Image",
    componentType: "file",
  },
  {
    name: "isFeatured",
    label: "Featured Product",
    componentType: "checkbox",
  },
];
