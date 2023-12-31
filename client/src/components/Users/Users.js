import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../service/constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Users = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(users.length/itemsPerPage);
    const currentIndex = (currentPage -1) * itemsPerPage;
    const uptoIndex = currentIndex + itemsPerPage;

    useEffect(() => {
        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
        const headers = {
            Authorization: `Bearer ${token}`
        }

        const endpoint = `${baseURL}/api/user/all`;

        axios.get(endpoint, { headers })
             .then(res => {
                setUsers(res.data);
                setIsLoading(false);
             })
             .catch(err => {
                console.log(err);
             })
    }, [])

    const handleClick = () => {
        navigate("/admin/createNewUser");
    }

    const handleDelete = id => {
        let del = window.confirm("Are you sure?");

        if (!del) return;

        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.delete(`${baseURL}/api/user/delete/${id}`, { headers })
             .then(res => {
                if (res.data && res.data.message) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                 }
                setUsers(users.filter(u => u.id !== id));
             })
             .catch(err => {
                console.log(err)
             })
    }

    const loadedComponent = () => 
        (<div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.slice(currentIndex, uptoIndex).map(u => { // pagination
                            const route = `/admin/user/${u.id}`;
                            return <tr key={u.id}>
                                <td>{u.fullName}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.dob}</td>
                                <td>{u.gender === "m" ? "Male" : (u.gender === "" ? "NA" : "Female")}</td>
                                <td>{u.address}</td>
                                <td className="d-flex">
                                    <Link to={route} className="btn btn-sm btn-primary">Edit</Link>
                                    <button onClick={() => handleDelete(u.id)} className="btn btn-sm btn-danger">delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className="color-white d-flex justify-content-start align-items-center border-bottom border-info">
                    {Array.from({length: totalPages}, (_, i) => {
                        return <div key={i} className="m-3">
                                <button 
                                    className="btn btn-info btn-sm"
                                    onClick={() => setCurrentPage(i+1)}
                                    disabled={currentPage === i + 1}
                                >{i+1}</button>
                            </div>
                    })}
                </div>

            </div>
    );

    return (
        <div className="px-3 py-3">
            <div className="d-flex justify-content-center">
                    <h4>Users List</h4>
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={handleClick} className="btn btn-success">Add user</button>
            </div>
            {
                isLoading ? <div className="d-flex b-shadow justfiy-content-center">Loading....</div>: loadedComponent()
            }
        </div>
    )
}

export default Users;