/* eslint-disable @next/next/no-img-element */
"use client"
import { useGetCategories } from '@/api/getProducts';
import Link from 'next/link';
import { ResponseType } from '@/types/response'
import { CategoryType } from '@/types/category';

const ChooseCategory = () => {
    const { result, loading }: ResponseType = useGetCategories()

    return (
        <div>
        <h3 className='bg-gray-200/70 dark:bg-black/70 dark:text-secondary px-6 pt-5 pb-4 text-3xl sm:pb-8 text-primary font-bold h-20 text-center'>Elige tu categoría favorita</h3>
        <div className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>
            <div className='grid gap-5 sm:grid-cols-5'>
                {!loading && result !== undefined && (
                    result.map((category: CategoryType) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="relative w-full overflow-hidden rounded-lg group"
                            >
                            <div className="aspect-[4/5] w-full overflow-hidden rounded-lg border border-gray-200">
                                <img
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage.url}`}
                                alt={category.categoryName}
                                className="h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-110"
                                />
                            </div>

                            <p className="absolute bottom-5 w-full py-2 text-lg font-bold text-center text-primary-foreground backdrop-blur-md">
                                {category.categoryName}
                            </p>
                        </Link>
                    ))
                ) }
            </div>
        </div>
        </div>
    )
}

export default ChooseCategory;