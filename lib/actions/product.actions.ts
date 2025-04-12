'use server'

import { prisma } from "@/db/prisma"
import { convertToPlainObject } from "../utils"

//Get latest products
export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: 20,
        orderBy: {
            createdAt: 'desc'
        }
    })

    return convertToPlainObject(data)
}

//Get single product by it's slug\
export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: { slug: slug }
    })

}