

import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
export default function VerifyResetCode() {

    // let { isLoged, setisLoged } = useContext(userContext)

    const [isLoading, setisLoading] = useState(false)
    let navigate = useNavigate()


    function sendData(val) {
        setisLoading(true)
        console.log(val)
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, val)
            .then(({ data }) => {
                console.log(data)
                setisLoading(false)
                if (data?.status === 'Success') {
                    toast.success(data.status)
                    navigate('/resetpassword')


                }
                else {
                    toast.error(data.status)
                }

            })
            .catch((error) => {
                console.log(error)
                setisLoading(false)
                console.log(error)
                toast.error(error?.response?.data?.message)
            })
    }

    let validationSchema = Yup.object().shape(
        {
            resetCode: Yup.string().required('Reset code is required').min(6, 'Code must be 6 digits').max(6, 'Code must be 6 digits'), // Assuming a 6-digit code
        }
    )
    let formik = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: sendData,
        validationSchema
    })

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center m-8 ">

                    <div className="  mb-10 w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-secondry-color-500 text-center md:text-2xl dark:text-white">
                                Confirm OTP
                            </h1>
                            <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6" action="#">

                                <div>
                                    <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the OTP</label>
                                    <input value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel"
                                        name="resetCode" id="otp" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                                      focus:border-gray-600 focus:outline-none w-full p-2.5 " placeholder="OTP" />
                                    {formik.touched.resetCode && formik.errors.resetCode ? <p className='text-red-600'>{formik.errors.resetCode}</p> : null}
                                </div>

                                <button type="submit" className="w-full text-white bg-secondry-color focus:ring-4 focus:outline-none focus:ring-main-color-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {isLoading ? <i className='fas fa-spinner fa-spin p-2'></i > : ' Confirm'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

