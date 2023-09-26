import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, filterTodos } from "../redux/todosSlice";
import Post from "./Post";

const PostList = () => {
  const dispatch = useDispatch();
  const { filteredTodos, status, error, posts } = useSelector(
    (state) => state.posts
  );

  const [Datashow, SetdataShow] = useState(true);

  const handleFilterChange = (e) => {
    dispatch(filterTodos(e.target.value));
    SetdataShow(false);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        type="text"
        placeholder="Filter by title"
        style={{ width: "30%", margin: "2%" }}
        onChange={handleFilterChange}
      />
      {Datashow
        ? posts.map((post) => <Post key={post.id} post={post} />)
        : filteredTodos.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
