import { useState } from "react"
import { useFormik } from "formik"
import { BASE_URL } from "../App"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { MDBBtn } from "mdb-react-ui-kit";



export function RegisterComponent() {

    const [userMsg, setUserMsg] = useState('');
    const [userColor, setUserColor] = useState('');
    let navigate = useNavigate;


    const formik = useFormik({
        initialValues: {
            UserName: '',
            Password: '',
            Email: '',
            Mobile: ''
        },

        onSubmit: (values) => {
            axios({
                method: "POST",
                url: `${BASE_URL}/registeruser`,
                data: values
            })
                .catch((err) => console.log(err))
            alert("Registered Successfully");
            navigate("/login");
        }

    })

    const checkUserNameAvailability = (e) => {
        console.log(e.target.value);
        axios({
            method: "GET",
            url: `${BASE_URL}/getusers`
        })
            .then((response) => {

                for (var user of response.data) {
                    console.log(user.UserName);
                    if (e.target.value === user.UserName) {
                        setUserMsg('User Name already taken');
                        setUserColor('text-danger');
                        break;
                    } else {
                        setUserMsg('User Name available');
                        setUserColor('text-success');
                    }
                }
            })
    }

    return (
        <div>
            <h2>Register User</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>UserName</dt>
                    <dd>
                        <input
                            type="text"
                            name="UserName"
                            onKeyUp={checkUserNameAvailability}
                            onChange={formik.handleChange}
                            required
                            onInvalid={(e) => e.target.setCustomValidity("User Name is required")}
                            onInput={(e) => e.target.setCustomValidity("")}
                        />
                    </dd>
                    <dd className={userColor} required>{userMsg}</dd>
                    <dt>Password</dt>
                    <dd>
                        <input
                            type="password"
                            name="Password"
                            onChange={formik.handleChange}
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Password is required")}
                            onInput={(e) => e.target.setCustomValidity("")}
                        />
                    </dd>
                    <dt>Email</dt>
                    <dd>
                        <input
                            type="text"
                            name="Email"
                            onChange={formik.handleChange}
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Email is required")}
                            onInput={(e) => e.target.setCustomValidity("")}
                        />
                    </dd>
                    <dt>Mobile</dt>
                    <dd>
                        <input
                            type="text"
                            name="Mobile"
                            onChange={formik.handleChange}
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Mobile is required")}
                            onInput={(e) => e.target.setCustomValidity("")}
                        />
                    </dd>
                </dl>
                <MDBBtn color="primary" type="submit" className="me-2 mb-2">Register</MDBBtn>
                <MDBBtn color="danger" type="reset" className="mb-2">Reset</MDBBtn>
            </form>
            <Link to="/login">Registered User?</Link>
        </div>
    )
}