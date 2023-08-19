import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CSVList = () => {
    const userRole = JSON.parse(JSON.stringify(localStorage.getItem("role")));
    const location = useLocation();
    const artists = location.state && location.state.artists ? location.state.artists.slice(1) : [];
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(artists.length/itemsPerPage);
    const currentIndex = (currentPage -1) * itemsPerPage;
    const uptoIndex = currentIndex + itemsPerPage;

    return (
        <div className="px-3 py-3">
            <div className="d-flex justify-content-center">
                    <h4>CSV Artists List</h4>
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
                        </tr>
                    </thead>
                    <tbody>
                        {artists.slice(currentIndex, uptoIndex).map(u => { // pagination
                            return <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.dob}</td>
                                <td>{(u.gender === "m" ? "Male": (u.gender === "f" ? "Female" : ""))}</td>
                                <td>{u.address}</td>
                                <td>{u["first_release_year"]}</td>
                                <td>{u["no_of_albums_released"]}</td>
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
        </div>
    )
}

export default CSVList;