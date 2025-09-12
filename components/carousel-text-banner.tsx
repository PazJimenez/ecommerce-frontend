"use client"
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";

export const dataCarouselTop = [
    {
        id:1,
        title:"Envío en 24/28 hrs",
        description:"Como ciente VIP, tus envíos en 24/48 horas. Obtén más información y únete.",
        link:"#!"
    },
        {
        id:2,
        title:"Devoluciones y entregas gratuitas",
        description:"Como ciente VIP, tendrás la opción de recibir tus productos o devolverlos de forma gratuita. Obtén más información y únete.",
        link:"#!"
    },

]

const CarouselTextBanner = () => {
    const router =useRouter()
    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel className="w-full max-w-4xl mx-auto"
            plugins={[
                Autoplay({
                    delay: 4500
                })
            ]}
            >
                <CarouselContent>
                    {dataCarouselTop.map(({id, title, link, description}) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <div>
                                <Card className="shadow-none border-none bg-transparent">
                                    <CardContent className="flex flex-col justify-center p-1 items-center text-center">
                                        <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                                        <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default CarouselTextBanner;