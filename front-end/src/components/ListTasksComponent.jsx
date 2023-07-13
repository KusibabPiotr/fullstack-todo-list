import React, { Component } from "react";
import TaskService from "../services/TaskService";

class ListTasksComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      currentPage: 0,
      totalPages: 0,
      sortDirection: "asc",
      sortBy: "isDone",
      pageSize: 5,
    };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = (
    page = 0,
    sortDirection = "asc",
    sortBy = "isDone",
    pageSize = 5
  ) => {
    TaskService.getTasks(page, sortDirection, sortBy, pageSize).then(
      (response) => {
        const { content, pageable, totalPages } = response.data;
        const { sort } = pageable;
        const { empty, sorted, unsorted } = sort;

        const tasks = content.map((task) => ({
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

        this.setState({
          tasks,
          currentPage: pageable.pageNumber,
          totalPages,
          sortDirection,
          sort: { empty, sorted, unsorted },
        });
      }
    );
  };

  handlePageChange = (page) => {
    const { sortDirection, sortBy, pageSize } = this.state;
    this.fetchTasks(page, sortDirection, sortBy, pageSize);
  };

  handleSortDirectionChange = (event) => {
    const newSortDirection = event.target.value;
    this.setState({ sortDirection: newSortDirection }, () => {
      this.fetchTasks(
        this.state.currentPage,
        newSortDirection,
        this.state.sortBy,
        this.state.pageSize
      );
    });
  };

  handleSortByChange = (event) => {
    const newSortBy = event.target.value;
    this.setState({ sortBy: newSortBy }, () => {
      this.fetchTasks(
        this.state.currentPage,
        this.state.sortDirection,
        newSortBy,
        this.state.pageSize
      );
    });
  };

  handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    this.setState({ pageSize: newPageSize }, () => {
      this.fetchTasks(
        this.state.currentPage,
        this.state.sortDirection,
        this.state.sortBy,
        newPageSize
      );
    });
  };

  render() {
    const { tasks, currentPage, totalPages, sortDirection, pageSize } =
      this.state;

    return (
      <div>
        <h2 className="text-center">Tasks list</h2>

        <div className="text-center mb-3">
          <label htmlFor="sortDirection">Sort Direction: </label>
          <select
            id="sortDirection"
            value={sortDirection}
            onChange={this.handleSortDirectionChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <label htmlFor="sortBy" className="ml-3">
            Sort By:{" "}
          </label>
          <select
            id="sortBy"
            value={this.state.sortBy}
            onChange={this.handleSortByChange}
          >
            <option value="isDone">State</option>
            <option value="title">Title</option>
            <option value="content">Content</option>
            <option value="priority">Priority</option>
          </select>

          <label htmlFor="pageSize" className="ml-3">
            Page Size:{" "}
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={this.handlePageSizeChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="row">
          <table className="table table-stripped table-bordered">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <div>Current Page: {currentPage + 1}</div>
          <button
            disabled={currentPage === 0}
            onClick={() => this.handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => this.handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default ListTasksComponent;
