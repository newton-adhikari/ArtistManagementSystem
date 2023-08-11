const Artist = () => {
    return (
        <div className="px-3 py-3">
            <div className="d-flex justify-content-center">
                    <h4>Users List</h4>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-success">Add user</button>
            </div>
            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>FullName</th>
                            <th>DOB</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>First Released</th>
                            <th>Albums</th>
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

export default Artist