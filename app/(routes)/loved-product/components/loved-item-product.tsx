/* eslint-disable @next/next/no-img-element */
import ProductColourMaterial from "@/components/shared/product-colour-material";
import ProductImageMiniature from "@/components/shared/product-image-miniature";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProduct } from "@/hooks/use-loved-product";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";


interface lovedItemProductProps {
    product: ProductType
}


const LovedItemProduct = (props: lovedItemProductProps) => {
    const {product} = props
    const {removeLovedItem} = useLovedProduct()
    const {addItem} = useCart()
    const router = useRouter()

    const addToCheckout = () => {
        addItem(product)
        removeLovedItem(product.id)
    }

    return (
        <li className="flex py-6 border-b">

            <ProductImageMiniature slug={product.slug} url={product.images[0].url}/>
            <div>
                <ProductColourMaterial productName={product.productName} price={product.price} colour={product.colour} material={product.material} />

                <div className="flex justify-between flex-1 px-6">

                    <Button className="mt-5 rounded-full" onClick={addToCheckout}>Añadir al carrito</Button>
                </div>
            </div>

            <div>
                <button className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition")}>
                    <X className="dark:text-black" size={20} onClick={() => removeLovedItem(product.id)}></X>
                </button>
            </div>

        </li>
    )
}

export default LovedItemProduct;