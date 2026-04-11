import Link from "next/link";
import { buttonVariants } from "./ui/button";

const BannerProduct = () => {
    return (
        <>
            <div className="mt-4 text-center py-20 text-secondary">
                <p>Sumérgete en una experiencia única</p>
                <h4 className="mt-2 text-5xl font-extrabold upperce">Joyería con alma</h4>
                <p className="my-2 text-lg">Expresa tu naturaleza</p>
                <Link href={`/category/earings`} className={buttonVariants()}>Comprar</Link>
            </div>
        </>
    )
}

export default BannerProduct;