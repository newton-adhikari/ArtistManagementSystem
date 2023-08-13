import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../service/constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddArtist = () => {
    const [data, setData] = useState({
        name: "",
        dob: "",
        gender: "m",
        address: "",
        firstReleased: "08/12/2023",
        albums: 0,
    })

    const userRole = JSON.parse(JSON.stringify(localStorage.getItem("role")));

    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.post(`${baseURL}/api/artist/create`, data, { headers })
             .then(res => {
                // create a react toaster for created
                toast.success("Artist Created!", {
                    position: "top-right",
                    autoClose: 3000,
                });
               
                navigate(`/${userRole}/artists`);
            })
             .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(`${err.response.data.message}`, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
             })
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
        <h2 className="color-white">Add New</h2>
        <div className='p-3 rounded w-50 border'>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input minLength="5" required type="text" className="form-control" id="fullName" placeholder='Full Name' autoComplete='off'
                    onChange={e => setData({...data, name: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputdob" className="form-label">DOB</label>
                    <input type="date" className="form-control" id="inputdob" placeholder="Enter DOB" autoComplete='off'
                    onChange={e => setData({...data, dob: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputGender" className="form-label">Gender</label>
                    <select className="form-control" id="inputGender" name="gender" onChange={e => setData({...data, gender: e.target.value})}>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                        <option value="o">Other</option>
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
                    onChange={e => setData({...data, address: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="firstReleased" className="form-label">First Released</label>
                    <input type="text" className="form-control" id="firstReleased" placeholder="First Released" autoComplete='off'
                    onChange={e => setData({...data, firstReleased: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="albums" className="form-label">Albums</label>
                    <input type="number" className="form-control" id="albums" placeholder="No of Albums" autoComplete='off'
                    onChange={e => setData({...data, albums: e.target.value})}/>
                </div>
                <div className="p-3 col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default AddArtist;