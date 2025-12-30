/* eslint-disable @next/next/no-img-element */
import ProductColourMaterial from "@/components/shared/product-colour-material";
import ProductImageMiniature from "@/components/shared/product-image-miniature";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartItemProps {
    product: ProductType
}

const CartItem = (props: CartItemProps) => {
    const {product} = props
    const router =useRouter()
    const {removeItem} = useCart()

    return (
        <li className="flex py-6 border-b">
            <ProductImageMiniature slug={product.slug} url={product.images[0].url}/>
            <div>

                <ProductColourMaterial productName={product.productName} price={product.price} colour={product.colour} material={product.material} />
            </div>
            <div>
                <button className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition")}>
                    <X size={20} onClick={() => removeItem(product.id)}></X>
                </button>
            </div>

        </li>
    )
}

export default CartItem;