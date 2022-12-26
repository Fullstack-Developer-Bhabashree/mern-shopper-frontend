
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../App";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { toast } from "react-toastify";


export function ProfileComponent() {

    const [showMobile, setShowMobile] = useState(false)
    const [showEmail, setShowEmail] = useState(false)
    const [cookies, setCookies, removeCookie] = useCookies();
    const [userdata, setUserdata] = useState([]);
    const logincheck = useSelector((state) => state.logStatus.loginStatus)

    let navigate = useNavigate();

    useEffect(() => {
        if (cookies.username === undefined && logincheck === false) {
            navigate("/login");
        } else {
            getUserProfileData()
        }
    }, [])

    const getUserProfileData = async () => {

        try {
            const userID = atob(cookies["_id"])
            await axios({
                method: 'GET',
                url: `${BASE_URL}/getUserProfileData/${userID}`,
            }).then((response) => {
                setUserdata(response.data)
            })
        } catch (err) {
            console.log(err)
        }
    }



    const handleMobileUpdate = async (e) => {
        e.preventDefault()
        var body = {
            'userID': cookies["_id"],
            'Mobile': e.target.Mobile.value,
        }
        try {
            await axios({
                method: 'PUT',
                url: `${BASE_URL}/updateUserMobile`,
                data: body
            }).then((response) => {
                console.log(response)
                toast.success("Mobile number updated")
                window.location.reload(true)
            })
        } catch (err) {
            console.log(err)
            toast.error("Mobile number was not updated")
        }
    }





    const handleEmailUpdate = async (e) => {
        e.preventDefault()
        var body = {
            'userID': cookies["_id"],
            'Email': e.target.Email.value,
        }
        try {
            await axios({
                method: 'PUT',
                url: `${BASE_URL}/updateUserEmail`,
                data: body
            }).then((response) => {
                console.log(response)
                toast.success("Email updated")
                window.location.reload(true)
            })
        } catch (err) {
            console.log(err)
            toast.error("Email was not updated")
        }
    }

    
    return (
        <div>
            <h2>My Profile</h2>
            {
                userdata && userdata.map((user) => {
                    return (
                        <dl className="row">


                            <dt className="col-3">UserName</dt>
                            <dd className="col-9">{user.UserName}</dd>


                            <dt className="col-3">Email</dt>
                            <dd className="col-3">{user.Email}</dd>

                            <dd className="col-6 ">
                                <MDBBtn
                                    className="bi bi-pen-fill bg-warning  p-1"
                                    onClick={() => setShowEmail(true)}>
                                </MDBBtn>
                            </dd>
                            <Modal show={showEmail} onHide={() => setShowEmail(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Email update</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={(e) => handleEmailUpdate(e)}>
                                        <MDBInput
                                            type='text'
                                            name='Email'
                                            label='Email'
                                            className="mb-4"
                                            reuired
                                            onInvalid={(e) => e.target.setCustomValidity("Email can't be empty")}
                                            onInput={(e) => e.target.setCustomValidity("")}
                                            placeholder='new email'>
                                        </MDBInput>

                                        <MDBBtn
                                            color="danger"
                                            onClick={() => setShowEmail(false)}
                                            type="button"
                                            className="me-2">
                                            Cancel
                                        </MDBBtn>
                                        <MDBBtn
                                            variant="primary"
                                            type="submit"
                                            onClick={() => setShowEmail(false)}>
                                            Save Changes
                                        </MDBBtn>
                                    </form>
                                </Modal.Body>
                            </Modal>



                            <dt className="col-3">Mobile</dt>
                            <dd className="col-3">{user.Mobile}</dd>

                            <dd className="col-6">
                                <MDBBtn
                                    className="bi bi-pen-fill bg-warning  p-1"
                                    onClick={() => setShowMobile(true)}>
                                </MDBBtn>
                            </dd>

                            <Modal show={showMobile} onHide={() => setShowMobile(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Mobile update</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={(e) => handleMobileUpdate(e)}>
                                        <MDBInput
                                            type='text'
                                            name='Mobile'
                                            label='Mobile'
                                            className="mb-4"
                                            required
                                            onInvalid={(e) => e.target.setCustomValidity("mobile number can't be empty")}
                                            onInput={(e) => e.target.setCustomValidity("")}
                                            placeholder='new mobile number'>
                                        </MDBInput>

                                        <MDBBtn
                                            color="danger"
                                            onClick={() => setShowMobile(false)}
                                            type="button"
                                            className="me-2">
                                            Cancel
                                        </MDBBtn>
                                        <MDBBtn
                                            variant="primary"
                                            type="submit"
                                            onClick={() => setShowMobile(false)}>
                                            Save Changes
                                        </MDBBtn>
                                    </form>
                                </Modal.Body>
                            </Modal>


                        </dl>
                    )
                })
            }
        </div>
    )
}