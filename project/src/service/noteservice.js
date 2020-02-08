import { Subject } from "rxjs";
import axios from "axios";
const API_URL = "http://localhost:3000";
const subject = new Subject();

export default {
  sendMessage: message => subject.next({ text: message }),
  getMessage: () => subject.asObservable(),

  updateColor(data) {
    return axios
      .put(`${API_URL}/updateColor`, data, {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  },

  archiveNote(data) {
    return axios
      .put(`${API_URL}/isArchived`, data, {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  },

  trashNote(data) {
    return axios
      .put(`${API_URL}/isTrashed`, data, {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  },

  deleteNote(data) {
    return axios
      .post(`${API_URL}/deleteNote`, data, {
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  },
  createLabel(data) {
    return axios
      .post(`${API_URL}/createLabel`, data, {
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  },
  getLabel() {
    return axios
      .get(`${API_URL}/getLabel`, {
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  },

  deletelabel(data) {
    return axios
      .post(`${API_URL}/deleteLabel`, data, {
        method: "POST",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  },

  editlabel(data) {
    return axios
      .put(`${API_URL}/editLabel`, data, {
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => res.data);
  },
  doPinned(data)
  {
    return axios
    .put(`${API_URL}/doPinned`, data, {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(res => res.data);
  },

  setprofilepic(data)
  {
    return axios
    .put(`${API_URL}/setProfilePic`, data, {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(res => res.data);

  },
  updateNote(data)
  {
    return axios
    .put(`${API_URL}/editTitle`, data, {
      method: "PUT",
      headers: {
        token: localStorage.getItem("token")
      }
    })
    .then(res => res.data);

  }
  
};
