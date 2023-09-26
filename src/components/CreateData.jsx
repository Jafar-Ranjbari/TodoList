// src/components/PostForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewData } from "../redux/todosSlice";

const CreateData = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      try {
        dispatch(postNewData({ title, body }));
        setTitle("");
        setBody("");
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Body:</label>
        <input value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default CreateData;
