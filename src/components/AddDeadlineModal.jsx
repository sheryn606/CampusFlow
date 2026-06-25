import { useState } from "react";

function AddDeadlineModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    vibe: "Encouraging",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.dueDate
    ) {
      alert("Please fill all fields");
      return;
    }

    console.log(formData);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Add New Deadline</h2>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="vibe"
          value={formData.vibe}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>Encouraging</option>
          <option>Passive-Aggressive</option>
          <option>Drill Sergeant</option>
        </select>

        <button onClick={handleSubmit}>
          Submit
        </button>

        <button onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
};

export default AddDeadlineModal;