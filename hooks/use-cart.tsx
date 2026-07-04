import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

import { ProductType } from "@/types/product"
import { toast } from 'sonner'

interface CartItem {
  product: ProductType
  quantity: number
}

interface CartStore {
    items: CartItem[],
    addItem: (data: ProductType, quantity?: number) => void
    removeItem: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
    removeAll: () => void
}

export const useCart = create(persist<CartStore>((set, get) => ({
    items: [],
    addItem: (data: ProductType, quantity = 1) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.product.id === data.id)
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity
        if (newQuantity > data.stock) {
            toast.warning("No hay suficiente stock disponible")
            return
        }
        set({
            items: currentItems.map((item) =>
            item.product.id === data.id
                ? { ...item, quantity: newQuantity }
                : item
            )
        })
        toast.success("Cantidad actualizada")
        return
        }

        if (quantity > data.stock) {
        toast.warning("No hay suficiente stock disponible")
        return
        }

        set({
            items: [...get().items, { product: data, quantity }]
        })

        toast.success("Producto añadido al carrito")
    
    },
    removeItem: (id: number) => {
        set({ items: get().items.filter((item) => item.product.id !== id) })
        toast.info("Producto eliminado del carrito")
    },

      updateQuantity: (id: number, quantity: number) => {
        const item = get().items.find((item) => item.product.id === id)
        if (!item) return

        if (quantity < 1) {
        set({ items: get().items.filter((item) => item.product.id !== id) })
        return
        }

        if (quantity > item.product.stock) {
        toast.warning("No hay suficiente stock disponible")
        return
        }

        set({
        items: get().items.map((item) =>
            item.product.id === id ? { ...item, quantity } : item
        )
        })
    },

    removeAll: () => set({ items: []})
}), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage)
}
))
