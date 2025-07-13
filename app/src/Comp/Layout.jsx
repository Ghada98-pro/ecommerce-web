import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'


export default function Layout() {
    return (
        <>

            <Navbar />
            <div className=' bg-gray-50'>
                <div className=' pt-44 container m-auto max-w-7xl '>
                    <Outlet />
                </div>

            </div>

            <Footer />

        </>
    )
}
