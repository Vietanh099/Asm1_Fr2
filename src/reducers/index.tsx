export const productReducer = (state: any, action: any) => {
  switch (action.type) {
    case "product/fetchProducts":
      state.products = action.payload;
      break;
    case "product/deleteProduct":
      const id = action.payload;
      state.products = state.products.filter((item: any) => item.id !== id);
      break;
    case "product/addProduct":
      state.products.push(action.payload);
      break;
    case "product/updateProduct":
        const product = action.payload;
        state.products = state.products.map((item:any)=> item.id === product.id ? product : item);
        break
    default:
      break;
  }
};
