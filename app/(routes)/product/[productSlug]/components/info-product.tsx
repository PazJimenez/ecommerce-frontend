import ProductColourMaterial from "@/components/shared/product-colour-material";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLovedProduct } from "@/hooks/use-loved-product";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

export type InfoProductProps = {
    product: ProductType
}

const InfoProduct = (props: InfoProductProps) => {

    const { product } = props
    const {addItem } = useCart()
    const {addLovedItem,} = useLovedProduct()


    return (
        <div className="px-6">
            <div className="justify-between mb-3">
                <h1 className="text-2xl">{product.productName}</h1>
                <div className="flex items-center justify-between gap-3">
                    <ProductColourMaterial colour={product.colour} material={product.material} />
                </div>
            </div>
            <Separator className="my-4" />
            <p>{product.description}</p>
            <Separator className="my-4" />
            <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
            <div className="flex items-center gap-5">
                <Button onClick={() => addItem(product)}>Comprar</Button>
                <Heart width={30} strokeWidth={1}
                    className="transition duration-300 cursor-pointer hover:fill-black"
                    onClick={() => addLovedItem(product)}
                />

            </div>
        </div>
    )
}

export default InfoProduct;