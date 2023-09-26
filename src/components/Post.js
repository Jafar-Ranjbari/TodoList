import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, deletePost, fetchPosts } from "../redux/todosSlice";

import "./../App.css";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [isEditing, setIsEditing] = useState(false);

  const { status } = useSelector((state) => state.posts);
  const handleUpdate = () => {
    dispatch(updatePost({ id: post.id, updatedPost: { ...post, title } }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(post.id));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch]);

  return (
    <div
      className="App"
      style={{
        border: "0.5px dashed grey",
        // margin: "5px",
        padding: "1px",
        marginBottom: "10px",
        width: "50%",
      }}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            style={{ color: "white", backgroundColor: "green" }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p>
            {post.title}
            <button
              variant="outlined"
              color="error"
              style={{ color: "blue" }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button style={{ color: "red" }} onClick={handleDelete}>
              Delete
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default Post;
