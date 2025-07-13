import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export let WhislistContext = createContext(0);
export default function WhislistContextProvider(props) {
    let token = localStorage.getItem('userToken')
    let [count, setcount] = useState(0)
    let [products, setproducts] = useState(null)
    const headers = {
        token: localStorage.getItem('userToken')
    };
    function addToWishlist(prodId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId: prodId }, { headers })
            .then((response) => {
                GetLoggedusewishlist()
                return response
            })
            .catch((error) => { return error })
    }
    function GetLoggedusewishlist() {
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
            .then((response) => {

                setproducts(response.data.data)
                setcount(response.data.count)

                console.log('ww', response)
            })
            .catch((error) => { console.log(error) })

    }

    function removewishListItem(prodID) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodID}`, { headers }).then((response) => {
            GetLoggedusewishlist()

            return response
        }).catch((error) => { return error })
    }

    useEffect(() => {
        if (token) {
            GetLoggedusewishlist()
        }

    }, [token])

    return <WhislistContext.Provider value={{ addToWishlist, products, count, removewishListItem }}>
        {props.children}
    </WhislistContext.Provider>

}


