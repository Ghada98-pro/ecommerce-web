import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/light.png'
import { userContext } from '../Context/UserContext'
import { useContext } from 'react'
import { cartContext } from '../Context/CartContext'
import { WhislistContext } from '../Context/WishListContext'

export default function Navbar() {
    let { numOfCartItems } = useContext(cartContext)
    let { isLoged, setisLoged } = useContext(userContext)
    let { count } = useContext(WhislistContext)


    let navgate = useNavigate()

    function Logout() {
        localStorage.removeItem('userToken')
        setisLoged(null)
        navgate('/login')
    }
    return (
        <>

            <div className='fixed top-0 left-0 right-0 z-30'>
                <nav className="bg-main-color border-gray-200 dark:bg-gray-900 text-white ">
                    <div className="flex flex-wrap justify-between items-center p-4 container m-auto  ">
                        <a href="" className="flex items-center space-x-2 rtl:space-x-reverse">
                            <img src={logo} className="h-12 w-fit" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">online Shop</span>
                        </a>
                        <div className="flex items-center rtl:space-x-reverse">
                            <ul className='flex flex-row lg:space-x-6 space-x-4'>
                                {isLoged === null ? <>
                                    <li>
                                        <NavLink to='register' className="text-white dark:text-white " aria-current="page">Register</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='login' className=" text-secondry-color dark:text-white" aria-current="page">Login</NavLink>
                                    </li>
                                </>

                                    : <li>
                                        <span onClick={Logout} className=" text-secondry-color cursor-pointer
                                     dark:text-white" aria-current="page">Logout</span>
                                    </li>}


                                <li>
                                    <i className='fas fa-moon'></i>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
                {isLoged !== null ? <>
                    <nav className="bg-gray-100 dark:bg-gray-700 p-3">
                        <div className="max-w-screen-xl px-4 py-3 mx-auto ">
                            <div className="flex items-center">
                                <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">

                                    <li>
                                        <NavLink to='home' className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='products' className="text-gray-900 dark:text-white hover:underline" aria-current="page">Products</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='brands' className="text-gray-900 dark:text-white hover:underline" aria-current="page">Brands</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='categories' className="text-gray-900 dark:text-white hover:underline" aria-current="page">Categories</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='cart' className=" relative text-gray-900 dark:text-white hover:underline" aria-current="page">Cart
                                            {numOfCartItems > 0 ? <span className=" absolute -top-3 -end-7 bg-yellow-100 text-yellow-800 text-xs font-medium me-2  rounded-full w-6 h-6 flex justify-center items-center-safe
                                         border border-yellow-300">{numOfCartItems}</span> : null}
                                        </NavLink>

                                    </li>
                                    <li>
                                        <NavLink to='wishlist' className=" relative text-gray-900 dark:text-white hover:underline" aria-current="page">Wish list
                                            {count > 0 ? <span className=" absolute -top-3 -end-7 bg-red-100 text-red-800 text-xs font-medium me-2  rounded-full w-6 h-6 flex justify-center items-center-safe
                                         border border-red-300">{count}</span> : null}
                                        </NavLink>
                                    </li>






                                </ul>
                            </div>
                        </div>
                    </nav>
                </> : null}
            </div>


        </>
    )
}
