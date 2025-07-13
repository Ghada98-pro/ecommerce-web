import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Spinner from './Spinner'
import axios from 'axios'
import Slider from "react-slick";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // 1. Import the Navigation module

// 2. Import Swiper's core and navigation styles
import 'swiper/css';
import 'swiper/css/navigation';



export default function CatgegoriesSlider() {
    function getAllcategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    let { data, isError, error, isLoading, isFetched, isFetching } = useQuery({
        queryKey: ['catgegoriesslider'],
        queryFn: getAllcategories,
    })
    console.log(data?.data?.data)
    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <h2>Error...</h2>
    }
    return (
        <> <div className="relative mb-20"> {/* A relative container is good for custom arrows */}
            <Swiper
                // 3. Add the Navigation module and enable it
                modules={[Navigation]}
                navigation={true}

                // Your existing and recommended props
                spaceBetween={20} // Increased space for better visuals
                slidesPerView={2} // Start with fewer slides on mobile

                // Responsive breakpoints for better layout on all screen sizes
                breakpoints={
                    {
                        640: { // sm
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: { // md
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                        1024: { // lg
                            slidesPerView: 6,
                            spaceBetween: 30,
                        },
                        1280: { // xl
                            slidesPerView: 8,
                            spaceBetween: 30,
                        },
                    }}
                className="py-4" // Add some padding if needed
            >
                {data?.data?.data.map((cat) => (
                    <SwiperSlide key={cat._id}>
                        <div>
                            <img
                                src={cat.image}
                                className='w-full h-[100px] object-cover rounded-lg transform duration-500 hover:-translate-y-2' // Use w-full for responsiveness
                                alt={cat.name}
                            />
                            <h2 className='text-center mt-2 font-medium text-gray-700'>{cat.name}</h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

            {/*
                {data?.data?.data.map((cat) => {
                    return (
                        <div key={cat._id} >
                            <img src={cat.image} className='w-[100px] object-cover h-[100px] transform duration-500 hover:-translate-y-2' alt={cat.name} />
                        </div>
                    );
                })}
            </div> */}


        </>
    )
}

