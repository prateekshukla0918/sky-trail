
// import { useState } from 'react';

// const CommentSection = ({ comments: initialComments = [] }) => {
//   const [comments, setComments] = useState(initialComments);
//   const [newComment, setNewComment] = useState('');
  
//   // Handle comment input change
//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };
  
//   // Handle comment submission
//   const handleSubmitComment = (e) => {
//     e.preventDefault();
//     // Comment submission logic would go here
//     // For now, just clear the input
//     setNewComment('');
//     alert('Comment feature is coming soon!');
//   };
  
//   // Format the date for better readability
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };
  
//   // Toggle like on a comment
//   const toggleLike = (commentId) => {
//     setComments(comments.map(comment => {
//       if (comment.id === commentId) {
//         // If the user has already liked it, decrease likes by 1, otherwise increase by 1
//         const newLikes = comment.liked ? comment.likes - 1 : comment.likes + 1;
//         return {
//           ...comment,
//           likes: newLikes,
//           liked: !comment.liked
//         };
//       }
//       return comment;
//     }));
//   };
  
//   // Toggle like on a reply
//   const toggleReplyLike = (commentId, replyId) => {
//     setComments(comments.map(comment => {
//       if (comment.id === commentId && comment.replies) {
//         const updatedReplies = comment.replies.map(reply => {
//           if (reply.id === replyId) {
//             const newLikes = reply.liked ? reply.likes - 1 : reply.likes + 1;
//             return {
//               ...reply,
//               likes: newLikes,
//               liked: !reply.liked
//             };
//           }
//           return reply;
//         });
        
//         return {
//           ...comment,
//           replies: updatedReplies
//         };
//       }
//       return comment;
//     }));
//   };
  
//   return (
//     <div className="comments-section">
//       <h3>Comments ({comments.length})</h3>
      
//       {/* Comments List */}
//       {comments.length > 0 ? (
//         <div className="comments-list">
//           {comments.map((comment) => (
//             <div key={comment.id} className="comment">
//               <img 
//                 src={comment.author.avatar} 
//                 alt={comment.author.name} 
//                 className="comment-avatar"
//               />
//               <div className="comment-content">
//                 <div className="comment-header">
//                   <span className="comment-author">{comment.author.name}</span>
//                   <span className="comment-date">{formatDate(comment.date)}</span>
//                 </div>
//                 <p className="comment-text">{comment.content}</p>
//                 <div className="comment-actions">
//                   <button 
//                     className="comment-action"
//                     onClick={() => toggleLike(comment.id)}
//                   >
//                     <span className="comment-action-icon">{comment.liked ? '❤️' : '🤍'}</span>
//                     <span>Like ({comment.likes})</span>
//                   </button>
//                   <button className="comment-action">
//                     <span className="comment-action-icon">💬</span>
//                     <span>Reply</span>
//                   </button>
//                 </div>
                
//                 {/* Comment Replies */}
//                 {comment.replies && comment.replies.length > 0 && (
//                   <div className="replies">
//                     {comment.replies.map((reply) => (
//                       <div key={reply.id} className="reply">
//                         <img 
//                           src={reply.author.avatar} 
//                           alt={reply.author.name} 
//                           className="comment-avatar"
//                         />
//                         <div className="comment-content">
//                           <div className="comment-header">
//                             <span className="comment-author">{reply.author.name}</span>
//                             <span className="comment-date">{formatDate(reply.date)}</span>
//                           </div>
//                           <p className="comment-text">{reply.content}</p>
//                           <div className="comment-actions">
//                             <button 
//                               className="comment-action"
//                               onClick={() => toggleReplyLike(comment.id, reply.id)}
//                             >
//                               <span className="comment-action-icon">{reply.liked ? '❤️' : '🤍'}</span>
//                               <span>Like ({reply.likes})</span>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="comments-empty">
//           <p>No comments yet. Be the first to share your thoughts!</p>
//         </div>
//       )}
      
