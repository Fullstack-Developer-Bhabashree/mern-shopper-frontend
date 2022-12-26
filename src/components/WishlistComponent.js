import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../redux/actions';
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function WishlistComponent() {

  const [cookies, setCookies, removeCookie] = useCookies();
  const [wishlist, setWishlist] = useState([])
  const [products, setProducts] = useState([])
  const [value, setValue] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userID = atob(cookies["_id"])
  const logincheck = useSelector((state) => state.logStatus.loginStatus)

  const loadWishlist = async () => {
    const options = {
      method: 'GET',
      url: `${BASE_URL}/getUserWishlist/${userID}`
    }

    await axios.request(options).then((response) => {
      setWishlist(response.data);
    }).catch((err) => {
      console.error(err);
    })
  }


  useEffect(() => {
    if (cookies.username === undefined && logincheck === false) {
      navigate("/login")
    } else {
      loadWishlist()
    }
  }, [])

  var wishCart = []
  for (var i = 0; i < wishlist.length; i++) {
    for (var j = 0; j < wishlist[i].wishlist.length; j++) {
      wishCart.push(wishlist[i].wishlist[j])
    }
  }

  const removeWishProduct = async (id) => {
    const options = {
      method: 'PUT',
      url: `${BASE_URL}/removeFromWishlist/${id}/${userID}`
    }

    await axios.request(options).then((response) => {
      console.log(response)
      toast.error("Removed item from the wishlist")
      window.location.reload(true)
    }).catch((err) => {
      console.error(err);
    })
  }


  return (
    <>
      {
        wishCart.length === 0 && (
          <>
            <h2 className="fs-3">You have not added any items to the wishlist. Search our products to add to the wishlist</h2>
          </>
        )
      }
      {
        wishCart.length > 0 && (
          <MDBTable align='middle'>
            <MDBTableHead>
              <tr>
                <th scope='col'>ProductName</th>
                <th scope='col'>Product Category</th>
                <th scope='col'>Product Price</th>
                <th scope='col'>Add to Cart</th>
                <th scope='col'>Remove from Wishlist</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>

              {
                wishCart.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <img
                            src={item.image}
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                          />
                          <div className='ms-3'>
                            <p className='fw-bold mb-1'>{item.title}</p>
                            <p className='text-muted mb-0'>Product_ID: {item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className='fw-normal mb-1'>Category: {item.category}</p>
                        <p className='text-muted mb-0'>{item.description}</p>
                      </td>
                      <td>
                        <MDBBadge color='success' pill>
                          ${item.price}
                        </MDBBadge>
                      </td>
                      <td>
                        <MDBBtn color='link' rounded size='sm' onClick={() => dispatch(addCart(item))}>
                          ADD
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn color='link' rounded size='sm' onClick={() => removeWishProduct(item.id)}>
                          REMOVE
                        </MDBBtn>
                      </td>
                    </tr>
                  )
                })
              }

            </MDBTableBody>
          </MDBTable>
        )
      }
    </>
  );
}