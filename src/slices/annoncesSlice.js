import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = "http://localhost:8000";

export const refreshAnnoncesList = createAsyncThunk(
    "annonces/refreshAnnoncesList", 
    async (arg, thunkAPI) => {
        try {
            const { categorie, titre, sousCategorie, ville } = thunkAPI.getState().annonces;
            const response = await axios.get(SERVER_URL + "/api/filter", {
                params: { categorie, titre, sousCategorie, ville }
            });
            return response.data;
        } catch (error) {
            console.error("API error: " + error);
            throw error;
        }
    }
);

export const deleteAnnonce = createAsyncThunk(
    "annonces/deleteAnnonce", 
    async (id) => {
        try {
            const response = await axios.delete(SERVER_URL + "/api/articles/" + id)
            return response.data;
        } catch (error) {
            console.error("API error: " + error)
            throw error;
        }
    }
);

export const addAnnonce = createAsyncThunk(
    "annonces/addAnnonce", 
    async (inputs) => {
        try {
            console.log(inputs);
            const formData = new FormData();
            formData.append('titre', inputs.titre);
            formData.append('description', inputs.description);
            formData.append('date', new Date().toISOString().split('T')[0]);
            formData.append('ville', inputs.ville);
            formData.append('prix', inputs.prix);
            if (inputs.image)
                formData.append('image', inputs.image);
            formData.append('categorie', "vehicule");
            formData.append('sous_categorie', "voiture");
            console.log(formData);
            const response = await axios.post(SERVER_URL + "/api/articles", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error("API error: " + error);
            throw error;
        }
    }
);

const annoncesSlice = createSlice({
    name: "annonces", 
    initialState: {
        annonces: [], 
        loading: false, 
        error: null, 
        categorie: "", 
        titre: "", 
        sousCategorie: "", 
        ville: ""
    }, 
    reducers: {
        setAnnoncesCategorie: (state, action) => {
            state.categorie = action.payload;
        }, 
        setAnnoncesTitre: (state, action) => {
            state.titre = action.payload;
        }, 
        setAnnoncesSousCategorie: (state, action) => {
            state.sousCategorie = action.payload;
        }, 
        setAnnoncesVille: (state, action) => {
            state.ville = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshAnnoncesList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshAnnoncesList.fulfilled, (state, action) => {
                state.loading = false;
                state.annonces = action.payload.map(
                    annonce => {
                        annonce.image = SERVER_URL + "/img/" + annonce.image;
                        return annonce;
                    }
                );
            })
            .addCase(refreshAnnoncesList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch annonces";
            })
            .addCase(deleteAnnonce.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(addAnnonce.fulfilled, (state, action) => {
                console.log(action.payload.message);
            });
    }
});

export const {
    setAnnoncesCategorie, setAnnoncesTitre, setAnnoncesSousCategorie, 
    setAnnoncesVille
} = annoncesSlice.actions;
export default annoncesSlice.reducer;
