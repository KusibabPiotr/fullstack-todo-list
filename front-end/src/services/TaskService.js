import axios from "axios";

const TASKS_API_BASE_URL = "http://localhost:8080/api/tasks";

class TaskService {
  getTasks(page = 0, sortDirection = "asc", sortBy = "isDone", pageSize = 5) {
    return axios.get(TASKS_API_BASE_URL, {
      params: {
        page,
        sortDirection,
        sortBy,
        pageSize,
      },
    });
  }

  async createTask(task) {
    return await axios.post(TASKS_API_BASE_URL, task);
  }
}

export default new TaskService();
