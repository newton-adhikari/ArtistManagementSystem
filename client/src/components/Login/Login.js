import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../service/constants";
import "./Login.css";

const Login = () => {
    const [values, setValues] = useState({
        email: {},
        password: {}
    });

    const [error, setError] = useState("");
    // const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${baseURL}/api/login`, values)
            .then(res => {
                // if(res.data.status === "Record not found") {
                //     setError(res.data.message) 
                //     setTimeout(() => {
                //         setError("");
                //     }, 3000);
                // }
                // else if (res.data.status = "Success") navigate("/");
                console.log(res);
            })
            .catch(err => {
                console.log(err.response);
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
            </form>
        </div>
    </div>

    )
}

export default Login;