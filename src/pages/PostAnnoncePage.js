import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAnnonce } from "../slices/annoncesSlice";

export default function PostAnnoncePage() {
    const navigate = useNavigate();
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();

    const [titre, setTitre] = useState("");
    const [prix, setPrix] = useState("");
    const [ville, setVille] = useState("Tanger");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (role !== "user")
            navigate("/login");
    }, [role, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({titre, prix, ville, description, image});
        dispatch(addAnnonce({ titre, prix, ville, description, image }));
    };

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '90%',
            margin: '0 auto',
            fontFamily: 'Arial, sans-serif',
            backgroundImage: 'url("Deposer Annonce.jpg")', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat', 
            color: '#fff', 
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '30px'
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '20px',
            color: '#4CAF50'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
        },
        label: {
            fontSize: '14px',
            color: '#666'
        },
        input: {
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px',
            width: '100%'
        },
        button: {
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '12px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            width: 'fit-content'
        },
        imageButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: 'white',
            cursor: 'pointer',
            width: 'fit-content', 
            color: '#000'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        <i className="bi bi-arrow-left" style={{ fontSize: '24px', color: '#4CAF50' }}></i>
                    </button>
                </div>
            </div>
            <h1 align='center' style={{ color: 'black' }}>Deposer Votre Annonces</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                {/* Input with Icon */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Entrer Le Titre D'annonce:</label>
                    <div className="input-group" style={{ width: '100%' }}>
                        <span className="input-group-text" style={{ borderRight: 'none' }}>
                            <i className="bi bi-pencil"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Titre de l'annonce"
                            style={{ borderLeft: 'none' }}
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                        />
                    </div>
                </div>

                {/* Input with Icon */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Entrer Le Prix:</label>
                    <div className="input-group" style={{ width: '100%' }}>
                        <span className="input-group-text" style={{ borderRight: 'none' }}>
                            <i className="bi bi-currency-euro"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Prix"
                            style={{ borderLeft: 'none' }}
                            value={prix}
                            onChange={(e) => setPrix(e.target.value)}
                        />
                    </div>
                </div>

                {/* Input with Icon */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Entrer Nom De Ville:</label>
                    <div className="input-group" style={{ width: '100%' }}>
                        <span className="input-group-text" style={{ borderRight: 'none' }}>
                            <i className="bi bi-geo-alt"></i>
                        </span>
                        <select
                            className="form-select"
                            style={{ borderLeft: 'none' }}
                            value={ville}
                            onChange={(e) => setVille(e.target.value)}
                        >
                            <option value="Tanger">Tanger</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Tetouan">Tetouan</option> 
                            <option value="Fes">Fes</option>
                        </select>
                    </div>
                </div>

                {/* Textarea with Icon */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Description:</label>
                    <div className="input-group" style={{ width: '100%' }}>
                        <span className="input-group-text" style={{ borderRight: 'none' }}>
                            <i className="bi bi-textarea-t"></i>
                        </span>
                        <textarea
                            className="form-control"
                            placeholder="Description de l'annonce"
                            style={{ borderLeft: 'none', minHeight: '100px' }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* Input with Icon */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Entrer Votre Numero Tel:</label>
                    <div className="input-group" style={{ width: '100%' }}>
                        <span className="input-group-text" style={{ borderRight: 'none' }}>
                            <i className="bi bi-telephone"></i>
                        </span>
                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Numéro de téléphone"
                            style={{ borderLeft: 'none' }}
                        />
                    </div>
                </div>

                {/* Image Button */}
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Saisir image:</label>
                    <div className="input-group" style={{ width: '100%' }}>
                        <span className="input-group-text" style={{ borderRight: 'none' }}>
                            <i className="bi bi-camera"></i>
                        </span>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" style={styles.button}>
                    <i className="bi bi-check-circle"></i> Creez Announce
                </button>
            </form>
        </div>
    );
}
