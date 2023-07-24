import { instance } from "@/axios/config";
import { ProductContext } from "@/context/Product"
import { useContext, useEffect } from "react"
import { Button } from "..";


const ProductList = () => {

    const { state, dispatch } = useContext(ProductContext);

    useEffect(() =>{
        const fetchProducts = async() =>{
            try {
                const data = await instance.get('/products');
                dispatch({type:"product/fetchProducts",payload:data})
            } catch (error:any) {
                
            }finally{

            }
        };
        fetchProducts();
    },[])

    const addProduct = async(product:any) =>{
        try {
            const data =  await instance.post("/products",product);
            dispatch({type:"product/addProduct",payload:data})
        } catch (error) {
            
        }finally{

        }
    }

    const removeProduct = async(id:any) =>{
        try {
            await instance.delete(`/products/${id}`);
            dispatch({type:"product/deleteProduct",payload:id})
        } catch (error:any) {
            
        }finally{

        }
    }

    const updateProduct = async (product:any) =>{
        try {
            const data = await instance.put(`/products/${product.id}`,product);
            dispatch({type:"product/updateProduct",payload:data})
        } catch (error) {
            
        }
    }


    
  return (
    <div>
        {state?.products?.map((product:any)=>(
            <div key={product.id}>{product.name}</div>
        ))}
        <Button type="primary" onClick={() => addProduct({name:"Product Add"})}>Them</Button>
        <Button type="primary" onClick={() => removeProduct(4)}>xoa</Button>
        <Button type="primary" onClick={() => updateProduct({name:"Product update",id:4})}>update</Button>
    </div>
  )
}

export default ProductList