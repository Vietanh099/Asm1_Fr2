import { productReducer } from "@/reducers/index";
import { createContext, useReducer } from "react";
import { produce } from "immer";

export const ProductContext = createContext({} as any);

const initialState = {
    products: [],
};
const ProductProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(produce(productReducer), initialState);

    return (
        <ProductContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
export default ProductProvider;