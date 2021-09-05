import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import MedicinesContext from 'contexts/Medicine';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Navbar from 'components/Navbar/Navbar';

const Payment = () => {
    const [cardPayment, setCardPayment] = useState(false);
    const [cashOnDelivery, setCashOnDelivery] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const history = useHistory()

    const clientSecret = localStorage.getItem('clientSecret');
    const orderId = localStorage.getItem('orderId');

    const { medicines, setMedicines } = useContext(MedicinesContext)

    const formik = useFormik({
        initialValues: {
            cardHolderName: "",
            cardNumber: "",
            exp_month: 0,
            exp_year: 0,
            cvv: "",
            clientSecret: clientSecret,
            order_id: orderId
        },
        onSubmit: data => {
            console.log('Card Value', data)
            if(cashOnDelivery) {
                history.push('/paymentsuccess')
            } else {
                axios.post('/order/success/', data)
                    .then(res => {
                        console.log('[Response]',res.data)
                        setMedicines([])
                        history.push({
                            pathname: '/paymentsuccess',
                            state: res.data.res
                        })
                    })
                    .catch(error => console.error(error))
            }
        }
    })

    const getTotalAmount = () => {
        let _total_amount = 0
        let total = 0
        medicines.forEach(element => {
            _total_amount = element.price * element.quantity
            total += _total_amount
        });
        setTotalAmount(totalAmount + total)
    }

    const choosePaymentMethod = e => {
        if (e.target.value === 'cashOnDelivery') {
            setCashOnDelivery(true);
            setCardPayment(false)
        } else {
            setCardPayment(true)
            setCashOnDelivery(false);
        }
    }

    useEffect(() => {
        getTotalAmount()
    }, [])

    return (
        <>
            <Navbar />
            <div className="container my-3">
                <form onSubmit={formik.handleSubmit}>
                    <div className="card">
                        <div className="card-top border-bottom text-center">
                            <h3 className="card-header ">Complete Your Payment</h3>
                        </div>
                        <div className="card-body px-5">
                            <div className="row upper">
                                <h5>Choose Your Payment Method</h5>
                            </div>
                            <div className="row">
                                <div className="col-xl-7">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            value="cashOnDelivery"
                                            onChange={choosePaymentMethod}
                                            type="radio"
                                            name="paymentMethod"
                                            id="flexRadioDefault1" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Cash On Delivery
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            value="cardPayment"
                                            onChange={choosePaymentMethod}
                                            type="radio"
                                            name="paymentMethod"
                                            id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Card Payment
                                        </label>
                                    </div>
                                    {
                                        cardPayment ? (
                                            <>
                                                <div className="card mt-2">
                                                    <div className="card-body p-4">
                                                        <b><span>Cardholder's name:</span></b>
                                                        <input
                                                            className="form-control my-2"
                                                            placeholder="Linda Williams"
                                                            value={formik.values.cardHolderName}
                                                            onChange={formik.handleChange}
                                                            name="cardHolderName"
                                                        />
                                                        <b><span>Card Number:</span></b>
                                                        <input
                                                            className="form-control my-2"
                                                            placeholder="0125 6780 4567 9909"
                                                            value={formik.values.cardNumber}
                                                            onChange={formik.handleChange}
                                                            name="cardNumber"
                                                            maxLength={16}
                                                        />
                                                        <div className="row">
                                                            <div className="col-4">
                                                                <b><span>Expiry Month:</span></b>
                                                                <input
                                                                    className="form-control my-2"
                                                                    placeholder="MM"
                                                                    type="number"
                                                                    min={1}
                                                                    max={12}
                                                                    maxLength={2}
                                                                    value={formik.values.exp_month}
                                                                    onChange={formik.handleChange}
                                                                    name="exp_month"
                                                                />
                                                            </div>
                                                            <div className="col-4">
                                                                <b><span>Expiry Year:</span></b>
                                                                <input
                                                                    type="number"
                                                                    className="form-control my-2"
                                                                    placeholder="YYYY"
                                                                    min={2021}
                                                                    maxLength={4}
                                                                    value={formik.values.exp_year}
                                                                    onChange={formik.handleChange}
                                                                    name="exp_year"
                                                                />
                                                            </div>
                                                            <div className="col-4">
                                                                <b><span>CVV:</span></b>
                                                                <input
                                                                    className="form-control my-2"
                                                                    id="cvv"
                                                                    value={formik.values.cvv}
                                                                    onChange={formik.handleChange}
                                                                    name="cvv"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) :  null
                                    }
                                </div>
                                {/*
                                Order Summary 
                            */}
                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-header">Order Summary</div>
                                        <div className="card-body" style={{ height: '200px', overflowY: 'auto' }}>
                                            {
                                                medicines.map(element => {
                                                    return (
                                                        <div key={element.medicine_id} className="row item">
                                                            <div className="col-4 align-self-center">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={axios.defaults.baseURL + element.image}
                                                                />
                                                            </div>
                                                            <div className="col-8">
                                                                <div className="row">
                                                                    <b>{element.price * element.quantity}₹</b>
                                                                </div>
                                                                <div className="row text-muted">
                                                                    {element.medicine_name}
                                                                </div>
                                                                <div className="row">{element.quantity}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <hr />
                                        <div className="row lower mx-3">
                                            <div className="col text-left">
                                                <b>Total to pay</b>
                                            </div>
                                            <div className="col text-right">
                                                <b>{totalAmount}₹</b>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="d-flex">
                                            <button disabled={formik.isSubmitting} type="submit" className="btn btn-outline-success mx-auto">Place order</button>
                                        </div>
                                        <p className="text-muted text-center">
                                            Complimentary Shipping & Returns
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div> </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Payment;