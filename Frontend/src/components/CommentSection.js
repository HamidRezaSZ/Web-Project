import React, { useState } from "react";
import { useSelector } from "react-redux";

function CommentSection({comments=[]}) {

    const [comment, setComment] = useState('')

    const Comments = () => {
        console.log(comments);
        const mapped = comments.map(({text}) => {
            return (
                <li className="list-group-item">
                    {text}
                </li>
            );
        });
        return (
            <>
                <ul className="list-group">
                    {mapped}
                </ul>
            </>
        );
    }

    const userState = useSelector(state => state.user);

    const handleComment = (event) => {
        event.preventDefault();
        if (!userState.isLoggedIn) {
            alert('You must login first!');
        } else {
            alert(comment);
        }
     };

    return (
        <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#commentSentionModal">
            Comments
        </button>

        <div className="modal fade modal-lg" id="commentSentionModal" tabindex="-1" aria-labelledby="commentSentionModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="commentSentionModal">Comments</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {Comments()}
                    </div>
                    <div className="modal-footer">
                        <div className="container-fluid">
                            <form onSubmit={handleComment}>
                                <div className="form-group">
                                    <label htmlFor="commentText">Write your opinion</label>
                                    <input type="text" className="form-control" id="commentText" placeholder="Enter your comment!" required onChange={e => setComment(e.target.value)}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}

export default CommentSection;
