
import axios from 'axios';

const uploadFile = async(file) => {
    let data = new FormData(); // Create new formdata
    data.append('file', file); // Append file
    
    // Send request to S3 server
    const res = await axios.post('/upload-s3', data, {
        headers: { 'content-type': 'multipart/form-data' }
    }).then(res => {
        console.log(res.data.link)
        return res.data.link; // Return response to RES VARIABLE
    }).catch(err => console.log(err))
    return res;
}

export default uploadFile;