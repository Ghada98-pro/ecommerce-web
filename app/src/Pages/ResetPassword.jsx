import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../Context/UserContext'
export default function ResetPassword() {


    const [isLoading, setisLoading] = useState(false)
    let { setisLoged } = useContext(userContext)
    let navigate = useNavigate()


    function sendData(val) {
        setisLoading(true)
        console.log(val)
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, val)
            .then(({ data }) => {
                console.log(data)
                setisLoading(false)

                if (data && data.token) {
                    toast.success('Password reset successfully! You are now logged in.');
                    localStorage.setItem('userToken', data.token); // Use data.token
                    setisLoged(data.token); // Use data.token
                    navigate('/home');
                }
                else {
                    toast.error(data.message)
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
            email: Yup.string().required('email is required').email('invaild email'),
            newPassword: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{4,10}$/, 'invaild pass'),
        }
    )
    let formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
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
                                Reset Password                            </h1>
                            <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6" action="#">


                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Youe Email</label>
                                    <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email"
                                        name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg 
                                      focus:border-gray-600 focus:outline-none w-full p-2.5 " placeholder="name@gmail.com" />
                                    {formik.touched.email && formik.errors.email ? <p className='text-red-600'>{formik.errors.email}</p> : null}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="newPassword" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  focus:border-gray-600 focus:outline-none
                                    w-full p-2.5 " placeholder="password" />
                                    {formik.touched.newPassword && formik.errors.newPassword ? <p className='text-red-600'>{formik.errors.newPassword}</p> : null}
                                </div>

                                <button type="submit" className="w-full text-white bg-secondry-color focus:ring-4 focus:outline-none focus:ring-main-color-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {isLoading ? <i className='fas fa-spinner fa-spin p-2'></i > : 'Reset Password'}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

