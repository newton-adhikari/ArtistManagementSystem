import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../service/constants";

const Users = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState(null);

    useEffect(() => {
        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.get(`${baseURL}/api/user/all`, { headers })
             .then(res => {
                setUsers(res.data);
             })
             .catch(err => {
                console.log(err)
             })
    }, [])

    const handleClick = () => {
        navigate("/admin/createNewUser");
    }

    if (!users) return <h1>Loading .....</h1>

    return (
        <div className="px-3 py-3">
            <div className="d-flex justify-content-center">
                    <h4>Users List</h4>
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={handleClick} className="btn btn-success">Add user</button>
            </div>
            <div className="mt-3">
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
                        {users.map(u => { // pagination
                            return <tr key={u.id}>
                                <td>{u.fullName}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.dob}</td>
                                <td>{u.gender === "m" ? "Male" : (u.gender === "" ? "NA" : "Female")}</td>
                                <td>{u.address}</td>
                                <td className="d-flex">
                                    <Link to={`admin/users/${u.id}`} className="btn btn-sm btn-primary">Edit</Link>
                                    <button className="btn btn-sm btn-danger">delete</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;