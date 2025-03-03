'use client'

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ProductImages = ({ images }: {images: string[]}) => {

    const [current, setCurrent] = useState(0)
    
    return (
        <div className="space-y4">
            <Image
            className="min-h-[300] object-cover object-center"
                src={images[current]}
                width={1000}
                height={1000}
                alt="Product image"
                priority
            />
            <div className="flex">
                {
                    images.map((soloImage, i) => (
                        <div 
                            className={
                                cn('border mr-2 cursor-pointer hover:border-orange-600', 
                                    current === i && 'border-orange-500')
                            }
                            key={soloImage}
                            onClick={() => setCurrent(i)}
                        >
                            <Image
                                src={soloImage}
                                height={100}
                                width={100}
                                alt="Image"
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
 
export default ProductImages;