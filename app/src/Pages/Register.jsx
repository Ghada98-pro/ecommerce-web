import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { userContext } from '../Context/UserContext'

//gh9999989@gmail.com
//token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NmNlNTRmN2U3NzU1MjYxMGY1ZmI4YyIsIm5hbWUiOiJHaGFkYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzUxOTY3MDU1LCJleHAiOjE3NTk3NDMwNTV9.r5yQPw-XhHI7mzB6LbV4-1p3PBKxK-ZRunywH2FkHd4
export default function Register() {
    let { isLoged, setisLoged } = useContext(userContext)
    const [isLoading, setisLoading] = useState(false)
    let navigate = useNavigate()
    function senData(val) {
        setisLoading(true)
        axios.post
            ('https://ecommerce.routemisr.com/api/v1/auth/signup', val)
            .then(({ data }) => {
                setisLoading(false)
                console.log({ data })
                console.log('token', data?.token)
                if (data?.message === 'success') {
                    setisLoged(data?.token)
                    localStorage.setItem('userToken', data.token)
                    toast.success(data.message)
                    navigate('/login')
                }
                else
                    toast.error(data.message)
            })
            .catch((error) => {
                setisLoading(false)
                console.log(error)
                toast.error(error.response.data.message)
            })
    }

    let validationSchema = Yup.object().shape(
        {
            name: Yup.string().required('name is required').min(3, 'min 3 letters').max(6, 'max 6 letters'),
            email: Yup.string().required('email is required').email('invaild email'),
            password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{4,10}$/, 'invaild pass'),
            rePassword: Yup.string().required('repassword is required').oneOf([Yup.ref('password')], 'not match to your password'),
            phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'Invalid Egyptian phone number')

        }
    )
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""

        },
        onSubmit: senData,
        validationSchema
    }

    )
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center m-8 ">

                    <div className="mb-10 w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8  ">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-secondry-color-500 text-center md:text-2xl dark:text-white">
                                Register Now
                            </h1>
                            <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Youe Name</label>
                                    <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  focus:border-gray-600 focus:outline-none
                                    w-full p-2.5 " placeholder="your Name" />
                                    {formik.touched.name && formik.errors.name ? <p className='text-red-600'>{formik.errors.name}</p> : null}
                                </div>
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
                                <div>
                                    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value={formik.values.rePassword} onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} type="password" name="rePassword" id="rePassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  focus:border-gray-600 focus:outline-none
                                    w-full p-2.5 " placeholder="rePassword" />
                                    {formik.touched.rePassword && formik.errors.rePassword ? <p className='text-red-600'>{formik.errors.rePassword}</p> : null}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg  focus:border-gray-600 focus:outline-none
                                    w-full p-2.5 " placeholder="phone" />
                                    {formik.touched.phone && formik.errors.phone ? <p className='text-red-600'>{formik.errors.phone}</p> : null}
                                </div>
                                <button type="submit" className="w-full text-white bg-secondry-color focus:ring-4 focus:outline-none 
                                font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    {isLoading ? <i className='fas fa-spinner fa-spin p-2'></i > : 'Register'}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have Account? <Link to='/Login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
