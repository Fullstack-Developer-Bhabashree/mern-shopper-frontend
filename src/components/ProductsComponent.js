import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../App";
import { useParams, Link, useNavigate } from "react-router-dom"
import { addCart } from "../redux/actions";


export function ProductsComponent() {
    const [categoryName, setCategoryName] = useState();
    const [products, setProducts] = useState([]);
    const [cookies, setCookies, removeCookie] = useCookies();
    const params = useParams();//used to collect Route parameter
    
    let navigate = useNavigate();
    
    const dispatch =useDispatch()

    useEffect(() => {
        if (cookies["username"] == undefined) {
            navigate("/login");
        } else {
            setCategoryName(params.category)

            const options = {
                method: 'GET',
                url: `${BASE_URL}/products/category/${params.category}`
            }

            axios.request(options).then((response) => {
                setProducts([]);
                setProducts(response.data);
            }).catch((err) => {
                console.error(err);
            })
        }

    }, [categoryName])
    return (
        <div>
            <h3>{categoryName} Products</h3>
            <div className="d-flex flex-wrap">
                {
                    products.map((product, index) =>
                        <div className="m-2 p-2" key={index}>

                            <div className="card" style={{ width: "10rem" }}>
                                <Link to={'/details/' + product.id}><img key={product.id} src={product.image} height="100" className="w-100" /></Link>
                                <div className="card-body">
                                    <p className="card-text">${product.price}</p>
                                    <button className="btn btn-primary" onClick={()=>dispatch(addCart(product))}>Add to cart</button>
                                </div>
                            </div>

                        </div>

                    )
                }
            </div>
            <Link to="/categories"><span className="bi bi-chevron-double-left">Back to Categories</span></Link>
        </div>
    )
}