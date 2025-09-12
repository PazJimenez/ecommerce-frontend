"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Pulseras",
    href: "/category/bracelet",
    description:
      "Pulseras de distintos tamaños, colores y materiales hechas a mano.",
  },
  {
    title: "Aretes",
    href: "/category/earing",
    description:
      "Aretes fabricados artesanalmente con los más finos materiales.",
  },
  {
    title: "Llaveros",
    href: "/category/keyChain",
    description:
      "Llaveros sofisticados y a la moda.",
  },
  {
    title: "Collares",
    href: "/category/necklace",
    description: "Collares hechos a mano ideales para cualquier ocasión.",
  },
  {
    title: "Anillos",
    href: "/category/ring",
    description:
      "Anillos hechos para durar por siempre con los más bellos materiales.",
  },
]

const MenuList = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre nosotros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      EccomerceE
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                        Joyería creada con diferentes técnicas artísticas, hechas a mano con inspiración y pasión.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu información, tus pedidos y mucho más.
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Sección dedicada a promociones y descuentos especiales.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Joyería</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default MenuList;
