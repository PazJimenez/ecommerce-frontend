"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/formatPrice"
import CartItem from "./components/cart-item"


export default function Page() {
    const {items, removeAll} = useCart()
    const prices =items.map((product => product.price))
    const totalPrice = prices.reduce((total, price) => total + price, 0)


    const handleBuy = async () => {
  if (items.length === 0) return;

  try {
    const response = await fetch(
      "http://localhost:1337/api/orders/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalPrice,
          email: "atenea_kasumi@hotmail.com",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error iniciando pago");
    }

    const data = await response.json();

    console.log("RESPUESTA STRAPI:", data);

    removeAll();

    // 🔴 Redirección al checkout Flow
    window.location.href = data.redirectUrl;

  } catch (error) {
    console.error("Error al iniciar el pago", error);
    alert("No se pudo iniciar el pago");
  }
};

    return (
        <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
            <h1 className="mb-5 text-3xl font-bold">Shopping cart</h1>
            <div className="grid sm:grid-cols-2 sm:gap-5">
                <div >
                    {items.length === 0 && (
                        <p>No hay productos en el carrito</p>
                    )}
                    <ul>
                        {items.map((item) => (
                            <CartItem key={item.id} product={item}/>
                        ))}
                    </ul>
                </div>
                <div className="max-w-xl">
                    <div className="p-6 rounded-lg bg-slate-100">
                        <p className="mb-3 text-lg font-semibold dark:text-black">Order summary</p>
                        <Separator />
                        <div className="flex justify-between gap-5 my-4 dark:text-black">
                            <p>Order total</p>
                            <p>{formatPrice(totalPrice)}</p>
                        </div>
                        <div className="flex items-center justify-center w-full mt-3">
                            <Button className="w-full" onClick={handleBuy}>Comprar</Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}