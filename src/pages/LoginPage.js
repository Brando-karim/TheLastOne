import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "./LoginPage.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../slices/userSlice";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    const theme = useSelector(state => state.preferences.theme);
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();

    useEffect(() => {
        if (role)
            navigate("/");
    }, [role, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "admin@example.com") {
            if (password === "adminpass1234") {
                dispatch(authenticate("admin"));
                navigate("/");
            }
            else {
                setInvalid(true);
                setPassword("");
            }
        }
        else {
            dispatch(authenticate("user"));
            navigate("/");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="login-page">
                <div className={"login-container bg-" + theme}>
                    <div className="login-box">
                        <div className="logo">
                            <img src="logo.png" alt="Quick Annonces" />
                        </div>
                        <h2>Log in</h2>
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                        <div className="social-login">
                            <button className="social-btn facebook-btn"> 
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                                    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                                    <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                </svg>
                            </button>
                            <button className="social-btn google-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg> 
                            </button>
                        </div>
                        <div className="divider">
                            <span>OR</span>
                        </div>
                        <form className="form-group" onSubmit={handleSubmit}>
                            <input type="email" placeholder="Your email" required 
                                   value={email} onChange={(e) => setEmail(e.target.value)} 
                                   className="form-control mb-2" /><br />
                            <input type="password" placeholder="Your password" required 
                                   value={password} onChange={(e) => setPassword(e.target.value)} 
                                   className={"form-control" + (invalid ? " is-invalid" : "")} /><br />
                            {invalid &&
                            <span className="invalid-feedback">Incorrect password!</span>}

                            <Link className="forgot-password">Forgot your password?</Link>
                            <button type="submit" className="login-btn">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
