"use client"
import { useLovedProduct } from "@/hooks/use-loved-product"
import LovedItemProduct from "./components/loved-item-product"

export default function Page() {

    const {lovedItems} = useLovedProduct()

    return (
        <div className="w-full min-h-[120vh] py-4 sm:py-32 bg-[url('/IMG_7475.JPG')] bg-cover bg-center bg-no-repeat">
        
        <div className="max-w-4xl mx-auto sm:px-24 text-secondary">
            
            <div className="bg-primary/70 rounded-sm px-6 py-6">
            <h1 className="sm:text-2xl pb-4">
                Productos que te gustan
            </h1>

            <div>
                <div className="">
                    {lovedItems.length === 0 && (
                        <p>No hay productos en la sección de Me gusta</p>
                    )}
                    <ul>
                        {lovedItems.map((item) => (
                            <LovedItemProduct key={item.id} product={item}/>
                        )
                    )}
                    </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}