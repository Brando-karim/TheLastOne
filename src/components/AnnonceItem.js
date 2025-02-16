import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import languageData from "../data/languages";
import { deleteAnnonce, refreshAnnoncesList } from "../slices/annoncesSlice";

export default function AnnonceItem({ annonce }) {
    const language = useSelector(state => state.preferences.language);
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteAnnonce(annonce.id))
            .then(() => dispatch(refreshAnnoncesList()));
    };

    return (
        <div className="col">
            <div className="card h-100 shadow rounded-4" style={{ overflow: "hidden" }}>
                <img src={annonce.image} className="card-img-top object-fit-cover" height="220px" alt="Annonce" />
                <div className="card-body pb-0">
                    <div className="d-flex justify-content-between align-items-start">
                        <span className="h5">{annonce.titre}</span>
                        <span className="text-secondary">{annonce.date}</span>
                    </div>
                </div>
                <div className="card-footer border-top-0 bg-transparent">
                    <div className="d-flex justify-content-between align-items-end">
                        <span className="h5 fw-bold" style={{ color: "#4CAF50" }}>{annonce.prix} {languageData.currency[language]}</span>
                        <div>
                            <Link to="/message" className="btn btn-success border-0 rounded-circle p-2 me-1" style={{ backgroundColor: "#4CAF50" }}>
                                <img src="chat_message.png" width="30px" height="30px" alt="Message Icon" />
                            </Link>
                            {/* Hadi Dyal Details*/}
                            <Link to={`/product/${annonce.id}`} className="text-decoration-none">
                                    <span className="h5">{annonce.titre}</span>
                            </Link>
                            {role === "admin" &&
                            <button className="btn btn-danger border-0 rounded-circle"
                                    onClick={handleDelete}>
                                <i className="bi bi-trash3-fill" style={{ fontSize: "1.4em" }}></i>
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
