import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext'
import Spinner from './Spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
export default function Cart() {

    let { numOfCartItems, products, totalCartPrice, cardId, removeCartItem, updateCartItem, clearCart } = useContext(cartContext)
    async function handelRemoveCart(prodID) {
        let response = await removeCartItem(prodID)
        console.log(response)
        if (response.data.status === "success") {
            toast.success('product Deleted')
        }
        else {
            toast.error('Error ')
        }

    }
    async function handelClearCart() {
        let response = await clearCart()
        console.log(response)
        if (response.data.message === "success") {
            toast.success('cart Deleted')
        }
        else {
            toast.error('Error ')
        }

    }
    async function handelUpdateCart(cartID, count) {
        let response = await updateCartItem(cartID, count)
        console.log('update', response)
        if (response.data.status === 'success') {
            toast.success('product updated')
        }
        else {
            toast.success('Error ')
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
                                <h1 className="text-2xl font-semibold mb-8 text-secondry-color-700">Shopping Cart</h1>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="md:w-3/4">
                                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className=''>
                                                        <th className="text-left font-semibold">image</th>

                                                        <th className="text-left font-semibold"> name</th>
                                                        <th className="text-left font-semibold">Quantity</th>
                                                        <th className="text-left font-semibold">Total</th>
                                                        <th className="text-left font-semibold">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {products?.map((prod) => {
                                                        return <tr key={prod?.product._id}>
                                                            <td className="py-4">
                                                                <div className="flex items-center">
                                                                    <img className="h-16 w-16 mr-4 object-cover" src={prod?.product.imageCover} alt="Product image" />
                                                                </div>
                                                            </td>
                                                            <td className="py-4 ">{prod?.product?.title?.split(' ').slice(0, 2).join(' ')}</td>


                                                            <td className="py-4">
                                                                <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                                    <button onClick={() => { handelUpdateCart(prod?.product._id, prod?.count - 1) }}
                                                                        className="cursor-pointer text-gray-700 hover:bg-gray-100 active:bg-gray-200
                                                                            inline-flex items-center justify-center  text-lg font-semibold focus:outline-none transition-colors duration-200 px-3"
                                                                        aria-label="Decrease quantity" >
                                                                        -
                                                                    </button>
                                                                    <div
                                                                        className="bg-gray-50 text-gray-800 text-center font-semibold  select-none border-x border-gray-300 px-3"
                                                                    >
                                                                        {prod?.count}
                                                                    </div>
                                                                    <button onClick={() => { handelUpdateCart(prod?.product._id, prod?.count + 1) }}
                                                                        className="cursor-pointer text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50
                                                                inline-flex items-center justify-center px-3 text-lg font-semibold focus:outline-none transition-colors duration-200"
                                                                        aria-label="Increase quantity"
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </td>
                                                            <td className="py-4">${prod.price}</td>
                                                            <td className="py-4  "><button onClick={() => { handelRemoveCart(prod?.product._id) }} className='cursor-pointer text-red-500'>remove</button></td>

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
                                    <div className="md:w-1/4">
                                        <div className="bg-white rounded-lg shadow-md p-6">
                                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                                            <div className="flex justify-between mb-2">
                                                <span>Total Price</span>
                                                <span>${totalCartPrice}</span>
                                            </div>

                                            <div className="flex justify-between mb-2">
                                                <span>Shipping</span>
                                                <span>$0.00</span>
                                            </div>
                                            <hr className="my-2" />
                                            <div className="flex justify-between mb-2">
                                                <span className="font-semibold">Total</span>
                                                <span className="font-semibold">${totalCartPrice}</span>
                                            </div>
                                            <Link to='/checkout'>
                                                <button className="bg-secondry-color text-white py-2 px-4 rounded-lg mt-4 w-full cursor-pointer">Checkout</button>
                                            </Link>
                                            <button onClick={() => { handelClearCart() }}
                                                className="outline outline-2 outline-main-color   py-2 px-4 rounded-lg mt-4 w-full cursor-pointer"
                                            >
                                                clear cart
                                            </button>
                                        </div>
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

