import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Spinner from './Spinner'

export default function Brands() {
    function getBrands() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    }
    let { data, isError, error, isLoading, isFetched, isFetching } = useQuery({
        queryKey: ['brands'],
        queryFn: getBrands
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
            <div className='flex flex-wrap gap-6'>
                {data?.data?.data.map((brand) => {
                    return <div key={brand._id}>
                        <img src={brand.image} />
                    </div>
                })}

            </div>

        </>
    )
}
