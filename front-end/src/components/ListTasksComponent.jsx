import React, { useEffect, useState } from "react";
import TaskService from "../services/TaskService";
import { useNavigate } from "react-router-dom";

export default function ListTasksComponent() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("isDone");
  const [pageSize, setPageSize] = useState(5);

  const fetchTasks = (
    page = 0,
    sortDirection = "asc",
    sortBy = "isDone",
    pageSize = 5
  ) => {
    TaskService.getTasks(page, sortDirection, sortBy, pageSize).then(
      (response) => {
        const { content, pageable, totalPages } = response.data;

        const mappedTasks = content.map((task) => ({
          publicId: task.publicId,
          title: task.title,
          content: task.content,
          isDone: task.isDone,
          details: {
            publicId: task.details.publicId,
            created: task.details.created,
            deadLine: task.details.deadLine,
            reportTo: task.details.reportTo,
            uplineEmail: task.details.uplineEmail,
            uplineMobile: task.details.uplineMobile,
          },
          priority: task.priority,
        }));

        setTasks(mappedTasks);
        setCurrentPage(pageable.pageNumber);
        setTotalPages(totalPages);
        setSortDirection(sortDirection);
      }
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handlePageChange = (page) => {
    fetchTasks(page, sortDirection, sortBy, pageSize);
  };

  const handleSortDirectionChange = (event) => {
    const newSortDirection = event.target.value;
    setSortDirection(newSortDirection);
    fetchTasks(currentPage, newSortDirection, sortBy, pageSize);
  };

  const handleSortByChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    fetchTasks(currentPage, sortDirection, newSortBy, pageSize);
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    fetchTasks(currentPage, sortDirection, sortBy, newPageSize);
  };

  const handleAddTask = () => {
    navigate("/add-task");
  };

  return (
    <div>
      <h1
        className="text-center"
        style={{
          fontFamily: "Arial",
          fontSize: "36px",
          fontWeight: "bold",
          color: "#333",
          textTransform: "uppercase",
        }}
      >
        Tasks List
      </h1>
      <div className="row justify-content-end">
        <div className="col-auto">
          <button className="btn btn-success" onClick={handleAddTask}>
            Add new task
          </button>
        </div>
      </div>

      <div className="text-center mb-3">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <label htmlFor="sortDirection"> Sort Direction: </label>
            <select
              id="sortDirection"
              value={sortDirection}
              onChange={handleSortDirectionChange}
              className="form-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="sortBy" className="ml-3">
              Sort By:{" "}
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={handleSortByChange}
              className="form-select"
            >
              <option value="isDone">State</option>
              <option value="title">Title</option>
              <option value="content">Content</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="pageSize" className="ml-3">
              Page Size:{" "}
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
              className="form-select"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="table-responsive" style={{ marginBottom: "80px" }}>
          <table className="table boarder shadow">
            <thead>
              <tr>
                <th>State</th>
                <th>Title</th>
                <th>Content</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.publicId}>
                  <td>{task.isDone ? "Completed" : "Not completed"}</td>
                  <td>{task.title}</td>
                  <td>{task.content}</td>
                  <td>{task.priority}</td>
                  <td>
                    <button className="btn btn-primary mx-2">Details</button>
                    <button className="btn btn-outline-primary mx-2">
                      Edit
                    </button>
                    <button className="btn btn-danger mx-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <div>Current Page: {currentPage + 1}</div>
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-outline-primary"
              disabled={currentPage === totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
