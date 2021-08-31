import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from "components/Navbar/Navbar";

const STORE_ID = 2; // value from localStorage

function Store() {

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

    const _onClick = e => {console.log(e.target.value)}

    return (
        <div>
            <Navbar />
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
                                            <button onClick={_onClick} value={ele.medicine_id.medicine_id} className="mx-auto btn btn-success mx-auto" >Buy</button>
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
