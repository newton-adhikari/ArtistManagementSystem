import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../service/constants";
import "./Login.css";

const Login = () => {
    const [values, setValues] = useState({
        email: {},
        password: {}
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${baseURL}/api/login`, values)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("name", res.data.firstName);
                const role = res.data.role;

                if (role === 'super_admin') navigate(`/admin`);
                else if (role === 'manager') navigate('/manager');
                else if (role === 'artist') navigate('/artist');
            })
            .catch(err => {
                // const {message} = err.response.data;
                // console.log(message);
                // setError(message);
                // setTimeout(() => {
                //     setError("");
                // }, 3000)
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