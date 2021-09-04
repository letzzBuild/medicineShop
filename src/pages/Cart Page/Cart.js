import React, { useContext } from 'react';
import Navbar from 'components/Navbar/Navbar';
import MedicinesContext from 'contexts/Medicine';

function Cart() {

    const med = useContext(MedicinesContext)
   
    return (
        <>
            <Navbar />
            <h1>Cart</h1>
        </>
    )
}

export default Cart
