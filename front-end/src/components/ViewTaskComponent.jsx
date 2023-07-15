import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewTaskComponent() {
  const { id } = useParams();

  const [task, setTask] = useState({
    publicId: "",
    title: "",
    content: "",
    isDone: "",
    details: {
      publicId: "",
      created: "",
      deadLine: "",
      reportTo: "",
      uplineEmail: "",
      uplineMobile: "",
    },
    priority: "",
  });

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    const result = await axios.get(`http://localhost:8080/api/tasks/${id}`);
    setTask(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="table-responsive" style={{ marginBottom: "80px" }}>
          <div className="col-md-6 offset-md-3 boarder rounded p-1 mt-2 shadow">
            <h2 className="text-center m-4">Task details</h2>

            <div className="card">
              <div className="card-header">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Title: </b>
                    {task.title}
                  </li>
                  <li className="list-group-item">
                    <b>Content: </b>
                    {task.content}
                  </li>
                  <li className="list-group-item">
                    <b>Progress: </b>
                    {task.isDone ? "Completed" : "Not completed"}
                  </li>
                  <li className="list-group-item">
                    <b>Priority: </b>
                    {task.priority}
                  </li>
                  <li className="list-group-item">
                    <b>Created at: </b>
                    {task.details.created}
                  </li>
                  <li className="list-group-item">
                    <b>Deadline: </b>
                    {task.details.deadLine}
                  </li>
                  <li className="list-group-item">
                    <b>Report to: </b>
                    {task.details.reportTo}
                  </li>
                  <li className="list-group-item">
                    <b>Upline email: </b>
                    {task.details.uplineEmail}
                  </li>
                  <li className="list-group-item">
                    <b>Upline mobile: </b>
                    {task.details.uplineMobile}
                  </li>
                </ul>
              </div>
            </div>
            <Link className="btn btn-primary my-2" to={"/"}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
