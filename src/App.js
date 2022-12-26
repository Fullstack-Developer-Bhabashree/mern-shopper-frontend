import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CategoriesComponent } from "./components/CategoriesComponent";
import { DetailsComponent } from "./components/DetailsComponent";
import { FooterComponent } from "./components/FooterComponent";
import { HomeComponent } from "./components/HomeComponent";
import { LoginComponent } from "./components/LoginComponent";
import { NavBarComponent } from "./components/NavBarComponent";
import { ProductsComponent } from "./components/ProductsComponent";
import { ProfileComponent } from "./components/ProfileComponent";
import { RegisterComponent } from "./components/RegisterComponent";
import { CartComponent } from "./components/CartComponent";
import { WishlistComponent } from "./components/WishlistComponent";
import { SearchFeed } from "./components/SearchFeed"
import "./App.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export const BASE_URL = process.env.REACT_APP_SERVER_URL

const App = () => {
    return (
        <div className="container-fluid">
            <BrowserRouter>
                <header>
                    <NavBarComponent />
                    <ToastContainer />
                </header>
                <section>
                    <Routes>
                        <Route path="/home" element={<HomeComponent />} />
                        <Route path="/search/:searchTerm" element={<SearchFeed />} />
                        <Route path="/categories" element={<CategoriesComponent />} />
                        <Route path="/products/:category" element={<ProductsComponent />} />
                        <Route path="/details/:id" element={<DetailsComponent />} />
                        <Route path="/register" element={<RegisterComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/profile" element={<ProfileComponent />} />
                        <Route path="/cart" element={<CartComponent />} />
                        <Route path="/wishlist" element={<WishlistComponent />} />
                        <Route path="/" element={<HomeComponent />} />
                        <Route path="*" element={<h3 className="text-center"><code>page you requested not found</code></h3>} />
                    </Routes>
                </section>
                <FooterComponent />
            </BrowserRouter>
        </div>
    )
}

export default App