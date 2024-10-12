import { formatISO9075, format } from "date-fns";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import { useEffect, useState } from "react";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [cover, setCover] = useState("");
  const { isAuthenticated } = useAuthStore();
  const { id } = useParams();
  const { getPostById, deletePost } = usePostStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        console.log(response.data);
        setPostInfo(response.data);
        setCover(response.data.cover);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [getPostById, id]);

  const path = cover.replace("\\", "/");
  const imgURL = `http://localhost:5000/${path}`;

  if (!postInfo) {
    return <div>Loading...</div>;
  }
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(postInfo._id);
      navigate("/");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold mb-4">{postInfo.title}</h1>
      <time className="text-gray-500 mb-4 block">
        {format(new Date(postInfo.createdAt), "d-MMM-yyyy")}
      </time>

      <div className="mb-4 flex gap-5">
        {isAuthenticated && (
          <Link
            to={`/post/edit/${postInfo._id}`}
            className="flex items-center text-blue-500 hover:text-blue-700 transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
        )}
        {isAuthenticated && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white rounded px-4 py-2"
          >
            Delete Post
          </button>
        )}
      </div>

      <div className="mb-4">
        <img
          src={imgURL}
          alt=""
          className="w-full h-auto rounded-lg shadow-sm"
        />
      </div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
