import React,{useState, useEffect} from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';

function Post({postId,imageUrl,username,caption,user}) {
    const [comments,setComments] = useState([]);
    const [comment,setComment] = useState('');

    const postComment = (e) =>{
        e.preventDefault();
        db.collection('posts').
            doc(postId).
            collection('comments').add({
                comment,
                username: user?.displayName,
                timestamp: new Date().getTime()
            });
        setComment('');
    }
     
    useEffect(()=>{
        let unsubscribe;

        if(postId){
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot)=>{
                    setComments(snapshot.docs.map((doc)=>doc.data()));
                });
        }

        return ()=>{
            unsubscribe();
        }
    },[postId])

    return (
        <div className="post">
            {/* header->avatar+username */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/statics"
                />
                <h3>{username}</h3>
            </div>

            <img
                className="post__image" 
                src={imageUrl}
                alt=""
            />


            <h4 className="post__text"><strong>{username}</strong> : {caption}</h4>

           <div className="post__comments">
            {
                comments?.map(comment =>(
                    <p>
                        <strong>{comment.username}</strong>
                        {comment.comment}
                    </p>
                ))
            }
           </div>
            {user && (<form className="post__commentBox">
                <input
                    className="post__input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                />
                <button
                    className="post__button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >Post</button>
            </form>)}
        </div>
    )
}

export default Post
