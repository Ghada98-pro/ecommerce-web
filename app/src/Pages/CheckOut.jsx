
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../Context/UserContext'
import { cartContext } from '../Context/CartContext'


export default function CheckOut() {
    let { cardId, restCart } = useContext(cartContext)
    const [isCashLoading, setisCashLoading] = useState(false)
    const [isOnlineLoading, setisOnlineLoading] = useState(false)

    const [isOnline, setisOnline] = useState(true)

    let navigate = useNavigate()
    const headers = {
        token: localStorage.getItem('userToken')
    };


    function payCash(val) {
        console.log(val)
        setisCashLoading(true)
        axios.post
            (`https://ecommerce.routemisr.com/api/v1/orders/${cardId}`,
                { shippingAddress: val },
                { headers }
            )
            .then(({ data }) => {
                setisCashLoading(false)
                console.log({ data })
                console.log('d', data?.status)
                if (data?.status === 'success') {
                    toast.success('checkOut is Done ')
                    restCart()
                    navigate('/cart')
                }
                else
                    toast.error(data?.status)
            }
            )
            .catch((error) => {
                setisCashLoading(false)
                console.log(error)
                // toast.error(error?.response?.data?.message)
            })
    }
    function payOnline(val) {
        console.log(val)
        setisOnlineLoading(true)
        axios.post
            (`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=http://localhost:5173`,
                { shippingAddress: val },
                { headers }
            )
            .then(({ data }) => {
                setisOnlineLoading(false)
                console.log('online', { data })
                // console.log('d', data?.status)
                if (data?.status === 'success') {
                    window.location.href = data?.session.url
                    toast.success(' you are movine to payment gate')
                    restCart()
                    //     navigate('/cart')
                }
                else
                    toast.error(data?.status)
            }
            )
            .catch((error) => {
                setisOnlineLoading(false)
                console.log(error)
                toast.error(data?.status)
            })
    }
    function detectPayment(val) {
        if (isOnline) {
            payOnline(val)
        }
        else {
            payCash(val)
        }
    }


    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ''
        },
        onSubmit: () => { detectPayment() },
    })

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center m-8 ">

                    <div className="  mb-10 w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-secondry-color-500 text-center md:text-2xl dark:text-white">
                                CheckOut
                            </h1>
                            <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6" action="#">

                                <div>
                                    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
                                    <input value={formik.values.details} onChange={formik.handleChange} type="text"
                                        name="details" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                                      focus:border-gray-600 focus:outline-none w-full p-2.5 " placeholder="details" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input value={formik.values.phone} onChange={formik.handleChange} type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  focus:border-gray-600 focus:outline-none
                                    w-full p-2.5 " placeholder="phone" />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
                                    <input value={formik.values.city} onChange={formik.handleChange} type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  focus:border-gray-600 focus:outline-none
                                    w-full p-2.5 " placeholder="city" />
                                </div>

                                <button type="submit" onClick={() => { setisOnline(false) }} className=" cursor-pointer w-full text-white bg-secondry-color focus:ring-4 focus:outline-none focus:ring-main-color-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {isCashLoading ? <i className='fas fa-spinner fa-spin p-2'></i > : 'PayCash'}
                                </button>
                                <button type="submit" onClick={() => { setisOnline(true) }} className=" cursor-pointer w-full text-white bg-secondry-color focus:ring-4 focus:outline-none focus:ring-main-color-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {isOnlineLoading ? <i className='fas fa-spinner fa-spin p-2'></i > : 'PayOnline'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
