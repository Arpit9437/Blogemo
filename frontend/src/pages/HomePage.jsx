import { useEffect, useState } from "react";
import { usePostStore } from "../store/postStore";
import Post from "../components/Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const { getPosts } = usePostStore();

  useEffect(() => {
    getPosts().then((response) => {
      setPosts(response);
    });
  }, [getPosts]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="w-full text-center my-7">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-poppins text-gray-900">
              Our Latest Blogs
            </h2>
            <p className="font-light font-poppins text-gray-500 sm:text-xl dark:text-gray-400">
              Thoughts Unleashed, Stories Shared
            </p>
          </div>
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {posts.length > 0 &&
              posts.map((post) => <Post key={post._id} {...post} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
