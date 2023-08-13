import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../service/constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

const Login = () => {
    const [values, setValues] = useState({
        email: {},
        password: {}
    });

    const setUserRole = JSON.parse(JSON.stringify(localStorage.getItem("role")));

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getCurrentTime = () => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return time;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${baseURL}/api/login`, values)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name", res.data.firstName);
                localStorage.setItem("loginTime", getCurrentTime());

                let role = res.data.role;
                if (role === "artist_manager") role = "manager";
                localStorage.setItem("role", role);

                if (role === 'super_admin' || role === "admin") navigate(`/admin`);
                else navigate(`/${role}`);
            })
            .catch(err => {
                if(err.response && err.response.status === 401 && err.response.data.message) {
                    toast.error(err.response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    return;
                }
                else if (err.response && err.response.status === 500) {
                    toast.error("Service Offline", {
                        position: "top-right",
                        autoClose: 3000,
                    }); 
                    return;
                }
                toast.error("Error Occured!!", {
                    position: "top-right",
                    autoClose: 3000,
                });   
            })
    }
    
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <div className="text-danger">
                    {error && error}
                </div>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                        onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                        onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
                    <hr />
                    <Link to="/signUp" className='btn btn-success w-100 rounded-0'>Sign Up</Link>
                </form>
            </div>
        </div>

    )
}

export default Login;