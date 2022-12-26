import { useFormik } from "formik"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux"
import { loggedStatus } from "../redux/actions"
import { toast } from "react-toastify"
import { MDBBtn } from "mdb-react-ui-kit"
import { BASE_URL } from "../App"


export function LoginComponent() {

    let navigate = useNavigate();
    const [cookieUserID, setCookieUserID, removeCookieUserID] = useCookies();
    const [cookieUserName, setCookieUserName, removeCookieUserName] = useCookies();
    const [cookieEmail, setCookieEmail, removeCookieEmail] = useCookies();
    const [cookieMobile, setCookieMobile, removeCookieMobile] = useCookies();
    const [loginErrorMsg, setLoginErrorMsg] = useState('');

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: ''
        },
        onSubmit: (values) => {
            axios({
                method: 'GET',
                url: `${BASE_URL}/getusers`
            })
                .then(response => {
                    for (var user of response.data) {
                        if (user.UserName === values.UserName && user.Password === values.Password) {
                            setCookieUserID('_id', user._id)
                            setCookieUserName('username', user.UserName);
                            dispatch(loggedStatus('login'))
                            toast.success("Your are now logged in")
                            navigate("/categories");
                        }
                        else {
                            setLoginErrorMsg('Invalid User Name/ password');
                        }
                    }
                })
        }
    })


    return (
        <div>
            <h2>Login User</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>UserName</dt>
                    <dd><input type="text" name="UserName" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} /></dd>
                </dl>
                <div>{loginErrorMsg}</div>
                <MDBBtn color="primary" className="me-2 mb-2" type="submit">Login</MDBBtn>
                <MDBBtn color="danger" className="mb-2" type="reset">Reset</MDBBtn>
            </form>
            <Link to="/register">New User?</Link>
        </div>
    )
}