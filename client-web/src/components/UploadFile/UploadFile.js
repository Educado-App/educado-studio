import React, { useRef, useState } from 'react';
import axios from 'axios';

function FileUpload() {

    const [file, setFile] = useState([]); // storing the uploaded file
    // storing the recived file from backend
    const [data, getFile] = useState({ name: "", path: "" });
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element

    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accessing file
        console.log(file);
        setFile(file); // storing file
    }

    const uploadFile = async() => {
        let data = new FormData();
        data.append('file', file); // appending file
      
        const res = await axios.post('/upload-s3', data, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            },
            headers: { 'content-type': 'multipart/form-data' }
        }).then(res => {
            console.log(res);
        }).catch(err => console.log(err))}

    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />
                <div className="progessBar" style={{ width: progress }}>
                   {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">
                   Upload
                </button>
            <hr />
            </div>
        </div>
    );
}

export default FileUpload;