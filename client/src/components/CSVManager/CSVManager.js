import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../service/constants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CSVManager = () => {
    const [fileUploaded, setFileUploaded] = useState(null);
    const navigate = useNavigate();

    const handleFileUpload = e => {
        if (fileUploaded) {
            const formData = new FormData();
            formData.append("file", fileUploaded);

            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`
            }

            axios
                .post(`${baseURL}/api/file/upload`, formData, { headers })
                .then(res => {
                    navigate("/manager/csvlist", { state: { artists: res.data } });
                })
                .catch(err => {
                    if (err) {
                        toast.error("can't upload the file", {
                            position: "top-right",
                            autoClose: 3000,
                        });
                    }
                })
        }
    }
    
    const handleDownload = () => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
        }
        const config = {
            responseType: "blob",
            headers
        }

        axios
            .get(`${baseURL}/api/file/download`, config)
            .then(res => {
                const blob = new Blob([res.data], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
            
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'data.csv'); 
                document.body.appendChild(link);
            
                link.click();            
            })
            .catch(err => {
                if (err) {
                    toast.error("unable to download", {
                        position: "top-right",
                        autoClose: 3000,
                    });
                }
            }) 
    }

    const prepareFile = (data) => {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'downloaded_file.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    return (
        <div className="container border">
            <div className="row mt-5 d-flex justify-content-center">
                <div className="container col">
                    <h1 className="display-5 text-center jumbotron-heading">CSV Parsing and generating</h1>
                </div>
                <p className="text-center lead text-md">Use the buttons below</p>
                <div className="container ">
                    <div className="row">
                        <div className="col-md-6 ">
                            <p className="lead text-center">Choose CSV File</p>
                            <div className="mb-3">
                                <input onChange={e => setFileUploaded(e.target.files[0])} className="form-control" type="file" id="formFile" />
                                <button onClick={handleFileUpload} className="m-2 d-block btn btn-success w-50">Create Artists</button>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <p className="lead text-center">Export Artists to CSV</p>
                            <div className="mb-5 p-3 d-flex flex-column align-items-center">
                                <button onClick={handleDownload} className="mt-3 btn btn-secondary w-50 d-block">Generate CSV</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
}

export default CSVManager;