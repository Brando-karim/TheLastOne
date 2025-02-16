import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshAnnoncesList } from "../slices/annoncesSlice";
import AnnonceItem from "./AnnonceItem";

export default function AnnoncesList() {
    const dispatch = useDispatch();
    const { annonces, loading, error } = useSelector(state => state.annonces);
    
    useEffect(() => {
        dispatch(refreshAnnoncesList());
    }, [dispatch]);
    
    if (loading) {
        return (
            <div className="text-center text-muted">
                Loading...
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="text-center text-muted">
                Failed to load annonces.
            </div>
        );
    }
    
    if (annonces.length === 0) {
        return (
            <div className="text-center text-muted">
                No annonces found (Because We Can't Host An API Without Paying ).
            </div>
        );
    }

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 gy-4 py-3">
            {annonces.map(annonce => (
                <AnnonceItem annonce={annonce} key={annonce.id} />
            ))}
        </div>
    );
}
