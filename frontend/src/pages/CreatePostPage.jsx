import { useState } from "react";
import {useNavigate} from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";
import { usePostStore } from "../store/postStore";

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const {addPosts} = usePostStore();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const post = {
            title,
            summary,
            content,
            files
          };
          await addPosts(post);
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-lg font-medium text-gray-800 mb-1 font-poppins">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                
                <div className="mb-6">
                    <label htmlFor="summary" className="block text-lg font-medium text-gray-800 mb-1 font-poppins">Summary</label>
                    <input
                        type="text"
                        id="summary"
                        name="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>

                <Editor value={content} onChange={setContent} />

                <input type="file" className="mt-5" onChange={e => setFiles(e.target.files)} />

                <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 mt-5 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 focus:outline-none font-poppins">Create Post</button>
                </div>
            </form>
        </div>
  )
}

export default CreatePostPage