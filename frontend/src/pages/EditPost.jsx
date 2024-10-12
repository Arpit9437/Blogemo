import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Editor from "../Editor";
import { usePostStore } from "../store/postStore";

const EditPost = () => {
    const { id } = useParams();
    const { putPost, getPostById } = usePostStore();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await getPostById(id);
          const post = response.data;
          setTitle(post.title);
          setSummary(post.summary);
          setContent(post.content);
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
  
      fetchPost();
    }, [id]);
  
    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        
        if (files?.[0]) {
            data.set('file', files[0]);
        }
    
        await putPost(data);
        navigate(`/post/${id}`);
    }

  return (
    <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={updatePost}>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-lg font-medium text-gray-800 mb-1 font-poppins">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
                    />
                </div>

                <Editor value={content} onChange={setContent} />

                <input type="file" className="mt-5" onChange={e => setFiles(e.target.files)} />

                <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 mt-5 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-400 focus:outline-none font-poppins">Update Post</button>
                </div>
            </form>
        </div>
  );
};

export default EditPost;
