import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from "axios";

export default function UpdateTaskComponent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [details, setDetails] = useState({
    publicId: "",
    created: "",
    deadLine: "",
    reportTo: "",
    uplineEmail: "",
    uplineMobile: "",
  });
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [reportToError, setReportToError] = useState("");
  const [uplineEmailError, setUplineEmailError] = useState("");
  const [uplineMobileError, setUplineMobileError] = useState("");

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "title":
        if (!value) {
          return "Title is required";
        }
        return "";
      case "content":
        if (!value) {
          return "Content is required";
        }
        return "";
      case "reportTo":
        if (!value) {
          return "Report to is required";
        }
        return "";
      case "uplineEmail":
        if (!value) {
          return "Email is required";
        } else if (!isValidEmail(value)) {
          return "Invalid email address";
        }
        return "";
      case "uplineMobile":
        if (!value) {
          return "Mobile number is required";
        } else if (!isValidPhoneNumber(value)) {
          return "Invalid mobile number";
        }
        return "";
      default:
        return "";
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };

  useEffect(() => {
    loadUser();
  }, []);

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

  const onInputChange = (e) => {
    const { name, value } = e.target;
    const validationError = validateField(name, value);

    if (name === "deadLine" && value) {
      let deadlineParsed = value.toISOString();
      console.log(deadlineParsed);
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
    if (name === "title") {
      setTitle(value);
      setTitleError(validationError);
    } else if (name === "content") {
      setContent(value);
      setContentError(validationError);
    } else if (name === "reportTo") {
      setDetails((prevDetails) => ({
        ...prevDetails,
        reportTo: value,
      }));
      setReportToError(validationError);
    } else if (name === "uplineEmail") {
      setDetails((prevDetails) => ({
        ...prevDetails,
        uplineEmail: value,
      }));
      setUplineEmailError(validationError);
    } else if (name === "uplineMobile") {
      setDetails((prevDetails) => ({
        ...prevDetails,
        uplineMobile: value,
      }));
      setUplineMobileError(validationError);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const titleError = validateField("title", title);
    const contentError = validateField("content", content);
    const reportToError = validateField("reportTo", details.reportTo);
    const uplineEmailError = validateField("uplineEmail", details.uplineEmail);
    const uplineMobileError = validateField(
      "uplineMobile",
      details.uplineMobile
    );

    setTitleError(titleError);
    setContentError(contentError);
    setReportToError(reportToError);
    setUplineEmailError(uplineEmailError);
    setUplineMobileError(uplineMobileError);

    if (
      titleError ||
      contentError ||
      reportToError ||
      uplineEmailError ||
      uplineMobileError
    ) {
      return;
    }
    await axios.put(`http://localhost:8080/api/tasks/${id}`, task);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/tasks/${id}`);

    setTask(result.data);
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
                {titleError && (
                  <div className="alert alert-danger" role="alert">
                    {titleError}
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
                {contentError && (
                  <div className="alert alert-danger" role="alert">
                    {contentError}
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
                    setDetails((prevDetails) => ({
                      ...prevDetails,
                      deadLine: date,
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
                {reportToError && (
                  <div className="alert alert-danger" role="alert">
                    {reportToError}
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
                {uplineEmailError && (
                  <div className="alert alert-danger" role="alert">
                    {uplineEmailError}
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
                {uplineMobileError && (
                  <div className="alert alert-danger" role="alert">
                    {uplineMobileError}
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
