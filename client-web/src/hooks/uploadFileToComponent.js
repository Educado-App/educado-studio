
import axios from 'axios';

const uploadFileToComponent = async(file, component_id) => {
    let data = new FormData(); // Create new formdata
    data.append('file', file); // Append file

    const obj = {
        component_id: component_id
    }
    
    // Send request to S3 server
    const res = await axios.post('/api/upload-s3-image', data, {
        headers: { 'content-type': 'multipart/form-data' },
        params: {
            component_id: component_id
        }
    }).then(res => {
        return res.data.link; // Return response to RES VARIABLE
    }).catch(err => console.log(err));
    return res;
}

export default uploadFileToComponent;