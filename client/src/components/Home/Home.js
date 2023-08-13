import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../service/constants";

const Home = () => {
    const [totalRecords, setTotalRecords] = useState(null);
    const [loginTime, setLoginTime] = useState();

    useEffect(() => {
        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
        const tlogin = JSON.parse(JSON.stringify(localStorage.getItem("loginTime")));

        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.get(`${baseURL}/api/count`, { headers })
             .then(res => {
                setTotalRecords(res.data);
                setLoginTime(tlogin);
             })
             .catch(err => {
                console.log(err);
             })
    }, [])

    return (
        <div className="mt-5 container container-fluid">
            <h3 className="display-5 text-center border-bottom border-warning">Welcome to Artist Management System</h3>
            <div className="p-3 d-flex justify-content-around">
                <div className="p-3 border shadow-sm">
                    <p>User Records</p>
                    <hr />
                    <p>Total: {totalRecords ? totalRecords.userRecords: ""}</p>
                </div>
                <div className="p-3 border shadow-sm">
                    <p>Artist Records</p>
                    <hr />
                    <p>Total: {totalRecords ? totalRecords.artistRecords: ""}</p>
                </div>
                <div className="p-3 border shadow-sm">
                    <p>Music Records</p>
                    <hr />
                    <p>Total: {totalRecords ? totalRecords.musicRecords: ""}</p>
                </div>
            </div>
            <div className="p-3 d-flex justify-content-around">
                <p className="p-3 display-6 lead text-center">Last Login: {loginTime}</p>
                <button className="btn btn-lg btn-danger">Logout</button>
            </div>
        </div>
    )
}

export default Home;