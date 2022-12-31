import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux";
import { BASE_URL } from "../App";
import axios from "axios";

export function CategoriesComponent() {
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState();
    const [msg, setMsg] = useState();
    const [cookies, setCookies, removeCookie] = useCookies();
    const logincheck = useSelector((state) => state.logStatus.loginStatus)
    let navigate = useNavigate();
    useEffect(() => {
        setUser(cookies["username"]);
        if (cookies.username === undefined && logincheck === false) {
            navigate("/login")
        } else {
            axios.get(`${BASE_URL}/getAllProductsCategory`)
                .then(response => {
                    console.log(response.data)
                    setCategories(response.data);
                    setMsg('Welcome ' + cookies.username);
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }, [])


    return (
        <div>
            <h2>Product Categories | {msg}</h2>
            <ol>
                {
                    categories.map((category, index) => <li key={index}><Link to={'/products/' + category._id}>{category._id.toUpperCase()}</Link></li>)
                }
            </ol>
        </div>
    )
}