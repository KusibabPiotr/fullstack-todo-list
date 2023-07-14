import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import TaskService from "../services/TaskService";

export default function CreateTaskComponent() {
  const navigate = useNavigate();
  const todaysDate = new Date();
  const [field1UUID, setField1UUID] = useState("");
  const [field2UUID, setField2UUID] = useState("");

  useEffect(() => {
    const newField1UUID = uuidv4();
    const newField2UUID = uuidv4();

    setField1UUID(newField1UUID);
    setField2UUID(newField2UUID);

    setTask((prevTask) => ({
      ...prevTask,
      publicId: newField1UUID,
      details: {
        ...prevTask.details,
        publicId: newField2UUID,
      },
    }));
  }, []);

  const [task, setTask] = useState({
    publicId: "",
    title: "",
    content: "",
    isDone: false,
    details: {
      publicId: "",
      created: todaysDate,
      deadline: "",
      reportTo: "",
      uplineEmail: "",
      uplineMobile: "",
    },
    priority: "HIGH",
  });

  const { publicId, title, content, isDone, details, priority } = task;
  const {
    publicId: detailsPublicId,
    created,
    deadline,
    reportTo,
    uplineEmail,
    uplineMobile,
  } = details;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
      details: {
        ...prevTask.details,
        [name]: value,
      },
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(task);
    const createdTask = await TaskService.createTask(task);
    setTask((prevTasks) => [createdTask, ...prevTasks]);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 boarder rounded p-1 mt-2 shadow">
          <h2 className="text-center m-4">Create task</h2>
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
              <DatePicker
                selected={deadline}
                onChange={(date) =>
                  onInputChange({ target: { name: "deadline", value: date } })
                }
                dateFormat="dd/MM/yyyy"
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
  );
}
