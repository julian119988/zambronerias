import axios from "axios";

export default async function uploadPost(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("file", data.file);
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_UPLOAD}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        alert(response.data.message);
    } catch (error) {
        console.error(error);
    }
}
