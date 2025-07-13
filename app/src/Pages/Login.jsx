import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../Context/UserContext'


export default function Login() {
    let { isLoged, setisLoged, ispass, setispass } = useContext(userContext)

    const [isLoading, setisLoading] = useState(false)
    let navigate = useNavigate()


    function sendData(val) {
        setisLoading(true)
        axios.post
            ('https://ecommerce.routemisr.com/api/v1/auth/signin', val)
            .then(({ data }) => {
                setispass(val.password)
                setisLoading(false)
                console.log('pass', ispass)
                console.log('val', val)
                console.log({ data })
                console.log('token', data?.token)
                if (data?.message === 'success') {

                    localStorage.setItem('userToken', data.token)
                    setisLoged(data?.token)

                    toast.success(data.message)
                    navigate('/')
                }
                else
                    toast.error(data.message)
            })
            .catch((error) => {
                setisLoading(false)
                console.log(error)
                toast.error(error?.response?.data?.message)
            })
    }

    let validationSchema = Yup.object().shape(
        {
            email: Yup.string().required('email is required').email('invaild email'),
            password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{4,10}$/, 'invaild pass'),
        }
    )
    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
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
                                Login
                            </h1>
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
                                    <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  focus:border-gray-600 focus:outline-none
                                    w-full p-2.5 " placeholder="password" />
                                    {formik.touched.password && formik.errors.password ? <p className='text-red-600'>{formik.errors.password}</p> : null}



                                </div>
                                <div className="flex items-center justify-end mb-4">

                                    <Link to='/forgotPassword' className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                </div>
                                <button type="submit" className="w-full text-white bg-secondry-color focus:ring-4 focus:outline-none focus:ring-main-color-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {isLoading ? <i className='fas fa-spinner fa-spin p-2'></i > : 'Login'}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Do not have Account?
                                    <Link to='/register' className="font-medium text-primary-600 hover:underline
                                      dark:text-primary-500"> Register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
