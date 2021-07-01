import axios from "axios";

export default async function uploadPost(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("id", data._id);
    try {
        const response = await axios.put(
            `${process.env.REACT_APP_API_UPDATE}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log(response.data.data);
        alert(response.data.message);
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
}
