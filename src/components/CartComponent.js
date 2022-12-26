import React, { useEffect } from "react"
import './CartComponent.css'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBRow,
    MDBTooltip,
    MDBTypography,
} from "mdb-react-ui-kit";

import { useSelector, useDispatch } from "react-redux";
import { deleteCart, plusQuantity, minusQuantity } from "../redux/actions";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function CartComponent() {

    const cartItems = useSelector((state) => state.cartProducts)
    const logincheck = useSelector((state) => state.logStatus.loginStatus)
    const dispatch = useDispatch()
    const [cookies, setCookies, removeCookie] = useCookies();
    const navigate = useNavigate()
    const date = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`

    let listCart = [];
    var TotalCart = 0;

    useEffect(()=>{
        setCookies(cookies["username"])
        if(logincheck === false && cookies.username === undefined){
            navigate("/login")
        }else{
            navigate("/cart")
        }
    },[])


    Object.keys(cartItems.Carts).forEach((item) => {
        TotalCart += cartItems.Carts[item].quantity * cartItems.Carts[item].price;
        listCart.push(cartItems.Carts[item])
    })
    
    const totalPrice = (price, quantity) => {
        return Number(price * quantity).toLocaleString('en-US')
    }

    return (
        <>
            <section className="h-100 gradient-custom">
                {
                    listCart.length === 0 && (
                        <>
                            <h2 className="text-white">You have not added any items to the cart.</h2>
                        </>
                    )
                }
                {
                    listCart.length > 0 && (
                        <>
                            <MDBContainer className="py-5 h-100">
                                <MDBRow className="justify-content-center my-4">
                                    <MDBCol md="8">
                                        <MDBCard className="mb-4">
                                            <MDBCardHeader className="py-3">
                                                <MDBTypography tag="h5" className="mb-0">
                                                    Cart - {cartItems.numberCart} items
                                                </MDBTypography>
                                            </MDBCardHeader>
                                            <MDBCardBody>
                                                {
                                                    listCart.map((item, index) => {
                                                        return (
                                                            <MDBRow className="mb-4">
                                                                <MDBCol lg="3" md="12" className="mb-4 mb-lg-0">
                                                                    <MDBRipple rippleTag="div" rippleColor="light"
                                                                        className="bg-image rounded hover-zoom hover-overlay">
                                                                        <img
                                                                            src={item.image}
                                                                            className="w-100" />
                                                                        <a href="#!">
                                                                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)", }}>
                                                                            </div>
                                                                        </a>
                                                                    </MDBRipple>
                                                                </MDBCol>

                                                                <MDBCol lg="5" md="6" className=" mb-4 mb-lg-0">
                                                                    <p>
                                                                        <strong>{item.title}</strong>
                                                                    </p>
                                                                    <p>Category: {item.category}</p>
                                                                    <p>Rating: <MDBIcon fas icon="star" />{item.rating.rate}</p>

                                                                    <MDBBtn onClick={() => dispatch(deleteCart(index))} title="Remove item" className="btn btn-primary me-2">
                                                                        <MDBIcon fas icon="trash" />
                                                                    </MDBBtn>

                                                                    <MDBBtn onClick={() => dispatch()} title="Move to the wish list" className="btn btn-danger">
                                                                        <MDBIcon fas icon="heart" />
                                                                    </MDBBtn>

                                                                </MDBCol>
                                                                <MDBCol lg="4" md="6" className="mb-4 mb-lg-0">
                                                                    <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                                        <MDBBtn className="px-3 me-2" onClick={() => dispatch(minusQuantity(index))}>
                                                                            <MDBIcon fas icon="minus" />
                                                                        </MDBBtn>

                                                                        <MDBInput defaultValue={1} value={item.quantity} min={0} type="number" label="Quantity" />

                                                                        <MDBBtn className="px-3 ms-2" onClick={() => dispatch(plusQuantity(index))}>
                                                                            <MDBIcon fas icon="plus" />
                                                                        </MDBBtn>
                                                                    </div>

                                                                    <p className="text-start text-md-center">
                                                                        <strong>${totalPrice(item.price, item.quantity)}</strong>
                                                                    </p>
                                                                </MDBCol>
                                                            </MDBRow>

                                                        )

                                                    })
                                                }



                                            </MDBCardBody>
                                        </MDBCard>

                                        <MDBCard className="mb-4">
                                            <MDBCardBody>
                                                <p>
                                                    <strong>Expected shipping delivery</strong>
                                                </p>
                                                <p className="mb-0">within 3 days from {date}</p>
                                            </MDBCardBody>
                                        </MDBCard>

                                        <MDBCard className="mb-4 mb-lg-0">
                                            <MDBCardBody>
                                                <p>
                                                    <strong>We accept</strong>
                                                </p>
                                                <MDBCardImage className="me-2" width="45px"
                                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                                    alt="Visa" />
                                                <MDBCardImage className="me-2" width="45px"
                                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                                                    alt="American Express" />
                                                <MDBCardImage className="me-2" width="45px"
                                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                                    alt="Mastercard" />
                                                <MDBCardImage className="me-2" width="45px"
                                                    src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                                                    alt="PayPal acceptance mark" />
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                    <MDBCol md="4">
                                        <MDBCard className="mb-4">
                                            <MDBCardHeader>
                                                <MDBTypography tag="h5" className="mb-0">
                                                    Summary
                                                </MDBTypography>
                                            </MDBCardHeader>
                                            <MDBCardBody>
                                                <MDBListGroup flush>
                                                    <MDBListGroupItem
                                                        className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                        Products
                                                        <span>${TotalCart.toFixed(2)}</span>
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
                                                        Shipping
                                                        <span>User Address</span>
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem
                                                        className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                        <div>
                                                            <strong>Total amount</strong>
                                                            <strong>
                                                                <p className="mb-0">(including GST)</p>
                                                            </strong>
                                                        </div>
                                                        <span>
                                                            <strong>${TotalCart.toFixed(2)}</strong>
                                                        </span>
                                                    </MDBListGroupItem>
                                                </MDBListGroup>

                                                <MDBBtn block size="lg">
                                                    Go to checkout
                                                </MDBBtn>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                </MDBRow>
                            </MDBContainer>
                        </>
                    )
                }
            </section>


        </>
    )
}