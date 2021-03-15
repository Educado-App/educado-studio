
import axios from 'axios';

const uploadCoverImage = async(file, course_id) => {
    let data = new FormData(); // Create new formdata
    data.append('file', file); // Append file

    const obj = {
        course_id: course_id
    }
    
    // Send request to S3 server
    const res = await axios.post('/upload-s3', data, {
        headers: { 'content-type': 'multipart/form-data' },
        params: {
            course_id: course_id
        }
    }).then(res => {
        return res.data.link; // Return response to RES VARIABLE
    }).catch(err => console.log(err));
    return res;
}

export default uploadCoverImage;