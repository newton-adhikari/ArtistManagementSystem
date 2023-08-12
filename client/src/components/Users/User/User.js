import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { baseURL } from "../../../service/constants";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
    const [data, setData] = useState(null);
    const [loading, setIsLoading] = useState(true);

    const id = useParams().id;
    const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
    const navigate = useNavigate();

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.get(`${baseURL}/api/user/${id}`, { headers })
             .then(res => {
                setData(res.data);
                setIsLoading(false);
             })
             .catch(err => {
                console.log(err)
             })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.put(`${baseURL}/api/user/update/${id}`, data, { headers })
             .then(res => {
                if(res.data && res.data.message) {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate("/admin/users");
            }
            })
             .catch(err => {
                console.log(err);
             })

    }

    if (loading) return <div>Loading...</div>;

    return (
     <div className='d-flex flex-column align-items-center pt-4'>
        <h2 className="color-white">Update User</h2>
        <div className='p-3 rounded w-50 border'>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input disabled minLength="5" required type="text" className="form-control" id="firstName" placeholder='First Name' autoComplete='off'
                    value={data.firstName}
                    onChange={e => setData({...data, name: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input disabled minLength="5" required type="text" className="form-control" id="lastName" placeholder='Last Name' autoComplete='off'
                    value={data.lastName}
                    onChange={e => setData({...data, lastName: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input disabled type="email" className="form-control" id="inputEmail" placeholder='Enter Email' autoComplete='off'
                    value={data.email}
                    onChange={e => setData({...data, email: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone" placeholder="Enter Phone" autoComplete='off'
                    value={data.phone}
                    onChange={e => setData({...data, phone: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputdob" className="form-label">DOB</label>
                    <input disabled type="date" className="form-control" id="inputdob" placeholder="Enter DOB" autoComplete='off'
                    value={data.dob}
                    onChange={e => setData({...data, dob: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputGender" className="form-label">Gender</label>
                    <select value={data.gender === "m"? "m": (data.gender === "f" ? "f" : "o")} disabled className="form-control" id="inputGender" name="gender" onChange={e => setData({...data, gender: e.target.value})}>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                        <option value="o">Other</option>
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
                    value={data.address}
                    onChange={e => setData({...data, address: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputRole" className="form-label">Role</label>
                    <select value={data.role} className="form-control" id="inputRole" name="role" onChange={e => setData({...data, role: e.target.value})}>
                        <option value="Artist">Artist</option>
                        <option value="Admin">Admin</option>
                        <option value="ArtistManager">ArtistManager</option>
                    </select>
                </div>
                <div className="p-3 col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    </div>

    )
}

export default User;