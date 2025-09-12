import { Menu } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Link from "next/link";

const ItemsMenuMobile = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Menu />
            </PopoverTrigger>
            <PopoverContent>
                <Link href="/categories/earings" className="block">Aretes</Link>
                <Link href="/categories/necklace" className="block">Collares</Link>
                <Link href="/categories/bracelet" className="block">Pulseras</Link>
                <Link href="/categories/ring" className="block">Anillos</Link>
                <Link href="/categories/keyChain" className="block">Llaveros</Link>
            </PopoverContent>
        </Popover>
    );
} 

export default ItemsMenuMobile;