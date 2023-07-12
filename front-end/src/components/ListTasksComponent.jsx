import React, { Component } from "react";
import TaskService from "../services/TaskService";

class ListTasksComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };
  }

  componentDidMount() {
    TaskService.getTasks().then((response) => {
      console.log(response);
      this.setState({ tasks: response.data.content });
    });
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Tasks list</h2>
        <div className="row">
          <table className="table table-stripped table-bordered">
            <thead>
              <tr>
                <th>Is Done?</th>
                <th>Priority</th>
                <th>Title</th>
                <th>Content</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.tasks.map((task) => (
                <tr key={task.publicId}>
                  <td>{task.isDone ? "Yes" : "No"}</td>
                  <td>{task.priority}</td>
                  <td>{task.title}</td>
                  <td>{task.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListTasksComponent;
