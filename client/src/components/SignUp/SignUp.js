import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../service/constants";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SignUp.css";

const SignUp = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
    })

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post(`${baseURL}/api/signup`, data)
             .then(res => {
                // forward the user to the login
                toast.error("login with your credentials", {
                    position: "top-right",
                    autoClose: 3000,
                });

                navigate("/");
             })
             .catch(err => {
                if(err.response && err.response.status === 401 && err.response.data.message) {
                    toast.error(err.response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                    })
                };
             })
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4 signUpPage'>
			<h2 className="color-white">Add New</h2>
            <div className='p-3 rounded w-50 border loginForm'>
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input minLength="5" required type="text" className="form-control" id="firstName" placeholder='First Name' autoComplete='off'
                        onChange={e => setData({...data, firstName: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input minLength="5" required type="text" className="form-control" id="lastName" placeholder='Last Name' autoComplete='off'
                        onChange={e => setData({...data, lastName: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder='Enter Email' autoComplete='off'
                        onChange={e => setData({...data, email: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputPassword4" className="form-label">Password</label>
                        <input minLength="5" required type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
                            onChange={e => setData({...data, password: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputPhone" className="form-label">Phone</label>
                        <input type="text" className="form-control" id="inputPhone" placeholder="Enter Phone" autoComplete='off'
                        onChange={e => setData({...data, phone: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputdob" className="form-label">DOB</label>
                        <input type="date" className="form-control" id="inputdob" placeholder="Enter DOB" autoComplete='off'
                        onChange={e => setData({...data, dob: e.target.value})}/>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputGender" className="form-label">Gender</label>
                        <select className="form-control" id="inputGender" name="gender" onChange={e => setData({...data, gender: e.target.value})}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
                        onChange={e => setData({...data, address: e.target.value})}/>
                    </div>
                    <div className="p-3 col-12 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default SignUp;