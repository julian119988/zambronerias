import axios from "axios";

export default async function sendMail(data) {
    try {
        const response = await axios.post(
            process.env.REACT_APP_API_SEND_MAIL,
            data
        );
        return response;
    } catch (error) {
        return error;
    }
}
