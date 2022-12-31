import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../App";



export function DetailsComponent() {

    const [product, setProduct] = useState({});
    const params = useParams();

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `${BASE_URL}/getProductDetails/${params.id}`
        }

        axios.request(options).then((response) => {
            setProduct([]);
            console.log(response.data)
            setProduct(response.data);
        }).catch((err) => {
            console.error(err);
        })
    }, [])

    return (
        <div>
            <h2>Product Details</h2>

            {
                product.map((item) => {
                    return (
                        <dl className="row">
                            <dt className="col-3">Product Id :</dt>
                            <dd className="col-9">{item.id}</dd>
                            <dt className="col-12">Preview :</dt>
                            <dd className="col-12"><img src={item.image} width="100" height="100" className="border border-4 p-2" /></dd>
                            <dt className="col-3">Product Title :</dt>
                            <dd className="col-9">{item.title}</dd>
                            <dt className="col-3">Description :</dt>
                            <dd className="col-9">{item.description}</dd>
                            <dt className="col-3">Price:</dt>
                            <dd className="col-9"><b>${item.price}/-</b></dd>
                        </dl>
                    )
                })
            }
            <Link to={'/products/' + product.category}><span className="bi bi-chevron-double-left">Back to Products</span></Link>
        </div>
    )
}