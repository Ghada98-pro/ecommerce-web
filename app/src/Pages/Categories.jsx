import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Spinner from './Spinner'

export default function Categories() {
    function getcategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    let { data, isError, error, isLoading, isFetched, isFetching } = useQuery({
        queryKey: ['categories'],
        queryFn: getcategories
    })
    console.log(data?.data?.data)
    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h2>Error...</h2>
    }
    return (
        <>
            <div className='grid grid-cols-1 gap-8 mx-4 
             md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '  >
                {data?.data?.data.map((brand) => {
                    return (
                        <div key={brand._id} className=' '>
                            <img src={brand.image} className='w-full h-[300px] object-cover transform duration-500 hover:-translate-y-2' alt={brand.name} />
                        </div>
                    );
                })}
            </div>


        </>
    )
}
