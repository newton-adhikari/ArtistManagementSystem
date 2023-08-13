import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../service/constants";
import { toast } from 'react-toastify';
import {Modal, Button} from 'react-bootstrap';  
import 'react-toastify/dist/ReactToastify.css';


const Music = () => {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);  
    const modalClose = () => setShow(false);  
    const modalShow = () => setShow(true);  
    const [loading, isLoading] = useState(true);
    const [music, setMusic] = useState([]);
    const [currentDataIndex, setCurrentDataIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(music.length/itemsPerPage);
    const currentIndex = (currentPage -1) * itemsPerPage;
    const uptoIndex = currentIndex + itemsPerPage;

    useEffect(() => {
        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
        const headers = {
            Authorization: `Bearer ${token}`
        }

        const endpoint = `${baseURL}/api/music/all`;

        axios.get(endpoint, { headers })
             .then(res => {
                isLoading(false);
                setMusic(res.data);
             })
             .catch(err => {
                console.log(err);
             })
    }, [])

    const handleClick = () => {
        navigate("/admin/createNewMusic");
    }

    const handleDelete = id => {
        let del = window.confirm("Are you sure?");

        if (!del) return;

        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));
        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.delete(`${baseURL}/api/music/delete/${id}`, { headers })
             .then(res => {
                if (res.data && res.data.message) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                    });
                 }
                setMusic(music.filter(u => u.id !== id));
             })
             .catch(err => {
                console.log(err)
             })
    } 

    const handleSubmit = (event) => {
        const token = JSON.parse(JSON.stringify(localStorage.getItem("token")));

        const headers = {
            Authorization: `Bearer ${token}`
        }

        axios.put(`${baseURL}/api/music/update/${currentDataIndex}`, {album_name: music[currentDataIndex].album_name}, { headers })
             .then(res => {
                if(res.data && res.data.message) {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
                modalClose();
                navigate("/admin/music");
            }
            })
             .catch(err => {
                console.log(err);
             })

    }

    console.log(music);
    const showModal = i => {
        return (
            <Modal show={show} onHide={modalClose}>  
                    <Modal.Header closeButton>  
                        <Modal.Title>Update</Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                        <form>
                            <div className="col-12">
                                <label htmlFor="title" className="form-label">Artist</label>
                                <input disabled minLength="3" required type="text" className="form-control" id="title" placeholder='Artist Name' autoComplete='off'
                                value={music && music[i] && music[i].name ? music[i].name : ''}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input disabled minLength="5" required type="text" className="form-control" id="title" placeholder='Title' autoComplete='off'
                                value={music && music[i] && music[i].title ? music[i].title : ''}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="albumName" className="form-label">AlbumName</label>
                                <input minLength="3" required type="text" className="form-control" id="albumName" placeholder='Album Name' autoComplete='off'
                                value={music && music[i] && music[i].album_name ? music[i].album_name : ''}
                                onChange={e => {
                                    const newMusic = music.map((item, index) => {
                                        if (index === i) {
                                          return { ...item, album_name: e.target.value };
                                        }
                                        return item;
                                      });
                                    
                                      setMusic(newMusic);
                                    }}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="inputGenre" className="form-label">Genre</label>
                                <select disabled value={music && music[i] && music[i].genre ? music[i].genre : ''} className="form-control" id="inputGenre" name="genre">
                                    <option value="rnb">Rhythm and Blues</option>
                                    <option value="country">Country</option>
                                    <option value="classic">Classic</option>
                                    <option value="rock">Rock</option>
                                    <option value="jaaz">Jaaz</option>
                                </select>
                            </div>
                        </form>
                    </Modal.Body>  
                    <Modal.Footer>  
                        <Button variant="secondary" onClick={modalClose}>Close</Button>  
                        <Button onClick={handleSubmit} variant="primary">Add</Button>  
                    </Modal.Footer>  
                </Modal>
        )
    }

    if (loading) {
        return <div className="d-flex justify-content-center spinner-border" role="status">
            <span className="sr-only">Loading...</span>
      </div>
    }

    return (
        <div className="px-3 py-3">
            <div className="d-flex justify-content-center">
                <h4>Music List</h4>
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={handleClick} className="btn btn-success">Add Music</button>
            </div>
            <div>{showModal(currentDataIndex)}</div>
            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Artist</th>
                            <th>Title</th>
                            <th>Album</th>
                            <th>Genre</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {music.slice(currentIndex, uptoIndex).map(u => {
                            return <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.title}</td>
                                <td>{u.album_name}</td>
                                <td>{(u.genre === "rnb" ? "Rythm and Blues": u.genre)}</td>
                                <td className="d-flex">
                                    <button onClick={() => {
                                        setCurrentDataIndex(u.id);
                                        modalShow();
                                    }} className="btn btn-sm btn-primary">Edit</button>
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
        </div>
    )
}

export default Music;