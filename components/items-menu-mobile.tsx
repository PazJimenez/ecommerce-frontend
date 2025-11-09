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
                <Link href="/category/earings" className="block">Aretes</Link>
                <Link href="/category/necklace" className="block">Collares</Link>
                <Link href="/category/bracelet" className="block">Pulseras</Link>
                <Link href="/category/ring" className="block">Anillos</Link>
                <Link href="/category/keyChain" className="block">Llaveros</Link>
            </PopoverContent>
        </Popover>
    );
} 

export default ItemsMenuMobile;