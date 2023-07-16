import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateTime from "react-datetime";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import TaskService from "../services/TaskService";
import { validateField } from "../utils/ValidationUtils";

export default function CreateTaskComponent() {
  const navigate = useNavigate();
  const todaysDate = new Date();
  const [task, setTask] = useState({
    publicId: "",
    title: "",
    content: "",
    isDone: false,
    details: {
      publicId: "",
      created: todaysDate,
      deadLine: todaysDate,
      reportTo: "",
      uplineEmail: "",
      uplineMobile: "",
    },
    priority: "HIGH",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const field1UUID = uuidv4();
    const field2UUID = uuidv4();

    setTask((prevTask) => ({
      ...prevTask,
      publicId: field1UUID,
      details: {
        ...prevTask.details,
        publicId: field2UUID,
      },
    }));
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const validationError = validateField(name, value);

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
      details: {
        ...prevTask.details,
        [name]: value,
      },
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { title, content, details } = task;
    const titleError = validateField("title", title);
    const contentError = validateField("content", content);
    const reportToError = validateField("reportTo", details.reportTo);
    const uplineEmailError = validateField("uplineEmail", details.uplineEmail);
    const uplineMobileError = validateField(
      "uplineMobile",
      details.uplineMobile
    );

    const newErrors = {
      title: titleError,
      content: contentError,
      reportTo: reportToError,
      uplineEmail: uplineEmailError,
      uplineMobile: uplineMobileError,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    await TaskService.createTask(task);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="table-responsive" style={{ marginBottom: "80px" }}>
          <div className="col-md-6 offset-md-3 boarder rounded p-1 mt-2 shadow">
            <h2 className="text-center m-4">Create task</h2>
            <form onSubmit={onSubmit}>
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
                {errors.title && (
                  <div className="alert alert-danger" role="alert">
                    {errors.title}
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
                {errors.content && (
                  <div className="alert alert-danger" role="alert">
                    {errors.content}
                  </div>
                )}
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
                {errors.reportTo && (
                  <div className="alert alert-danger" role="alert">
                    {errors.reportTo}
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
                {errors.uplineEmail && (
                  <div className="alert alert-danger" role="alert">
                    {errors.uplineEmail}
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
                {errors.uplineMobile && (
                  <div className="alert alert-danger" role="alert">
                    {errors.uplineMobile}
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
