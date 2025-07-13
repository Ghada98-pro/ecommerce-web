import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Comp/Navbar'
import Layout from './Comp/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Products from './Pages/Products'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Cart from './Pages/Cart'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Categories from './Pages/Categories'
import Brands from './Pages/Brands'
import toast, { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'
import UserContextProvider from './Context/UserContext'
import ProtectRoute from './Comp/ProtectRoute'
import ForgotPassword from './Pages/ForgotPassword'
import VerifyResetCode from './Pages/VerifyResetCode'
import ResetPassword from './Pages/ResetPassword'
import ProductDetail from './Pages/ProductDetail'
import CartContextProvider from './Context/CartContext'
import CheckOut from './Pages/CheckOut'
import WishList from './Pages/WishList'
import WhislistContextProvider from './Context/WishListContext'



function App() {
  const [count, setCount] = useState(0)
  let queryclient = new QueryClient()

  let route = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectRoute><Home /></ProtectRoute> },
        { path: 'home', element: <ProtectRoute><Home /></ProtectRoute> },

        { path: 'products', element: <ProtectRoute><Products /></ProtectRoute> },
        { path: 'categories', element: <ProtectRoute><Categories /></ProtectRoute> },
        { path: 'brands', element: <ProtectRoute><Brands /></ProtectRoute> },
        { path: 'productdetail/:id/:category', element: <ProtectRoute><ProductDetail /></ProtectRoute> },

        { path: 'cart', element: <ProtectRoute><Cart /></ProtectRoute> },
        { path: 'checkout', element: <ProtectRoute><CheckOut /></ProtectRoute> },
        { path: 'wishlist', element: <ProtectRoute><WishList /></ProtectRoute> },




        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgotPassword', element: <ForgotPassword /> },
        { path: "verifyresetcode", element: <VerifyResetCode /> },
        { path: "resetpassword", element: <ResetPassword /> },



        { path: '*', element: <NotFound /> }

      ]
    }])

  return (
    <>
      <QueryClientProvider client={queryclient}>
        <UserContextProvider>
          <CartContextProvider>
            <WhislistContextProvider>
              <RouterProvider router={route} />
              <Toaster />
            </WhislistContextProvider>


          </CartContextProvider>

        </UserContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
