
import axios from 'axios';

const getPresignedUrl = async(component_id) => {
    const obj = {
        component_id: component_id
    }
    // Send request to S3 server
    const res = await axios.post('/api/get-presigned-url', obj);
    console.log(res);
    return res.data;
}

export default getPresignedUrl;