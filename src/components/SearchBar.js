import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); 
    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate(`/search/${searchTerm}`);
        setSearchTerm('');
    }

    return (
        <div className="me-4">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input className="form-control " type="text" placeholder="Search" aria-label="Search" value={searchTerm} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                    <button className="btn text-white" style={{ background: "linear-gradient(90deg, rgba(42,24,104,1) 0%, rgba(214,66,66,1) 48%, rgba(197,29,253,1) 100%)" }}>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;