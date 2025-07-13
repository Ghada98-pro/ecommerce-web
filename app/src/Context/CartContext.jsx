import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export let cartContext = createContext(0)
export default function CartContextProvider(props) {
    let [cardId, setcartId] = useState(null)
    let [numOfCartItems, setnumOfCartItems] = useState(0)
    let [products, setproducts] = useState(null)
    let [totalCartPrice, settotalCartPrice] = useState(0)

    let token = localStorage.getItem('userToken')
    const headers = {
        token: localStorage.getItem('userToken')
    };

    function addTocart(prodId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: prodId }, { headers })
            .then((response) => {
                GetLoggeduseCart()
                return response
            })
            .catch((error) => { return error })
    }

    function GetLoggeduseCart() {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
            .then((response) => {

                setcartId(response?.data?.cartId)
                setnumOfCartItems(response?.data?.numOfCartItems)
                setproducts(response?.data?.data?.products)
                settotalCartPrice(response?.data?.data?.totalCartPrice)

                console.log('cart', response)
            })
            .catch((error) => { console.log(error) })

    }
    function removeCartItem(prodID) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodID}`, { headers }).then((response) => {
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setproducts(response?.data?.data?.products)
            settotalCartPrice(response?.data?.data?.totalCartPrice)
            return response
        }).catch((error) => { return error })
    }
    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then((response) => {
            setcartId(response?.data?.cartId)
            setnumOfCartItems(response?.data?.numOfCartItems)
            setproducts(response?.data?.data?.products)
            settotalCartPrice(response?.data?.data?.totalCartPrice)
            return response
        }).catch((error) => { return error })
    }

    function updateCartItem(cartID, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${cartID}`, { count: count }, { headers })
            .then((response => {
                setcartId(response?.data?.cartId)
                setnumOfCartItems(response?.data?.numOfCartItems)
                setproducts(response?.data?.data?.products)
                settotalCartPrice(response?.data?.data?.totalCartPrice)

                return response
            }

            ))
            .catch((error) => { return error })
    }
    function restCart() {
        setcartId(null)
        setproducts(null)
        settotalCartPrice(0)
        setnumOfCartItems(0)


    }
    useEffect(() => {
        if (token) {
            GetLoggeduseCart()
        }

    }, [token, cardId])
    return (
        <>
            <cartContext.Provider value={{
                setcartId, setnumOfCartItems, setproducts, products, totalCartPrice, clearCart,
                settotalCartPrice, cardId, numOfCartItems, addTocart, GetLoggeduseCart, removeCartItem, updateCartItem, restCart
            }}>
                {props.children}

            </cartContext.Provider>
        </>
    )
}
