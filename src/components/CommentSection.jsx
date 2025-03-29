import { useState } from 'react';

const CommentSection = ({ comments = [] }) => {
  const [newComment, setNewComment] = useState('');
  
  // Handle comment input change
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  
  // Handle comment submission
  const handleSubmitComment = (e) => {
    e.preventDefault();
    // Comment submission logic would go here
    // For now, just clear the input
    setNewComment('');
    alert('Comment feature is coming soon!');
  };
  
  // Format the date for better readability
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>
      
      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
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
                  <button className="comment-action">
                    <span className="comment-action-icon">👍</span>
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
                            <button className="comment-action">
                              <span className="comment-action-icon">👍</span>
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