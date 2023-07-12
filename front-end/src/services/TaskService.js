import axios from "axios";

const TASKS_API_BASE_URL = "http://localhost:8080/api/tasks";

class TaskService {
  getTasks() {
    return axios.get(TASKS_API_BASE_URL);
  }
}

export default new TaskService();
