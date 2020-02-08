import axios from "axios";
const API_URL = "http://localhost:3000";
export default {
  register(data) {
    console.log(data);

    return axios.post(`${API_URL}/register`, data).then(res => res.data);
  },
  login(data) {
    return axios.post(`${API_URL}/login`, data).then(res => res.data);
  },

  getNotes() {
    return axios
      .get(`${API_URL}/getNotes`, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  },

  addNote(data) {
    return axios
      .post(`${API_URL}/createNote`, data, {
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  }
};
