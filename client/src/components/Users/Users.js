import { useNavigate } from "react-router-dom";

const Users = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/admin/createNewUser");
    }
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
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;