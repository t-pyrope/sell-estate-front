import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/lead",
    headers: {
        "Content-type": "application/json"
    }
});
