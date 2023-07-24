# Setup

## Bước 1

```create vite@latest vite-project -- --template react-ts

```

## Bước 2

-   Cấu hình file ts.config.json
    ```"baseUrl": "./",
    "paths": {
    "@/_": ["src/_"]
    }
    ```
-   Cài đặt package vite-tsconfig-paths : https://www.npmjs.com/package/vite-tsconfig-paths
    `pnpm i -D vite-ts-config-paths `

-   Thêm code trong file vite.config.json

```import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
})
```

```

```

import { instance } from "@/axios/config";
import { ProductContext } from "@/context/Product";
import { useContext, useEffect } from "react";
import { Button } from "..";
const ProductList = () => {
    const { state, dispatch } = useContext(ProductContext);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await instance.get("/products");

                dispatch({ type: "product/fetchProducts", payload: data });
            } catch (error: any) {
            } finally {
            }
        };
        fetchProducts();
    }, []);
    const addProduct = async (product: any) => {
        try {
            const data = await instance.post("/products", product);
            dispatch({ type: "product/addProduct", payload: data });
        } catch (error: any) {
        } finally {
        }
    };
    const removeProduct = async (id: any) => {
        try {
            await instance.delete(`/products/${id}`);
            dispatch({ type: "product/deleteProduct", payload: id });
        } catch (error: any) {
        } finally {
        }
    };
    const updateProduct = async (product: any) => {
        try {
            const data = await instance.put(`/products/${product.id}`, product);

            console.log(data);
            dispatch({ type: "product/updateProduct", payload: data });
        } catch (error: any) {
        } finally {
        }
    };
    return (
        <div>
            {state?.products?.map((product: any) => (
                <div key={product.id}>{product.name}</div>
            ))}

            <Button type="primary" onClick={() => addProduct({ name: "Product Added 1" })}>Thêm</Button>

            <Button type="orange" onClick={() => updateProduct({ name: "Product Updated", id: 4 })}>
                Updated
            </Button>
            <Button type="danger" onClick={() => removeProduct(4)}>Delete</Button>
        </div>
    );
};
export default ProductList;



-----------
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

