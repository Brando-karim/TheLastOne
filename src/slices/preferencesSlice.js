import { createSlice } from "@reduxjs/toolkit";

const preferencesSlice = createSlice({
    name: "preferences", 
    initialState: {
        theme: "light", 
        language: "en"
    }, 
    reducers: {
        toggleTheme: (state) => {
            if (state.theme === "light") {
                state.theme = "dark";
                document.documentElement.setAttribute("data-bs-theme", "dark");
            }
            else {
                state.theme = "light";
                document.documentElement.setAttribute("data-bs-theme", "light");
            }
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
});

export const { toggleTheme, setLanguage } = preferencesSlice.actions;
export default preferencesSlice.reducer;
