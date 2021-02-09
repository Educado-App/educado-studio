
import axios from 'axios';

const getFile = async(link) => {
    const obj = {
        params: {s3link: link}
    }
    console.log('IM INSIDE getFILE FUNCTion')
    // Send request to S3 server
    const res = await axios.get('/download-s3', obj).then(res => {
        console.log(res.data.img)
        return res.data.img; // Return response
    }).catch(err => console.log(err))

    return res;
}

export default getFile;