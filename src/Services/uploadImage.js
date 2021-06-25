import axios from "axios";
export default async function uploadImage(file) {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}`);
    console.log(response);
    return response;
}
