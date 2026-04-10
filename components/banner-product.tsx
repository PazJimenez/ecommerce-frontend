import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <>
            <div className="mt-4 text-center py-20">
                <p>Sumérgete en una experiencia única</p>
                <h4 className="mt-2 text-5xl font-extrabold upperce">Joyería con alma</h4>
                <p className="my-2 text-lg">Expresa tu naturaleza</p>
                <Link href="#" className={buttonVariants()}>Comprar</Link>
            </div>
            <div className="h-[350px] bg-cover lg:h-[600px] bg-[url('/IMG_7502.JPG')] bg-center mt-5"></div>
        </>
    )
}

export default BannerProduct;