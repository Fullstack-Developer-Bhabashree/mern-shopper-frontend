import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useSelector } from "react-redux";

export function CategoriesComponent() {
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState();
    const [msg, setMsg] = useState();
    const [cookies, setCookies, removeCookie] = useCookies();
    const logincheck = useSelector((state)=>state.logStatus.loginStatus)
    let navigate = useNavigate();
    useEffect(() => {
        setUser(cookies["username"]);
        if (cookies.username === undefined && logincheck === false) {
            navigate("/login")
        } else {
            fetch('https://fakestoreapi.com/products/categories')
                .then(response => response.json())
                .then(data => {
                    setCategories(data);
                    setMsg('Welcome '+cookies.username);
                })
        }

    }, [])

   
    return (
        <div>
            <h2>Product Categories | {msg}</h2>
            <ol>
                {
                    categories.map(category => <li key={category}><Link to={'/products/' + category}>{category.toUpperCase()}</Link></li>)
                }
            </ol>
        </div>
    )
}