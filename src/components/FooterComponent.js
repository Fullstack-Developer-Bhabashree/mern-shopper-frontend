

export function FooterComponent() {
    return (
        <div className="bg-dark text-white p-4">
            <div className="d-flex flex-column justify-content-center align-items-center text-center ">
                <h3 className="">Want style ideas and Treats?</h3>
                <div className="input-group input-group-lg w-50">
                    <input type="text" placeholder="Enter Email *" className="form-control shadow-none rounded-0 border-0 bg-light" />
                    <button className="btn btn-secondary rounded-0 ms-2">Subscribe</button>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-4 col-12">
                    <ul className="list-unstyled">
                        <li><h3>Shopper.</h3></li>
                        <li><a href="#"><span className="bi bi-facebook"></span></a></li>
                        <li><a href="#"><span className="bi bi-youtube"></span></a></li>
                        <li><a href="#"><span className="bi bi-twitter"></span></a></li>
                        <li><a href="#"><span className="bi bi-instagram"></span></a></li>
                    </ul>
                </div>
                <div className="col-md-2 col-6">
                    <ul className="list-unstyled">
                        <li><h5>SUPPORT</h5></li>
                        <li>Contact Us</li>
                        <li>FAQs</li>
                        <li>Size Guide</li>
                        <li>Shipping & Returns</li>
                    </ul>
                </div>
                <div className="col-md-2 col-6">
                    <ul className="list-unstyled">
                        <li><h5>SHOP</h5></li>
                        <li>Men's Shopping</li>
                        <li>Women's Shopping</li>
                        <li>Electronics</li>
                        <li>Jewellery</li>
                    </ul>
                </div>
                <div className="col-md-2 col-6">
                    <ul className="list-unstyled ">
                        <li><h5>COMPANY</h5></li>
                        <li>Our Story</li>
                        <li>Careers</li>
                        <li>Terms & conditions</li>
                        <li>Privacy & Cookie policy</li>
                    </ul>
                </div>
                <div className="col-md-2 col-6">
                    <ul className="list-unstyled">
                        <li><h5>CONTACT</h5></li>
                        <li>1-202-555-0105</li>
                        <li>1-202-555-0106</li>
                        <li>help@shopper.com</li>
                    </ul>
                </div>
            </div>
        </div>

    )

}