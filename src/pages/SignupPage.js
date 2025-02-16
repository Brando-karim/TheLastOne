import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { authenticate } from "../slices/userSlice";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();

    useEffect(() => {
        if (role)
            navigate("/");
    }, [role, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (email === "admin@example.com") {
            setInvalid(true);
            setPassword("");
        }
        else {
            dispatch(authenticate("user"));
            navigate("/");
        }
    };

    return (
        <div className="signup">
            <div className="image">
                <img src="innnnnnnnnnnnnn.png" width="500px" alt="background" />
            </div>
            <form style={{ marginLeft: "25px" }} onSubmit={handleSubmit}>
                <h2 align="center">Sign up</h2>
                <p align="center"><small>Sign up for free to access to in any of our products</small></p>
                <div className="form-group">
                    <label for="email">Email address</label>
                    <input type="email" id="email" name="email" required 
                           value={email} onChange={(e) => setEmail(e.target.value)} 
                           className={"form-control" + (invalid ? " is-invalid" : "")} />
                    {invalid && 
                    <span className="invalid-feedback">Email already exists.</span>}
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required 
                           value={password} onChange={(e) => setPassword(e.target.value)} 
                           className="form-control" />
                </div>
                <small className="small-text">Use 8 or more characters with a mix of letters, numbers & symbols</small>
                <br />
                <br />
                <div className="form-group">
                    <input type="checkbox" id="terms" name="terms" />
                    <label for="terms">Agree to our <Link>Terms of use</Link> and <Link>Privacy Policy</Link></label>
                </div>
                <div className="form-group">
                    <input type="checkbox" id="newsletter" name="newsletter" />
                    <label for="newsletter">Subscribe to our monthly newsletter</label>
                </div>
                <div className="form-group">
                    <button type="submit">Sign up</button>
                </div>
                <p>Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
            </form>
      </div>
    );
}
