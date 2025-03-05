'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";






const AddToCart  = ({ cart, item }: { cart?: Cart, item: CartItem }) => {
    const router = useRouter()
    const [isPending1, startTransition1] = useTransition()
    const [isPending2, startTransition2] = useTransition()

    const handleRemoveFromCart = async () => {
        startTransition1( async () => {
            const res = await removeItemFromCart(item.productId)
            if(!res.success) {
                toast.error('Item not removed from cart')
                return
            }
            
            // Handle successfull add to cart
            toast(res.message, {
                action: {
                    label: 'Cart',
                    onClick: () => router.push('/cart')
                }
            })
        })
  
    }
    
    
    const handleAddToCart = async () => {
        startTransition2( async () => {
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
        })
       
    }

 


    // Check if item is in cart
    const existItem = cart && cart.items.find((x) => x.productId === item.productId )

    return  existItem ? (
        <>
            <Button type="button" variant='outline' onClick={handleRemoveFromCart}>
            {
                isPending1 ? (
                    <Loader className="h-4 w-4 animate-spin"/>
                ) : (
                    <Minus className="h-4 w-4"/>
                )
            }
            </Button>
            <span className="px-2">{existItem.qty}</span>
            <Button type="button" variant='outline' onClick={handleAddToCart}>
            {
                isPending2 ? (
                    <Loader className="h-4 w-4 animate-spin"/>
                ) : (
                    <Plus className="h-4 w-4"/>
                )
            }
            </Button>
       
        </>
    ) : 
    ( 
        <Button className="w-full" type="button" onClick={handleAddToCart}>
            <Plus/>Add To Cart
        </Button>
     );
}
 
export default AddToCart ;