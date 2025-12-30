import { formatPrice } from "@/lib/formatPrice";


interface ProductProps {
    productName?: string,
    price?: number,
    colour: string,
    material: string,
    className?: string
}

const ProductColourMaterial = (props: ProductProps) => {
    const {productName, price, colour, material} = props

    return (
        <div>
            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2>{productName}</h2>
                    {price != undefined && 
                    <p className="font-bold text-lg">{formatPrice(price)}</p> 
                    }
                    <div className="flex items-center justify-between gap-3">
                        <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
                            {colour}
                        </p>
                        <p className="px-2 py-1 text-white bg-yellow-900 rounded-full w-fit">
                            {material}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ProductColourMaterial;