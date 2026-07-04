import ProductColourMaterial from "@/components/shared/product-colour-material";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLovedProduct } from "@/hooks/use-loved-product";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from 'sonner'

export type InfoProductProps = {
    product: ProductType
}

const InfoProduct = (props: InfoProductProps) => {

    const { product } = props
    const {addItem, items } = useCart()
    const {addLovedItem,} = useLovedProduct()
    const [quantity, setQuantity] = useState(1)

    // Ver cuántos hay ya en el carrito
    const itemInCart = items.find((item) => item.product.id === product.id)
    const quantityInCart = itemInCart?.quantity ?? 0
    const remainingStock = product.stock - quantityInCart

    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const handleIncrease = () => {
        if (quantity < remainingStock) setQuantity(quantity + 1)
    }

    const handleAddToCart = () => {
        if (quantity > remainingStock) {
            toast.warning("No hay suficiente stock disponible")
            return
        }
        addItem(product, quantity)
    }


    return (
        <div className="px-6 py-4 bg-primary/70 text-secondary rounded-sm border border-gray-200">
            <div className="justify-between mb-3">
                <h1 className="text-2xl font-bold">{product.productName}</h1>
                <div className="flex items-center justify-between gap-3">
                    <ProductColourMaterial colour={product.colour} material={product.material} />
                </div>
            </div>
            <Separator className="my-4" />
            <p>{product.description}</p>
            <Separator className="my-4" />
            <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
            {/* Stock disponible */}
            <p className="text-sm mb-4">
                {remainingStock > 0
                    ? <span className="text-green-600">
                        Stock disponible: {remainingStock}
                        {quantityInCart > 0 && (
                            <span className="text-gray-500 ml-2">({quantityInCart} en tu carrito)</span>
                        )}
                    </span>
                    : <span className="text-red-500">
                        Sin stock
                        {quantityInCart > 0 && (
                            <span className="text-gray-500 ml-2">({quantityInCart} en tu carrito)</span>
                        )}
                    </span>
                }
            </p>

            {/* Selector de cantidad */}
            {product.stock > 0 && (
                <div className="flex items-center gap-3 mb-4">
                    
                    <button
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition text-black disabled:opacity-40")}
                    >
                        <Minus size={16} />
                    </button>
                    <span className="font-semibold w-6 text-center">{quantity}</span>
                    <button
                        onClick={handleIncrease}
                        disabled={quantity >= product.stock}
                        className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition text-black disabled:opacity-40")}
                    >
                        <Plus size={16} />
                    </button>
                </div>
            )}

            <div className="flex items-center gap-5">
            <Button
                onClick={handleAddToCart}
                disabled={remainingStock === 0}
            >
                {remainingStock === 0 ? "Sin stock" : "Agregar al carrito"}
            </Button>
                <Heart width={30} strokeWidth={1}
                    className="transition duration-300 cursor-pointer hover:fill-black"
                    onClick={() => addLovedItem(product)}
                />
            </div>
        </div>
    )
}

export default InfoProduct;