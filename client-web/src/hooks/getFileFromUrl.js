
import axios from 'axios';

const getFileFromUrl = async(link) => {
    const obj = {
        params: {s3link: link}
    }
    // Send request to S3 server
    const res = await axios.get('/download-s3', obj).then(res => {
        return res.data.img; // Return response
    }).catch(err => console.log(err))

    return res;
}

export default getFileFromUrl;