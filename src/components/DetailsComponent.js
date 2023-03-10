import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../App";



export function DetailsComponent() {

    const [product, setProduct] = useState({});
    const params = useParams();

    useEffect(() => {
        axios.get(`${BASE_URL}/getProductDetails/${params.id}`).then(async (response) => {
            await setProduct([])
            await setProduct(response.data[0])
        })
    }, [params.id])

    return (
        <div>
            <h2>Product Details</h2>
                        <dl className="row">
                            <dt className="col-3">Product Id :</dt>
                            <dd className="col-9">{product.id}</dd>
                            <dt className="col-12">Preview :</dt>
                            <dd className="col-12"><img src={product.image} width="100" height="100" className="border border-4 p-2" /></dd>
                            <dt className="col-3">Product Title :</dt>
                            <dd className="col-9">{product.title}</dd>
                            <dt className="col-3">Description :</dt>
                            <dd className="col-9">{product.description}</dd>
                            <dt className="col-3">Price:</dt>
                            <dd className="col-9"><b>${product.price}/-</b></dd>
                        </dl>
            <Link to={'/products/' + product.category}><span className="bi bi-chevron-double-left">Back to Products</span></Link>
        </div>
    )
}
