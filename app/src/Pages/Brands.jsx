import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Spinner from './Spinner'
import useApi from '../Hooks/Useapi'

export default function Brands() {
    let { data, isLoading, isError } = useApi('brands')
    console.log('brandsd', data)

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
                {data?.map((brand) => {
                    return (
                        <div key={brand._id}>
                            <img src={brand.image} className='w-full transform duration-500 hover:-translate-y-2' alt={brand.name} />
                        </div>
                    );
                })}
            </div>


        </>
    )
}
