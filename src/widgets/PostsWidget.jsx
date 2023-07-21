import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/slice/authSlice";
import PostWidget from "./PostWidget";
import axios from "axios";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const url = `http://localhost:3001/api/v1/posts`;
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(url, { headers });
      const { data } = response;
      dispatch(setPosts({ posts: data }));
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const getUserPosts = async () => {
    try {
      const url = `http://localhost:3001/api/v1/posts/${userId}/posts`;
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(url, { headers });
      const { data } = response;
      dispatch(setPosts({ posts: data }));
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
