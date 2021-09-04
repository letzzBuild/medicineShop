import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

import Navbar from "components/Navbar/Navbar";
import { Link } from 'react-router-dom';

const STORE_ID = 2; // value from localStorage

function Store({ value, setValue }) {

    const { addToast } = useToasts();

    const [storeInfo, setStoreInfo] = useState({});
    const [medicineInStore, setMedicineInStore] = useState([]);

    useEffect(() => {

        // request for store information
        axios.post('/store/get/', {
            store_id: STORE_ID
        }).then(res => {
            setStoreInfo(res.data)
        }).catch(error => console.error(error))

        // request for medicines in store
        axios.post('/medicine/getmedicine/', {
            store_id: STORE_ID
        }).then(res => {
            setMedicineInStore(res.data)
        }).catch(error => console.error(error))

    }, []);

    const _onClick = e => {
        const data = JSON.parse(e.target.value)
        if(value.length === 0) {
            value.push(data)
        } else {
            for (let i = 0; i < value.length; i++) {
                const element = value[i];
                if(element.id === data.id) {
                    console.error("Already here")
                } else {
                    value.push(data)
                    console.info('Added!')
                }
            }
        }
        value = [...new Set(value)]
        console.log(value);
        e.preventDefault()
    }

    return (
        <div>
            <Navbar />
            <Link to="/cart">Cart</Link>
            {
                // Card For Store Information 
            }
            <div className="card">
                <div className="card-body">
                    <h2 className="card-header">Store Information</h2>
                    <p className="mx-3 my-2">
                        <b>Store Name</b> : {storeInfo.store_name}<br />
                        <b>Store Phone Number</b> : {storeInfo.store_phone_number}<br />
                        <b>Store Address</b> : {storeInfo.store_address}<br />
                    </p>
                </div>
            </div>

            {
                // Cards for medicine availabel in store
            }
            <div className="container-fluid mt-4">
                <div className="row justify-content-evenly">
                    {
                        medicineInStore.map(ele => {
                            return (
                                <div key={ele.id} className="col-xl-3">
                                    <div className="card mb-3" style={{ width: "18rem" }}>
                                        <img src={axios.defaults.baseURL + ele.medicine_id.image} className="card-img-top" alt={axios.defaults.baseURL + ele.medicine_id.image} />
                                        <div className="card-body">
                                            <p className="card-text">
                                                <b>Medicine Name</b> : {ele.medicine_id.medicine_name}<br />
                                                <b>Availabel Quantity</b> : {ele.quantity}<br />
                                                <b>Price</b> : {ele.price}<br />
                                                <b>Mfg Date</b> : {ele.mfg_date}<br />
                                                <b>Exp Date</b> : {ele.exp_date}<br />
                                            </p>
                                            <button
                                                id="add-to-cart"
                                                onClick={_onClick}
                                                value={JSON.stringify(ele)}
                                                className="mx-auto btn btn-success"
                                            >
                                                Add To Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Store;
