import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import SearchBar from './SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loggedStatus, logoutReset } from '../redux/actions';

import { toast } from 'react-toastify';

export function NavBarComponent() {
    const [cookies, setCookies, removeCookies] = useCookies();
    const [name, setName] = useState();

    let navigate = useNavigate();

    const cartItems = useSelector((state) => state.cartProducts)
    const logincheck = useSelector((state) => state.logStatus.loginStatus)
    const dispatch = useDispatch()

    useEffect(() => {

        setName(cookies.username);

    }, [cookies])

    const handleLogout = () => {
        removeCookies("username");
        removeCookies("_id")
        dispatch(loggedStatus('logout'))
        dispatch(logoutReset())
        navigate("/login");
        toast.error("You are now logged out")
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand style={{ fontSize: '25px', fontWeight: 'bold' }}>
                    <Link to="/">
                        <img src='images/Shopping-Logo.png' style={{ width: '64px', height: '64px' }} alt='brand-logo' />
                    </Link>
                    &nbsp;Shopper

                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to="/home">Home</Link></Nav.Link>
                        <Nav.Link><Link to="/categories">Categories</Link></Nav.Link>
                        <Nav.Link><Link to="/register">Register</Link></Nav.Link>
                        <Nav.Link>

                            {
                                (logincheck) ? (<Button onClick={handleLogout} variant='danger'>Logout</Button>)
                                    :
                                    (<Button variant='primary' onClick={() => navigate('/login')}>Login</Button>)
                            }

                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <SearchBar />
                        <NavDropdown id="basic-nav-dropdown" title={name} className="mx-4">
                            <NavDropdown.Item >
                                <Link to="/profile">
                                    <Button variant='secondary' size="lg">My Profile</Button>
                                </Link>
                            </NavDropdown.Item>

                            <NavDropdown.Divider />

                            <NavDropdown.Item>
                                {
                                    (logincheck) ? (<Button onClick={handleLogout} variant='danger' size='lg'>Logout</Button>)
                                        :
                                        (<Button variant='primary' onClick={() => navigate('/login')} size='lg'>Login</Button>)
                                }

                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link title='Your wishlist'><Link to={(logincheck)?"/wishlist":"/login"} ><span className='bi bi-heart me-4 fs-5'></span></Link></Nav.Link>

                        <Nav.Link title='Your cart'><Link to={(logincheck)?"/cart":"/login"}><span className='bi bi-cart3 fs-5 position-relative'>
                            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{cartItems.numberCart}</span>
                        </span></Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

