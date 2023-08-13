import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { useState , useEffect} from "react";

const ArtistDashboard = () => {
    const [name, setName] = useState("");

    useEffect(() => {
        setName(localStorage.getItem("name"));
    }, [])

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <div className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 d-none d-sm-inline">Menu</span>
                        </div>
                        <div className="border-bottom w-100 p-y-4">
                            <i className="fs-4 bi bi-person-circle"></i>
                            <span> {name.charAt(0).toUpperCase()}{name.slice(1)} </span>
                        </div>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li>
								<Link to="/artist" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
									<i className="fs-4 bi bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span> </Link>
							</li>
                            <li>
                                <Link to="/artist/artistselco" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi bi-universal-access"></i> <span className="ms-1 d-none d-sm-inline">Artists</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/artist/music" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi bi-boombox"></i> <span className="ms-1 d-none d-sm-inline">Songs</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/logout" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-white">
                                    <i className="fs-4 bi bi-box-arrow-left"></i> <span className="ms-1 d-none d-sm-inline">Logout</span> 
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            <div className="col p-0 m-0">
                <div className="p-1 d-flex justify-content-center shadow">
                    <h4>Artist Management System</h4>
                </div>
                <Outlet />
            </div>
        </div>
    </div>
)}

export default ArtistDashboard;