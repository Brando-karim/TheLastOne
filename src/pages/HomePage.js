import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
    setAnnoncesCategorie, setAnnoncesTitre, setAnnoncesSousCategorie, 
    setAnnoncesVille, refreshAnnoncesList
} from "../slices/annoncesSlice";
import AnnoncesList from "../components/AnnoncesList";
import AnnonceSearch from "../components/AnnonceSearch";

export default function HomePage() {
    const dispatch = useDispatch();
    const { category } = useParams();
    useEffect(() => {
        dispatch(setAnnoncesCategorie(category));
        dispatch(setAnnoncesTitre(""));
        dispatch(setAnnoncesSousCategorie(""));
        dispatch(setAnnoncesVille(""));
        dispatch(refreshAnnoncesList());
    }, [category, dispatch]);
    
    return (
        <>
            <AnnonceSearch />
            <AnnoncesList />
        </>
    );
}
