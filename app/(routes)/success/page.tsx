"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

const PageSuccess = () => {
    const router = useRouter()
    return (
        <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
            <div className="flex flex-col-reverse gap-10 md:flex-row">
                <div className="flex justify-center md:min-w-[400px]">
                    <Image src="/success.jpg" alt="Success" width={500} height={250} className="rounded-lg" />



                </div>
                <div>
                    <h1 className="text-3xl">¡Gracias por tu compra!</h1>
                    <p className="my-3">En Breve, nos pondremos manos a la obra para preparar tu envío con cuidado y dedicación. Mientras tanto, puedes seguir revisando nuestra página o seguirnos en nuestra página de Instagram{" "}
                        <a
                            href="https://www.instagram.com/annea_tienda"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-600 font-semibold hover:underline"
                        >
                            @Annea_tienda.
                        </a>
                    </p>
                    <p className="my-3">Gracias por confiar en nosotros y valorar el arte hecho a mano.</p>
                    <p className="my-3">¡Disfruta tu nueva joyería!</p>

                    <Button onClick={() => router.push("/")}> Volver a la tienda</Button>
                </div>
            </div>

        </div>
    )
}

export default PageSuccess