import {create} from "zustand";
import {persist, createJSONStorage} from 'zustand/middleware';
import { ProductType } from "@/types/product";
import { toast } from 'sonner'

interface UseLovedProductType {
    lovedItems: ProductType[],
    addLovedItem: (data: ProductType) => void
    removeLovedItem: (id: number)=> void
}

export const useLovedProduct = create(persist<UseLovedProductType>((set,get) => ({
    lovedItems: [],
    addLovedItem: (data: ProductType) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find((item) => item.id === data.id)
    
        if(existingItem) {
            return (toast.warning("El producto ya existe en el carrito"))
        }
        set({
            lovedItems: [...get().lovedItems, data]
        })
            toast.success("Producto añadido a la lista")
    },
    removeLovedItem: (id: number) => {
        set({lovedItems: [...get().lovedItems.filter((item) => item.id !== id)]})
        toast.info("Producto eliminado de la lista")
    }
}), {
    name: "loved-products-storage",
    storage: createJSONStorage(() => localStorage)
}))
