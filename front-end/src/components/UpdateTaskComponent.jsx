import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from "axios";
import { validateField } from "../utils/ValidationUtils";

export default function UpdateTaskComponent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [task, setTask] = useState({
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

  const [errors, setErrors] = useState({
    titleError: "",
    contentError: "",
    reportToError: "",
    uplineEmailError: "",
    uplineMobileError: "",
  });

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tasks/${id}`);
      const taskData = response.data;
      setTask(taskData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const validateForm = () => {
    const { title, content, details } = task;
    const { reportTo, uplineEmail, uplineMobile } = details;

    const titleError = validateField("title", title);
    const contentError = validateField("content", content);
    const reportToError = validateField("reportTo", reportTo);
    const uplineEmailError = validateField("uplineEmail", uplineEmail);
    const uplineMobileError = validateField("uplineMobile", uplineMobile);

    setErrors({
      titleError,
      contentError,
      reportToError,
      uplineEmailError,
      uplineMobileError,
    });

    return (
      !titleError &&
      !contentError &&
      !reportToError &&
      !uplineEmailError &&
      !uplineMobileError
    );
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "deadLine" && value) {
      let deadlineParsed = value.toISOString();
      setTask((prevTask) => ({
        ...prevTask,
        details: {
          ...prevTask.details,
          [name]: deadlineParsed,
        },
      }));
    } else {
      setTask((prevTask) => ({
        ...prevTask,
        [name]: value,
        details: {
          ...prevTask.details,
          [name]: value,
        },
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/tasks/${id}`, task);
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="table-responsive" style={{ marginBottom: "80px" }}>
          <div className="col-md-6 offset-md-3 boarder rounded p-1 mt-2 shadow">
            <h2 className="text-center m-4">Update task</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the title"
                  name="title"
                  value={task.title}
                  onChange={onInputChange}
                />
                {errors.titleError && (
                  <div className="alert alert-danger" role="alert">
                    {errors.titleError}
                  </div>
                )}
                <br />
                <label htmlFor="Content" className="form-label">
                  Content
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Enter the content"
                  name="content"
                  rows={2}
                  cols={50}
                  value={task.content}
                  onChange={onInputChange}
                />
                {errors.contentError && (
                  <div className="alert alert-danger" role="alert">
                    {errors.contentError}
                  </div>
                )}
                <br />
                <label htmlFor="Progress" className="form-label">
                  Progress
                </label>
                <select
                  className="form-control"
                  value={task.isDone.toString()}
                  name="isDone"
                  onChange={onInputChange}
                >
                  <option value="false">Not Completed</option>
                  <option value="true">Completed</option>
                </select>
                <br />
                <label htmlFor="Priority" className="form-label">
                  Priority
                </label>
                <select
                  className="form-control"
                  value={task.priority}
                  name="priority"
                  onChange={onInputChange}
                >
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
                <br />
                <label htmlFor="Deadline" className="form-label">
                  Deadline
                </label>
                <br />
                <DateTime
                  onChange={(date) =>
                    setTask((prevTask) => ({
                      ...prevTask,
                      details: {
                        ...prevTask.details,
                        deadLine: date,
                      },
                    }))
                  }
                  dateFormat="YYYY-MM-DD"
                  value={task.details.deadLine}
                  timeFormat="HH:mm:ss.SSS"
                  placeholderText="Select a deadline date"
                />
                <br />
                <label htmlFor="ReportTo" className="form-label">
                  Report to
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex. John Smith"
                  name="reportTo"
                  value={task.details.reportTo}
                  onChange={onInputChange}
                />
                {errors.reportToError && (
                  <div className="alert alert-danger" role="alert">
                    {errors.reportToError}
                  </div>
                )}
                <br />
                <label htmlFor="ReportToEmail" className="form-label">
                  Report to email
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="example@example.com"
                  name="uplineEmail"
                  value={task.details.uplineEmail}
                  onChange={onInputChange}
                  title="Enter a valid email address"
                />
                {errors.uplineEmailError && (
                  <div className="alert alert-danger" role="alert">
                    {errors.uplineEmailError}
                  </div>
                )}
                <br />
                <label htmlFor="ReportToMobile" className="form-label">
                  Report to mobile
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">+48</span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter polish 9-digits number"
                    name="uplineMobile"
                    value={task.details.uplineMobile}
                    onChange={onInputChange}
                    maxLength={9}
                    pattern="[0-9]*"
                    title="Mobile number must be 9 digits"
                  />
                </div>
                {errors.uplineMobileError && (
                  <div className="alert alert-danger" role="alert">
                    {errors.uplineMobileError}
                  </div>
                )}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-outline-primary">
                  Submit
                </button>
                <Link className="btn btn-outline-danger mx-2" to="/">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
