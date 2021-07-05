import axios from "axios";

export default async function removePost(id) {
    try {
        await axios.post(`${process.env.REACT_APP_API_REMOVE_POST}`, {
            id: id,
        });
    } catch (error) {
        console.error(error);
    }
}
