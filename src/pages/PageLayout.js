import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function PageLayout() {
    return (
        <div className="d-flex flex-column" style={{minHeight: "100vh"}}>
            <NavBar />
                <div className="container my-4">
                    <Outlet />
                </div>
            <Footer />
        </div>
    );
}
