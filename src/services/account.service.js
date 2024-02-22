import http from "../http-common";

class AccountDataService {

  //authenticate
  authenticate(session_id) {
    return http.post("/authenticate", session_id);
  }

  //create
  create(data) {
    return http.post("/register", data);
  }

  //delete all
  deleteAll() {
    return http.delete(`/delete-all`);
  }

  //delete by email
  delete(email) {
    return http.delete(`/delete/${email}`);
  }

  //get all
  getAll() {
    return http.get("/accounts");
  }

  //get by email
  getByEmail(email) { 
    return http.get(`/get/email/${email}`); 
  }

  //get by id
  getById(id) { 
    return http.get(`/get/id/${id}`); 
  }

  //get by username
  getByUsername(username) { 
    return http.get(`/get/username/${username}`); 
  }

  //login with email
  loginWithEmail(data) { 
    return http.post("/get/login", data); 
  }

  //logout
  logout(session_id) { 
    return http.post("/logout", session_id); 
  }

  //update by email
  update(email, data) {
    return http.put(`/update/account/${email}`, data);
  }

}

export default new AccountDataService();