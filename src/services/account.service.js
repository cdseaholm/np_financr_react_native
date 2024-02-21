import http from "../http-common";

class AccountDataService {
  authenticate(session_id) {
    return http.post("/authenticate", session_id);
  }

  getAll() {
    return http.get("/accounts");
  }

  getById(id) { 
    return http.get(`/get/id/${id}`); 
  }

  getByUsername(username) { 
    return http.get(`/get/username/${username}`); 
  }

  getByEmail(email) { 
    return http.get(`/get/email/${email}`); 
  }

  loginWithEmail(data) { 
    return http.post("/get/login", data); 
  }

  create(data) {
    return http.post("/accounts", data);
  }

  update(id, data) {
    return http.put(`/accounts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/accounts/${id}`);
  }

  deleteAll() {
    return http.delete(`/accounts`);
  }

  findByTitle(title) {
    return http.get(`/accounts?title=${title}`);
  }
}

export default new AccountDataService();