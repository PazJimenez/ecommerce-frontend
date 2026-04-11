"use client"

import { useGetCategoryProduct } from "@/api/getCategoryProduct"
import { Separator } from "@/components/ui/separator"
import { ResponseType } from "@/types/response"
import { useParams, useRouter } from "next/navigation"
import FiltersControlsCategory from "./components/filters-controls-category"
import SkeletonSchema from "@/components/skeletonScheme"
import ProductCard from "./components/product-card"
import { ProductType } from "@/types/product"
import { useState } from "react"

export default function Page() {
   const params = useParams()
   const {categorySlug} = params
   const {result, loading}: ResponseType = useGetCategoryProduct(categorySlug) 
   const router = useRouter()

   const [filterMaterial, setFilterMaterial] = useState('')

   const filteredProducts = result !== null && !loading && (
      filterMaterial === '' 
      ? result 
      : result.filter((product: ProductType) => 
      product.material === filterMaterial)
   )
console.log("titulo",result )
     return (
      <div className="bg-[url('/IMG_7470.JPG')] bg-cover bg-center bg-no-repeat min-h-[120vh]">
        <div className="max-w-7xl py-4 mx-auto sm:py-16 sm:px-24 ">
            {result && !loading && result.length > 0 && (
               <h1 className="text-3xl text-primary font-extrabold upperce">
                  Joyería {result[0]?.category?.categoryName}
               </h1>
            )}
            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mt-8">
               <div className="sm:col-span-1">
                  <FiltersControlsCategory setFilterMaterial={setFilterMaterial}/>
               </div>

                 <div className="sm:col-span-3">
                     <div className="grid gap-5 sm:grid-cols-2 md:gap-10">
                     {loading && (
                        <SkeletonSchema grid={3} />
                     )}
                  {filteredProducts !== null && !loading && (
                     filteredProducts.map((product: ProductType) => (
                        <ProductCard key={product.id} product={product}/>
                     ))
                  )}
                  {filteredProducts !== null && !loading && filteredProducts.length === 0 && (
                     <p>No hay productos con este filtro</p>
                  )}
               </div>
            </div>
        </div>
        </div>
        </div>
     )

}