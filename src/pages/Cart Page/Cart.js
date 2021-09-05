import React, { useContext, useState, useEffect } from 'react';
import Navbar from 'components/Navbar/Navbar';
import MedicinesContext from 'contexts/Medicine';
import axios from 'axios';
import { useFormik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

function Cart() {

    const { addToast } = useToasts();
    const history = useHistory();

    const USER_ID = 4;
    const STORE_ID = 2;

    const { medicines, setMedicines } = useContext(MedicinesContext)
    const [totalAmount, setTotalAmount] = useState(0);

    const formik = useFormik({
        initialValues: {
            address: "",
            user_id: USER_ID,
            store_id: STORE_ID,
            medicines: [...medicines]
        },
        onSubmit: data => {
            axios.post('/order/add/', data)
                .then(res => {
                    if(res.status === 200){
                        localStorage.setItem('orderId', res.data['order_id'])
                        localStorage.setItem('clientSecret', res.data['clientSecret'])
                        addToast('Order Added Successfully!', {
                            appearance: 'success',
                            autoDismiss: true
                        })
                        setTimeout(() => {
                            history.push('/payment')
                        }, 1000);
                    } else {
                        addToast('Eror!', {
                            appearance: 'error',
                            autoDismiss: true
                        })
                    }
                })
                .catch(error => console.error(error))
        }
    })


    const _onIncrease = index => {
        const newArr = [...medicines]
        newArr[index]['quantity'] += 1;
        setMedicines(newArr)
        let _total_amount = 0
        let total = 0
        medicines.forEach(element => {
            _total_amount = element.price * element.quantity
            total += _total_amount
        });
        setTotalAmount(total)
    }

    const _onDecrease = index => {
        const newMedicines = [...medicines]
        newMedicines[index]['quantity'] -= 1;
        if (newMedicines[index]['quantity'] === 0) {
            let total = newMedicines[index]['price']
            setTotalAmount(totalAmount - total)
            newMedicines.splice(index, 1)
        } else {
            let total = 0
            newMedicines.forEach(element => {
                total += element.price * element.quantity
            })
            setTotalAmount(total)
        }
        setMedicines(newMedicines)
    }

    const getTotalAmount = () => {
        let _total_amount = 0
        let total = 0
        medicines.forEach(element => {
            _total_amount = element.price * element.quantity
            total += _total_amount
        });
        setTotalAmount(totalAmount + total)
    }

    useEffect(() => {
        getTotalAmount()
    }, [])

    return (
        <>
            <Navbar />
            <div className="d-flex my-3">
                <h4 className="mx-auto text-danger">Once Order Place Cannot Be Cancelled</h4>
            </div>
            <div className="container bg-cart-list">
                <div className="row ">
                    {
                        medicines.length === 0 ? (
                            <div className="col-xl-12">
                                <h1 className="text-center">No medicine added!</h1>
                            </div>
                        ) : (
                            medicines.map((ele, ind) => (
                                <div key={ele.medicine_name} className="col-xl-12 my-3">
                                    <div className="card" style={{ height: ele.image.height }}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={axios.defaults.baseURL + ele.image} className="img-fluid rounded-start" alt={axios.defaults.baseURL + ele.image} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{ele.medicine_name}</h5>
                                                    <p className="card-text">
                                                        <b>Price</b> : {ele.price}₹<br />
                                                        <b>Quantity</b> : {ele.quantity}<br />
                                                    </p>
                                                    <div className="btn-group">
                                                        <button onClick={(e) => _onIncrease(ind)} className="btn btn-primary">+</button>
                                                        <button onClick={(e) => _onDecrease(ind)} className="btn btn-danger">-</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
            {
                medicines.length === 0 ? null : (
                    <div className="container-fluid">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="row justify-content-center">
                                <div className="col-xl-6">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Address:</label>
                                        <textarea
                                            className="form-control"
                                            id="address-textarea"
                                            rows="5"
                                            placeholder="Add your full address here"
                                            value={formik.values.address}
                                            name="address"
                                            onChange={formik.handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="col-xl-3 mt-3">
                                    <div className="card mt-3">
                                        <div className="card-header">
                                            Total
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">
                                                <b>Total Amount</b> : {totalAmount}₹<br />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                )
            }
            <div></div>
        </>
    )
}

export default Cart
