
import axios from 'axios';

const getPresignedUrlCoverImg = async(course_id) => {
    const obj = {
        course_id : course_id
    }
    // Send request to S3 server
    const res = await axios.post('/api/eml/get-presigned-url', obj);
    console.log(res);
    return res.data;
}

export default getPresignedUrlCoverImg;