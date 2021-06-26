import axios from "axios";

export default async function getPosts() {
    try {
        const posts = await axios.get(`${process.env.REACT_APP_API_GET_POSTS}`);
        return posts.data.data;
    } catch (error) {
        console.log(error);
    }
}
