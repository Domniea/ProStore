import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";

const ProductCard = ({product}: {product: Product}) => {
    const {
        slug,
        name, 
        brand,
        images,
        rating,
        stock,
        price
    } = product
    return ( 
        <Card className="w-full max-w-sm">
            <CardHeader className='p-0 items-center'>
                <Link href={`/product/${slug}`}>
                    <Image 
                        src={images[0]} 
                        alt={`${name} picture`}
                        height={300}
                        width={300}
                        priority={true}
                    />
                </Link>
            </CardHeader>
            <CardContent className="p-4 grid gap-4">
                <div className="text-xs">{brand}</div>
                <Link href={`/product/${slug}`}>
                   <h2 className="text-sm font-medium">{name}</h2>

                </Link>
                <div className="flex-between gap-4">
                    <p>{rating} stars </p>
                    {
                        stock > 0 ? (
                            <ProductPrice 
                                value={Number(price)} 
                                // className="text-red-500"
                            />
                        ) : (
                            <p className="text-destructive">
                                Out Of Stock
                            </p>
                        )
                    }
                </div>
            </CardContent>
        </Card>
     );
}
 
export default ProductCard;