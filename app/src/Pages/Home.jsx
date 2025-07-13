import React from 'react'
import { useContext } from 'react'
import { userContext } from '../Context/UserContext'
import Products from './Products'
import Categories from './Categories'
import CatgegoriesSlider from './CatgegoriesSlider'

export default function Home() {
    let { isLoged, setisLoged, ispass, setispass } = useContext(userContext)

    return (
        <>
            <CatgegoriesSlider />
            <Products />
        </>

    )
}
