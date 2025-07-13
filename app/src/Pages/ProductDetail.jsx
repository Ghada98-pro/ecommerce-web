import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'; // Removed useState
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css'; // Make sure Swiper CSS is imported
import useApi from '../Hooks/Useapi';
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetail() {
    let { id, category } = useParams();
    let [ispro, setispro] = useState(null)
    const [mainImage, setMainImage] = useState('');
    let { addTocart } = useContext(cartContext)

    async function handelAddToCart(prodId) {
        let response = await addTocart(prodId)
        console.log(response)

        if (response.data.status === "success") {
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)

        }
    }


    // function getRealtedProd() {
    let { data } = useApi('products');



    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };
    console.log(ispro)


    let { data: productData, isLoading, isError, error } = useQuery({
        queryKey: ['proddetail', id],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
        select: (res) => res?.data?.data,
    });

    useEffect(() => {
        if (productData && productData?.imageCover) {
            setMainImage(productData?.imageCover);
        }
        if (data && Array.isArray(data)) { // Check if data exists and is an array
            let related = data.filter((prod) => {
                return prod?.category?.name === category;
            });
            setispro(related);
        }
    }, [data, id, productData]);
    // useEffect(() => {
    //     getRealtedProd()
    // }, [])

    if (isLoading) return <div className="flex justify-center items-center h-screen text-2xl">Loading product details...</div>;
    if (isError) return <div className="flex justify-center items-center h-screen text-red-600 text-2xl">Error: {error.message}</div>;

    return (
        <>

            <div className="bg-gray-100 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        {/* Product Images Column */}
                        <div className="w-full md:w-1/3 px-4 mb-8"> {/* w-full on small screens */}
                            <div className="mb-4">
                                <img src={mainImage} // Changed from productData?.imageCover
                                    alt={productData?.title}
                                    className="w-full max-h-80 object-contain mx-auto rounded-lg shadow-md"
                                    id="mainImage"
                                />
                            </div>
                            {/* Swiper for Thumbnails */}
                            <div className="w-full">
                                <Swiper
                                    // Default settings for very small screens (e.g., < 320px)
                                    spaceBetween={5}
                                    slidesPerView={2} // Start with 2 slides for very small screens

                                    breakpoints={{
                                        // For screens 320px and wider
                                        320: {
                                            slidesPerView: 3,
                                            spaceBetween: 8,
                                        },
                                        // For screens 480px and wider
                                        480: {
                                            slidesPerView: 4,
                                            spaceBetween: 10,
                                        },
                                        // For screens 640px and wider (Tailwind's sm breakpoint)
                                        640: {
                                            slidesPerView: 5,
                                            spaceBetween: 12,
                                        },
                                        // For screens 768px and wider (Tailwind's md breakpoint)
                                        768: {
                                            slidesPerView: 3, // Adjust for md:w-1/3 column
                                            spaceBetween: 15,
                                        },
                                        // For screens 1024px and wider (Tailwind's lg breakpoint)
                                        1024: {
                                            slidesPerView: 4, // Adjust for larger screens
                                            spaceBetween: 20,
                                        },
                                    }}
                                >
                                    {productData?.images?.map((imag, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={imag}
                                                alt={`Thumbnail ${index + 1}`}
                                                onClick={() => handleThumbnailClick(imag)} // Added onClick handler
                                                className={`w-20 h-20 object-cover rounded-md cursor-pointer transition duration-300
                                                   ${mainImage === imag ? 'opacity-100 ' : 'opacity-60 hover:opacity-100'}`} // Added active styling
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>

                        {/* Product Details Column */}
                        <div className="w-full md:w-2/3 px-4"> {/* w-full on small, md:w-2/3 on medium+ */}
                            <h2 className="text-3xl font-bold mb-2">{productData?.title}</h2>
                            <p className="text-gray-600 mb-4">{productData?.category?.name}</p>

                            <div className="mb-4">
                                <span className="text-2xl font-bold mr-2">${productData?.price}</span>
                            </div>

                            <p className="text-gray-700 mb-6">{productData?.description}</p>

                            <div className="flex items-center space-x-4 mb-6 mt-14 content-between">
                                {/* Quantity Control (Styled with Tailwind) */}
                                <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        className=" cursor-pointer text-gray-700 hover:bg-gray-100 active:bg-gray-200
                                                                            inline-flex items-center justify-center  text-lg font-semibold focus:outline-none transition-colors duration-200 px-3"
                                        aria-label="Decrease quantity" >
                                        -
                                    </button>
                                    <div
                                        className="bg-gray-50 text-gray-800 text-center font-semibold  select-none border-x border-gray-300 px-3"
                                    >
                                        2 {/* Hardcoded quantity as per request */}
                                    </div>
                                    <button
                                        className="cursor-pointer text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50
                                               inline-flex items-center justify-center px-3 text-lg font-semibold focus:outline-none transition-colors duration-200"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Rating Display */}
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-2 text-gray-600">{productData?.ratingsAverage} ({productData?.ratingsQuantity} reviews )</span>
                                </div>
                            </div>

                            {/* Add to Cart Button (Placeholder) */}
                            <button onClick={() => { handelAddToCart(id) }}
                                className="w-full bg-secondry-color flex items-center justify-center gap-2 text-white px-6 py-3 rounded-md
                                  transition duration-300 focus:outline-none cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <div>Add to Cart</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className='font-bold mx-4 text-xl my-7'>Realted Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-4 ">
                {ispro?.map((prod) => {
                    return <div key={prod._id} className="w- border border-secondry-color rounded-lg shadow-md p-4">
                        {/* Discount Badge */}
                        <Link to={`/productdetail/${prod.id}/${prod.category.name}`}>
                            <div className="relative">
                                <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                    -20%
                                </span>
                                {/* Wishlist Icon */}
                                <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                    </svg>
                                </button>
                                {/* Product Image */}
                                <div>
                                    <img src={prod.imageCover} alt="Product Image" className="object-contain w-full h-[270px] fill" />
                                </div>
                            </div>
                            {/* Product Details */}
                            <div className="mt-4">
                                <h3 className="text-gray-800 font-medium text-base">
                                    {prod.title.split(' ').slice(0, 3).join(' ')}
                                </h3>

                                <p className="uppercase text-green-600 text-xs font-medium">
                                    {prod.category.name}
                                </p>
                                {/* Ratings */}
                                <div className="flex items-center justify-between my-6 ">
                                    <span className="text-xl font-bold text-secondry">${prod.price}</span>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 tet-xl text-gray-500">{productData.ratingsAverage} (120 reviews)</span>
                                    </div>
                                </div>

                            </div>
                        </Link>

                        <div className="flex items-end justify-between">

                            <button onClick={() => { handelAddToCart(prod.id) }} className="w-full bg-secondry-color text-white font-bold py-3 px-4 rounded-lg hover:bg-secondry-color-200 
                                transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                })}




            </div>
        </>
    );
}


// 