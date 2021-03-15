
import axios from 'axios';

const getFileFromComponent = async(component_id) => {
    const obj = {
        params: {component_id: component_id}
    }
    // Send request to S3 server
    const res = await axios.get('/api/download-s3-image', obj).then(res => {
        return res.data.img; // Return response
    }).catch(err => console.log(err))

    return res;
}

export default getFileFromComponent;