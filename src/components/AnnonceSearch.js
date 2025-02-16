import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setAnnoncesTitre, setAnnoncesSousCategorie, setAnnoncesVille, 
    refreshAnnoncesList
} from "../slices/annoncesSlice";
import categoriesData from "../data/categories";

export default function AnnonceSearch() {
    const [titre, setTitre] = useState("");
    const [sousCategorie, setSousCategorie] = useState("");
    const [ville, setVille] = useState("");
    const { categorie } = useSelector(state => state.annonces);
    const dispatch = useDispatch();

    useEffect(() => {
        setTitre("");
        setSousCategorie("");
        setVille("");
    }, [categorie]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setAnnoncesTitre(titre));
        dispatch(setAnnoncesSousCategorie(sousCategorie));
        dispatch(setAnnoncesVille(ville));
        dispatch(refreshAnnoncesList());
    };
    
    const handleTitreChange = (e) => {
        setTitre(e.target.value);
    };
    
    const handleSousCategorieChange = (e) => {
        setSousCategorie(e.target.value);
    };
    
    const handleVilleChange = (e) => {
        setVille(e.target.value);
    };

    return (
        <form className="row row-cols-auto align-items-center justify-content-center py-3 gy-2"
              onSubmit={handleSubmit}>
            <div className="col">
                <input type="text" placeholder="Rechercher" value={titre} 
                       onChange={handleTitreChange} 
                       className="form-control rounded-pill px-4 py-2" />
            </div>
            {categorie && 
            <div className="col">
                <select className="form-select" value={sousCategorie} 
                        onChange={handleSousCategorieChange}>
                    <option value="">Toute Les Sous-Categories</option>
                    {categoriesData[categorie].map((sousCategory, index) => (
                        <option value={sousCategory} key={index}>
                            {sousCategory.toUpperCase()[0] + sousCategory.substring(1)}
                        </option>
                    ))}
                </select>
            </div>}
            <div className="col">
                <select className="form-select" value={ville}
                        onChange={handleVilleChange}>
                    <option value="">Toute Les Villes</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Casablanca">Casablanca</option>
                    <option value="Tetouan">Tetouan</option> 
                    <option value="Fes">Fes</option>
                </select>
            </div>
            <div className="col">
                <input type="submit" value="Rechercher" 
                        className="btn btn-success fw-bold border-0 rounded-pill px-4 py-2" 
                        style={{ backgroundColor: "#4CAF50" }} />
            </div>
        </form>
    );
}
