import { formatISO9075, format } from "date-fns";

const Post = ({ _id, title, summary, content, cover, createdAt }) => {
  const path = cover.replace("\\", "/");
  const imgURL = `http://localhost:5000/${path}`;

  return (
    <div className="group w-full max-w-xl border border-gray-300 rounded-2xl shadow-md">
      <div className="flex items-center">
        <img
          src={imgURL}
          alt={title}
          className="rounded-t-2xl w-full object-cover"
        />
      </div>
      <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
        <time className="text-blue-500 font-medium mb-3 block">
          {format(new Date(createdAt), 'd-MMM-yyyy')}
        </time>
        <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
          {title}
        </h4>
        <p className="text-gray-500 leading-6 mb-10">
          {summary}
        </p>
        <a
          href={`/post/${_id}`}
          className="cursor-pointer text-lg text-blue-500 font-semibold"
        >
          Read more..
        </a>
      </div>
    </div>
  );
};

export default Post;
