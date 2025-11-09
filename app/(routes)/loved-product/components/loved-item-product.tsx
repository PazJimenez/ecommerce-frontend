/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProduct } from "@/hooks/use-loved-product";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface lovedItemProductProps {
    product: ProductType
}


const LovedItemProduct = (props: lovedItemProductProps) => {
    const {product} = props
    const router = useRouter()
    const {removeLovedItem} = useLovedProduct()
    const {addItem} = useCart()

    const addToCheckout = () => {
        addItem(product)
        removeLovedItem(product.id)
    }

    return (
        <li className="flex py-6 border-b">
            <div onClick={() => router.push(`/product/${product.slug}`)}>
            <img 
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`} 
                alt="product" 
                className="w-24 h-24 overflow-hidden rounded-md sm:w-auto sm:h-32"
                />
            </div>
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2>{product.productName}</h2>
                    <p className="font-bold text-lg">{formatPrice(product.price)}</p>
                    <div className="flex items-center justify-between gap-3">
                        <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                            {product.colour}
                        </p>
                        <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                            {product.material}
                        </p>
                    </div>
                    <Button className="mt-5 rounded-full" onClick={addToCheckout}>Añadir al carrito</Button>
                </div>
                <div>
                        <button className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition")}>
                            <X className="dark:text-black" size={20} onClick={() => removeLovedItem(product.id)}></X>
                        </button>
                </div>
            </div>
        </li>
    )
}

export default LovedItemProduct;