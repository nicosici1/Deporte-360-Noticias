import  { useState, useEffect } from 'react';

const CommentSection = ({ entityId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:2222/api/comments/${entityId}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        throw new Error('Error fetching comments');
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const commentData = {
        comentario: newComment,
        fecha_publicacion: new Date().toISOString(),
        entityId: entityId
      };

      const response = await fetch('http://localhost:2222/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(commentData)
      });

      if (!response.ok) {
        throw new Error('Error creating comment');
      }

      setNewComment('');
      setError('');
      fetchComments();
    } catch (error) {
      console.error(error);
      setError('Error creating comment. Please try again.');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
      {comments.map((comment, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
          <p>{comment.comentario}</p>
          <p className="text-gray-500">Fecha de publicación: {new Date(comment.fecha_publicacion).toLocaleString()}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-4"
          placeholder="Escribe tu comentario..."
        ></textarea>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Comentar
        </button>
      </form>
    </div>
  );
};

export default CommentSection;