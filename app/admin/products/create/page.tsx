import { Metadata } from "next";
import ProductForm from "@/components/admin/product-form";
 



export const metadata: Metadata = {
    title: 'Create Product'
}
const CreateProductPage = () => {
    return ( 
        <>
            <h2 className="h2-bold">Create</h2>
            <div className="my-8">
                <ProductForm type='Create' productId="test"/>
            </div>
        </>
     );
}
 
export default CreateProductPage;