//       {/* Comment Form */}
//       <form className="comment-form" onSubmit={handleSubmitComment}>
//         <h4 className="comment-form-title">Leave a Comment</h4>
//         <div className="comment-form-container">
//           <img 
//             src="https://randomuser.me/api/portraits/men/1.jpg" 
//             alt="Your Avatar" 
//             className="comment-form-avatar"
//           />
//           <div className="comment-form-input">
//             <textarea
//               className="comment-textarea"
//               placeholder="Share your thoughts about this destination..."
//               value={newComment}
//               onChange={handleCommentChange}
//               required
//             ></textarea>
//             <div className="comment-form-actions">
//               <button type="submit" className="submit-comment-btn">
//                 Post Comment
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CommentSection;
// '❤️' : '🤍'


import { useState } from 'react';

const CommentSection = ({ comments = [] }) => {
  // State for local comments to allow adding new ones
  const [localComments, setLocalComments] = useState(comments);
  const [newComment, setNewComment] = useState('');
  
  // Handle comment input change
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  
  // Handle comment submission
  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // Create a simple anonymous comment
    const comment = {
      id: String(Date.now()),
      author: {
        name: "Anonymous",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      liked: false // Add liked property for tracking like state
    };
    
    // Add to comments
    setLocalComments([...localComments, comment]);
    setNewComment('');
  };
  
  // Toggle like on a comment
  const toggleLike = (commentId) => {
    setLocalComments(localComments.map(comment => {
      if (comment.id === commentId) {
        // If the user has already liked it, decrease likes by 1, otherwise increase by 1
        const newLikes = comment.liked ? comment.likes - 1 : comment.likes + 1;
        return {
          ...comment,
          likes: newLikes,
          liked: !comment.liked
        };
      }
      return comment;
    }));
  };
  
  // Toggle like on a reply
  const toggleReplyLike = (commentId, replyId) => {
    setLocalComments(localComments.map(comment => {
      if (comment.id === commentId && comment.replies) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            const newLikes = reply.liked ? reply.likes - 1 : reply.likes + 1;
            return {
              ...reply,
              likes: newLikes,
              liked: !reply.liked
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    }));
  };
  
  // Format the date for better readability
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="comments-section">
      <h3>Comments ({localComments.length})</h3>
      
      {/* Comments List */}
      {localComments.length > 0 ? (
        <div className="comments-list">
          {localComments.map((comment) => (
            <div key={comment.id} className="comment">
              <img 
                src={comment.author.avatar} 
                alt={comment.author.name} 
                className="comment-avatar"
              />
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.author.name}</span>
                  <span className="comment-date">{formatDate(comment.date)}</span>
                </div>
                <p className="comment-text">{comment.content}</p>
                <div className="comment-actions">
                  <button 
                    className="comment-action"
                    onClick={() => toggleLike(comment.id)}
                  >
                    <span className="comment-action-icon">{comment.liked ? '❤️' : '🤍'}</span>
                    <span>Like ({comment.likes})</span>
                  </button>
                  <button className="comment-action">
                    <span className="comment-action-icon">💬</span>
                    <span>Reply</span>
                  </button>
                </div>
                
                {/* Comment Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="replies">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply">
                        <img 
                          src={reply.author.avatar} 
                          alt={reply.author.name} 
                          className="comment-avatar"
                        />
                        <div className="comment-content">
                          <div className="comment-header">
                            <span className="comment-author">{reply.author.name}</span>
                            <span className="comment-date">{formatDate(reply.date)}</span>
                          </div>
                          <p className="comment-text">{reply.content}</p>
                          <div className="comment-actions">
                            <button 
                              className="comment-action"
                              onClick={() => toggleReplyLike(comment.id, reply.id)}
                            >
                              <span className="comment-action-icon">{reply.liked ? '❤️' : '🤍'}</span>
                              <span>Like ({reply.likes})</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="comments-empty">
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
      
      {/* Comment Form */}
      <form className="comment-form" onSubmit={handleSubmitComment}>
        <h4 className="comment-form-title">Leave a Comment</h4>
        <div className="comment-form-container">
          <img 
            src="https://randomuser.me/api/portraits/men/1.jpg" 
            alt="Your Avatar" 
            className="comment-form-avatar"
          />
          <div className="comment-form-input">
            <textarea
              className="comment-textarea"
              placeholder="Share your thoughts about this destination..."
              value={newComment}
              onChange={handleCommentChange}
              required
            ></textarea>
            <div className="comment-form-actions">
              <button type="submit" className="submit-comment-btn">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;