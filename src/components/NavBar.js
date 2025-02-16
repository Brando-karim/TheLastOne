import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { setLanguage, toggleTheme } from "../slices/preferencesSlice";
import languageData from "../data/languages";
import { logout } from "../slices/userSlice";

export default function NavBar() {
    const { theme, language } = useSelector(state => state.preferences);
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();

    const handleLanguageChange = (e) => {
        dispatch(setLanguage(e.target.value));
    };

    return (
        <Navbar expand="xl" sticky="top" bg={theme}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src="logo.png" height="60px" alt="Quick Annonces" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">
                            {languageData.home[language]}
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/vehicule">
                            Vehicule
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/immeuble">
                            Immeubles
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/electronique">
                            Electroniques
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/service">
                            Services
                        </Nav.Link>
                    </Nav>
                    <Nav className="gap-2">
                        <select className="form-select col" value={language}
                                onChange={handleLanguageChange}>
                            <option value="en">English</option>
                            <option value="fr">Francais</option>
                            <option value="es">Espagnol</option>
                        </select>
                        <button className="btn rounded-circle"
                                onClick={() => dispatch(toggleTheme())}>
                            <i className={
                               "bi bi-" + 
                               (theme === "light" ? "moon-fill" : "sun-fill")} 
                               style={{ fontSize: "1.2em" }}></i>
                        </button>
                    </Nav>
                    <Nav>
                        {role ?
                        <>
                            {role === "user" &&
                            <Nav.Link as={NavLink} to="/post">
                                <img src="checkmark-circle.png" alt="" 
                                     className="me-1" />
                                Post Annonce
                            </Nav.Link>}
                            {role === "admin" &&
                            <Nav.Link as={NavLink} to="/dashboard">
                                Dashboard
                            </Nav.Link>}
                            <Nav.Link onClick={() => dispatch(logout())}>
                                {languageData.logout[language]}
                            </Nav.Link>
                        </> :
                        <>
                            <Nav.Link as={NavLink} to="/signup">
                                {languageData.signup[language]}
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/login">
                                {languageData.login[language]}
                            </Nav.Link>
                        </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
