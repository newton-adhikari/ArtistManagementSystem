import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../service/constants";
import { toast } from 'react-toastify';
import {Modal, Button} from 'react-bootstrap';  
import 'react-toastify/dist/ReactToastify.css';

const AddMusic = () => {
    const [data, setData] = useState({
        artist_id: 0,
        artist: "",
        title: "",
        album_name: "",
        genre: ""
    });

    const [artists, setArtists] = useState([]);
    const [show, setShow] = useState(false);  
    const modalClose = () => setShow(false);  
    const modalShow = () => setShow(true);  

    const navigate = useNavigate();

    const handleDialog = event => {
        event.preventDefault();
        showArtists();
    }

    const formSubmission = () => {
        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.post(`${baseURL}/api/music/create`, data, { headers })
             .then(res => {
                // create a react toaster for created
                console.log(res);
                toast.success("Music Created!", {
                    position: "top-right",
                    autoClose: 3000,
                });
               
                navigate("/admin/music");
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

    const showArtists = () => {
        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.get(`${baseURL}/api/artist/getByName?name=${data.artist}`, { headers })
             .then(res => {
                if (!res.data.length) {
                    toast.error("Artist not found. Please create artist first.", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                    return;    
                }
                setArtists(res.data);
                modalShow();
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

    const setArtistId = id => {
        modalClose();
        setData({...data, artist_id: id})
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
        <h2 className="color-white">Add New</h2>
        <div className='p-3 rounded w-50 border'>
        <div className="p-4">  
                <Modal show={show} onHide={modalClose}>  
                    <Modal.Header closeButton>  
                        <Modal.Title>Choose Artist</Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>DOB</th>
                                    <th>Gender</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artists.map(u => { // pagination
                                    return <tr onDoubleClick={() => setArtistId(u.id)} key={u.id}>
                                        <td>{u.name}</td>
                                        <td>{u.dob}</td>
                                        <td>{(u.gender === "m" ? "Male": (u.gender === "f" ? "Female" : ""))}</td>
                                        <td>{u.address}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        Double click to choose your Artist
                    </Modal.Body>  
                    <Modal.Footer>  
                        <Button variant="secondary" onClick={modalClose}>Close</Button>  
                        <Button variant="primary">Add</Button>  
                    </Modal.Footer>  
                </Modal>  
            </div>  
            <form onSubmit={formSubmission}>
                <div className="input-group col-12">
                    <input minLength="3" required type="text" className="form-control" id="title" placeholder='Artist Name' autoComplete='off'
                    onChange={e => setData({...data, artist: e.target.value})}/>
                      <div className="input-group-append">
                        <span className="input-group-text"><button onClick={handleDialog} className="btn"><i className="bi bi-search"></i></button></span>
                     </div>
                </div>
                <div className="col-12">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input minLength="5" required type="text" className="form-control" id="title" placeholder='Title' autoComplete='off'
                    onChange={e => setData({...data, title: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="albumName" className="form-label">AlbumName</label>
                    <input minLength="3" required type="text" className="form-control" id="albumName" placeholder='Album Name' autoComplete='off'
                    onChange={e => setData({...data, album_name: e.target.value})}/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputGenre" className="form-label">Genre</label>
                    <select className="form-control" id="inputGenre" name="genre" onChange={e => setData({...data, gender: e.target.value})}>
                        <option value="rnb">Rhythm and Blues</option>
                        <option value="country">Country</option>
                        <option value="classic">Classic</option>
                        <option value="rock">Rock</option>
                        <option value="jaaz">Jaaz</option>
                    </select>
                </div>
                <div className="p-3 col-12 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default AddMusic;