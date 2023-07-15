import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import axios from "axios";

export default function UpdateTaskComponent() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const { publicId, title, content, isDone, details, priority } = task;
  const {
    publicId: detailsPublicId,
    created,
    deadLine,
    reportTo,
    uplineEmail,
    uplineMobile,
  } = details;

  const onInputChange = (e) => {
    const { name, value } = e.target;

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
  };

  const onSubmit = async (e) => {
    e.preventDefault();
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
                  type={"text"}
                  className="form-control"
                  placeholder="Enter the title"
                  name="title"
                  value={title}
                  onChange={(e) => onInputChange(e)}
                />
                <br />
                <label htmlFor="Content" className="form-label">
                  Content
                </label>
                <textarea
                  type={"text"}
                  className="form-control"
                  placeholder="Enter the content"
                  name="content"
                  rows={2}
                  cols={50}
                  value={content}
                  onChange={(e) => onInputChange(e)}
                />
                <br />
                <label htmlFor="Priority" className="form-label">
                  Priority
                </label>
                <select
                  className="form-control"
                  value={priority}
                  name="priority"
                  onChange={(e) => onInputChange(e)}
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
                    onInputChange({ target: { name: "deadLine", value: date } })
                  }
                  dateFormat="YYYY-MM-DD"
                  value={deadLine}
                  timeFormat="HH:mm:ss.SSS"
                  placeholderText="Select a deadline date"
                />
                <br />
                <label htmlFor="ReportTo" className="form-label">
                  Report to
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="ex. John Smith"
                  name="reportTo"
                  value={reportTo}
                  onChange={(e) => onInputChange(e)}
                />
                <br />
                <label htmlFor="ReportToEmail" className="form-label">
                  Report to email
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="example@example.com"
                  name="uplineEmail"
                  value={uplineEmail}
                  onChange={(e) => onInputChange(e)}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Enter a valid email address"
                />
                <br />
                <label htmlFor="ReportToMobile" className="form-label">
                  Report to mobile
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">+48</span>
                  </div>
                  <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter polish 9-digits number"
                    name="uplineMobile"
                    value={uplineMobile}
                    onChange={(e) => onInputChange(e)}
                    maxLength={9}
                    pattern="[0-9]*"
                    title="Mobile number must be 9 digits"
                  />
                </div>
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
