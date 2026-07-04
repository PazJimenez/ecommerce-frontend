/* eslint-disable @next/next/no-img-element */
import ProductColourMaterial from "@/components/shared/product-colour-material";
import ProductImageMiniature from "@/components/shared/product-image-miniature";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { Minus, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CartItemProps {
    product: ProductType
    quantity: number
}

const CartItem = ({ product, quantity }: CartItemProps) => {
    const { removeItem, updateQuantity } = useCart()

    return (
        <li className="flex py-6 px-6 text-secondary border border-gray-200 rounded-sm">
            <ProductImageMiniature slug={product.slug} url={product.images[0].url}/>
            <div>

                <ProductColourMaterial productName={product.productName} price={product.price} colour={product.colour} material={product.material} />

                {/* Selector de cantidad */}
            <div className="flex items-center gap-2 mt-3">
                <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition text-black")}
                >
                    <Minus size={14} />
                </button>
                <span className="text-sm font-semibold w-6 text-center">{quantity}</span>
                <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    disabled={quantity >= product.stock}
                    className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition text-black disabled:opacity-40")}
                >
                    <Plus size={14} />
                </button>
                <span className="text-xs text-gray-400 ml-2">Stock: {product.stock}</span>
                </div>
            </div>
            <div>
                <button className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition text-black")}>
                    <X size={20} onClick={() => removeItem(product.id)}></X>
                </button>
            </div>

        </li>
    )
}

export default CartItem;