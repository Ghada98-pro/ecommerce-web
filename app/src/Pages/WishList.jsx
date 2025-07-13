
import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext'
import Spinner from './Spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { WhislistContext } from '../Context/WishListContext'
export default function WishList() {
    let { products, count, removewishListItem } = useContext(WhislistContext)
    async function handelRemoveWishlist(prodID) {
        let response = await removewishListItem(prodID)
        console.log(response)
        if (response.data.status === "success") {
            toast.success('product Deleted')
        }
        else {
            toast.error('Error ')
        }

    }

    return (
        <>
            {products ? (
                products.length > 0 ? (
                    // Main content when there are products
                    <div className=" h-screen py-8">
                        <div className="h-screen py-8">
                            <div className="container mx-auto px-4">
                                <h1 className="text-2xl font-semibold mb-8 text-secondry-color-700"> Shopping Wishlist</h1>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="w-full">
                                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className=''>
                                                        <th className="text-left font-semibold">image</th>
                                                        <th className="text-left font-semibold"> name</th>
                                                        <th className="text-left font-semibold">Total</th>
                                                        <th className="text-left font-semibold">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products?.map((prod) => {
                                                        return <tr key={prod?.id}>
                                                            <td className="py-4">
                                                                <div className="flex items-center">
                                                                    <img className="h-16 w-16 mr-4 object-cover" src={prod?.imageCover} alt="Product image" />
                                                                </div>
                                                            </td>
                                                            <td className="py-4 ">{prod?.title?.split(' ').slice(0, 2).join(' ')}</td>


                                                            <td className="py-4">${prod.price}</td>
                                                            <td className="py-4  "><button onClick={() => { handelRemoveWishlist(prod?.id) }} className='cursor-pointer text-red-500'>remove</button></td>

                                                        </tr>

                                                    })}

                                                    {/* More product rows */}
                                                </tbody>
                                            </table>

                                        </div>
                                        <Link to='/home'>
                                            <div className='flex items-center gap-1'>
                                                <i class="fa-solid fa-arrow-left"></i>
                                                <h2>continue shopping</h2>
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='h-screen flex justify-center items-center flex-col gap-2 '>
                            <h2 className=' text-2xl '>
                                No items in your cart.
                            </h2>
                            <Link to='/home'>
                                <button className="bg-secondry-color text-white py-2 px-4 rounded-lg  w-50 cursor-pointer">Go back Home</button>
                            </Link>
                        </div>
                    </>
                )
            ) : (
                // What to show while products are loading (is null or undefined)
                <Spinner />
            )}

        </>
    )
}

