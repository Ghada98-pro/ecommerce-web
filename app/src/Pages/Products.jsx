import React, { use, useContext } from 'react'
import useApi from '../Hooks/Useapi'
import Spinner from './Spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { WhislistContext } from '../Context/WishListContext'

export default function Products() {
    let { addTocart } = useContext(cartContext)
    let { addToWishlist, products } = useContext(WhislistContext)

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
    // async function handelAddToWishlist(prodId) {
    //     let response = await addToWishlist(prodId);
    //     console.log(response);

    //     if (response && response.title) { // Check if it's a product object
    //         toast.success(`${response.title} added to wishlist!`);
    //     } else if (response && response.data && response.data.message) {
    //         toast.success(response.data.message); // Fallback to original message
    //     } else {
    //         toast.error('Error adding to wishlist.');
    //     }
    // }

    async function handelAddToWishlist(prodId) {
        let response = await addToWishlist(prodId)
        console.log('wish', response)


        if (response.data.status === "success") {
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)

        }
    }

    let { data, isLoading, isError } = useApi('products')
    console.log('products', data)
    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        return <h2>Error</h2>
    }
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-4 ">
                {data?.map((prod) => {
                    return <div key={prod.id} className="w- border border-secondry-color rounded-lg shadow-md p-4 relative">
                        {/* Discount Badge */}

                        <Link to={`/productdetail/${prod?.id}/${prod.category?.name}`} className=''>
                            <div className="">

                                {/* Wishlist Icon */}
                                {/* <Link to='/wishlist'> */}

                                {/* </Link>                                Product Image */}
                                <div>
                                    <img src={prod?.imageCover} alt="Product Image" className="object-contain w-full h-[270px] fill" />
                                </div>
                            </div>
                            {/* Product Details */}
                            <div className="mt-4">
                                <h3 className="text-gray-800 font-medium text-base">
                                    {prod?.title?.split(' ').slice(0, 3).join(' ')}
                                </h3>

                                <p className="uppercase text-green-600 text-xs font-medium">
                                    {prod?.category?.name}

                                </p>
                                {/* Ratings */}
                                <div className="flex items-center justify-between my-6 ">
                                    <span className="text-xl font-bold text-secondry">${prod?.price}</span>
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="ml-1 tet-xl text-gray-500">{prod?.ratingsAverage} (120 reviews)</span>
                                    </div>
                                </div>

                            </div>
                        </Link>
                        <button onClick={() => { handelAddToWishlist(prod.id) }} className="cursor-pointer  w-8 h-8 bg-white rounded-full shadow 
                        flex items-center justify-center absolute top-3 end-3">
                            <i className={`fa-solid fa-heart ${products.some(product => product.id === prod.id) ? 'text-red-500' : 'text-secondry-color'}`}></i>
                        </button>
                        <div className="flex items-end justify-between">

                            <button onClick={() => { handelAddToCart(prod._id) }} className="w-full bg-secondry-color text-white font-bold py-3 px-4 rounded-lg hover:bg-secondry-color-200 
                                transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md cursor-pointer">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                })}




            </div>


            {/* <div className='grid grid-cols-1 gap-8 mx-4
             md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
        </>
    )
}
