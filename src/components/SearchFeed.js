import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../App";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBRipple,
    MDBBtn,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from 'react-cookie';
import { toast } from "react-toastify";


function SearchFeed() {

    const [prodList, setProdList] = useState([]);
    const { searchTerm } = useParams();
    useEffect(() => {
        const getSearchedProd = () => {
            const options = {
                method: 'GET',
                url: `${BASE_URL}/getSearchedProd/${searchTerm}`
            }

            axios.request(options).then((response) => {
                setProdList([]);
                setProdList(response.data);
            }).catch((err) => {
                console.error(err);
            })
        }

        getSearchedProd();
    }, [searchTerm])

    const dispatch = useDispatch()
    const [cookies, setCookies, removeCookie] = useCookies();

    const updateWishlist = async (productID) => {
        const payload = {
            userID: cookies["_id"],
            productID: productID
        }
        await axios.post(`${BASE_URL}/updateWishlist`, payload)
            .then((response) => {
                toast.success("Added to Wishlist")
            })
            .catch((err)=>{
              console.log(err)
              toast.error("Could't add to wishlist")  
            })
    }

    return (
        <MDBContainer fluid>
            {
                prodList.map(prod => {
                    return (
                        <MDBRow className="justify-content-center mb-0" key={prod.id}>
                            <MDBCol md="12" xl="10">
                                <MDBCard className="shadow-0 border rounded-3 mt-5 mb-3">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                                                <MDBRipple
                                                    rippleColor="light"
                                                    rippleTag="div"
                                                    className="bg-image rounded hover-zoom hover-overlay"
                                                >
                                                    <MDBCardImage
                                                        src={prod.image}
                                                        fluid
                                                        className="w-100"
                                                    />
                                                </MDBRipple>
                                            </MDBCol>
                                            <MDBCol md="6">
                                                <h5>{prod.title}</h5>
                                                <div className="d-flex flex-row">
                                                    <div className="text-danger mb-1 me-2">
                                                        <MDBIcon fas icon="star" />
                                                        {prod.rating.rate}
                                                    </div>
                                                    <span>({prod.rating.count})</span>
                                                </div>
                                                <div className="mt-1 mb-0 text-muted small">
                                                    <span>category</span>
                                                    <span className="text-primary"> : </span>
                                                    <span>{prod.category}</span>
                                                </div>
                                                <p className="text-truncate mb-4 mb-md-0">
                                                    {prod.description}
                                                </p>
                                            </MDBCol>
                                            <MDBCol
                                                md="6"
                                                lg="3"
                                                className="border-sm-start-none border-start"
                                            >
                                                <div className="d-flex flex-row align-items-center mb-1">
                                                    <h4 className="mb-1 me-1">${prod.price}</h4>
                                                </div>
                                                <h6 className="text-success">Free shipping</h6>
                                                <div className="d-flex flex-column mt-4">
                                                    <Link to={'/details/' + prod.id}>
                                                        <MDBBtn color="primary" size="sm" className="w-100">
                                                            Details
                                                        </MDBBtn>
                                                    </Link>
                                                    
                                                       {
                                                        (cookies.username !== undefined) && ( <MDBBtn
                                                            outline color="primary"
                                                            size="sm"
                                                            className="mt-2 w-100"
                                                            onClick={() => updateWishlist(prod.id)}
                                                        >
                                                            Add to wish list
                                                        </MDBBtn>)
                                                       }
                                                    
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    )
                })
            }

        </MDBContainer>
    );
}

export { SearchFeed };