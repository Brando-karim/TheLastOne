import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import languageData from "../data/languages";
import { deleteAnnonce, refreshAnnoncesList } from "../slices/annoncesSlice";

export default function ProductDetailPage() {
    const { id } = useParams();
    const language = useSelector(state => state.preferences.language);
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    const annonces = useSelector(state => state.annonces.list);
    const annonce = annonces.find(item => item.id.toString() === id);
    
    if (!annonce) {
        return (
            <div className="container mt-5 text-center">
                <h2>Product not found</h2>
                <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
            </div>
        );
    }
    
    const handleDelete = () => {
        dispatch(deleteAnnonce(annonce.id))
            .then(() => {
                dispatch(refreshAnnoncesList());
                navigate('/');
            });
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img 
                        src={annonce.image} 
                        className="img-fluid rounded-4 shadow" 
                        alt={annonce.titre} 
                        style={{ objectFit: "cover", height: "400px", width: "100%" }}
                    />
                </div>
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <h2 className="card-title">{annonce.titre}</h2>
                                <span className="text-secondary">{annonce.date}</span>
                            </div>
                            <h3 className="fw-bold mb-4" style={{ color: "#4CAF50" }}>
                                {annonce.prix} {languageData.currency[language]}
                            </h3>
                            
                            {/* Product description A Omar*/}
                            {annonce.description && (
                                <div className="mb-4">
                                    <h4>Description</h4>
                                    <p>{annonce.description}</p>
                                </div>
                            )}
                            
                            {/* Additional details */}
                            {annonce.details && (
                                <div className="mb-4">
                                    <h4>Details</h4>
                                    <ul className="list-group list-group-flush">
                                        {Object.entries(annonce.details).map(([key, value]) => (
                                            <li key={key} className="list-group-item bg-transparent px-0">
                                                <strong>{key}:</strong> {value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                <Link to="/" className="btn btn-outline-secondary">
                                    Back to Listings
                                </Link>
                                <div>
                                    <Link 
                                        to="/message" 
                                        className="btn btn-success border-0 rounded-circle p-2 me-2" 
                                        style={{ backgroundColor: "#4CAF50" }}
                                    >
                                        <img src="/chat_message.png" width="30px" height="30px" alt="Message Icon" />
                                    </Link>
                                    {role === "admin" && (
                                        <button 
                                            className="btn btn-danger border-0 rounded-circle"
                                            onClick={handleDelete}
                                        >
                                            <i className="bi bi-trash3-fill" style={{ fontSize: "1.4em" }}></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}