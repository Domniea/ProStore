'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";





const AddToCart  = ({ cart, item }: { cart?: Cart, item: CartItem }) => {
    const router = useRouter()


    const handleAddToCart = async () => {
        const res = await addItemToCart(item)
        
        if(!res.success) {
            toast.error('Item not added to cart')
            return
        }
        
        // Handle successful add to cart
        toast(res.message, {
            action: {
                label: 'Cart',
                onClick: () => router.push('/cart')
            }
        })
    }

    // Check if item is in cart
    const existItem = cart && cart.items.find((x) => x.productId === item.productId )
    console.log(existItem, removeItemFromCart, Minus)
    return ( 
        <Button className="w-full" type="button" onClick={handleAddToCart}>
            <Plus/>Add To Cart
        </Button>
     );
}
 
export default AddToCart ;