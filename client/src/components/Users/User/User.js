import { useState, useEffect } from "react";

const User = () => {
    const [data, setData] = useState({
        name: "ADK",
        comp: "Javra",
        DOB: "3 sept",
        emai: "adk@gjasfk.com",
        address: "manmaiju ktm"
    })

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        // <div className="d-flex mt-5 justify-content-center align-items-center">
        //     <div className="card w-75" style={{ width: '18rem' }}>
        //         <div className="card-header">
        //         Featured
        //         </div>
        //         <ul className="list-group list-group-flush">
        //         <li className="list-group-item">Cras justo odio</li>
        //         <li className="list-group-item">Dapibus ac facilisis in</li>
        //         <li className="list-group-item">Vestibulum at eros</li>
        //         </ul>
        //     </div>
        // </div>
        <div className='d-flex flex-column align-items-center pt-4'>
        <h2 className="color-white">Update User</h2>
        <div className='p-3 rounded w-50 border'>
            <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input minLength="5" required type="text" className="form-control" id="firstName" placeholder='First Name' autoComplete='off'
                    value={data.name}
                    onChange={e => setData({...data, name: e.target.value})}/>
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
                    <label htmlFor="inputRole" className="form-label">Role</label>
                    <select className="form-control" id="inputRole" name="role" onChange={e => setData({...data, role: e.target.value})}>
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