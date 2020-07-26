import React,{useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts,setPosts] = useState([]);
  const [open,setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);
  const [openSignIn,setOpenSignIn] = useState(false)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //user is loggedin
        console.log(authUser)
        setUser(authUser) 
      }else{
        // user has logged out
        setUser(null);
      }
    })

    return ()=>{
      unsubscribe();
    }
  },[user, username ])
  // useEffect runs a piece of code based on specific condition
  useEffect(()=>{
    //every time a new post is added, this code is fires
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc=>({
        id: doc.id,
        post: doc.data()
      }))) 
    })
  },[])

  const signUp = (e) =>{
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        setOpen(false)
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((err)=>alert(err.message))
  }

const signIn = async (e) =>{
  e.preventDefault();
  await auth.signInWithEmailAndPassword(email,password);
  setOpenSignIn(false);
}

  console.log(posts)
  return (
    <div>
    <div className="app">
        <Modal
          open={open}
          onClose={()=>setOpen(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>

              <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                />

                <Input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />

                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Button onClick={signUp}>Sign</Button>
            </form>
          </div>
      </Modal>

      <Modal
          open={openSignIn}
          onClose={()=>setOpenSignIn(false)}
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>
                <Input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <Button onClick={signIn}>SignIn</Button>
            </form>
          </div>
      </Modal>
      
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {
          user ? (
            <Button onClick={() =>auth.signOut()}>Logout</Button>
          ) : (
            <div className="app__loginContainer">
              <Button onClick={() =>setOpen(true)}>Sign up</Button>
              <Button onClick={() =>setOpenSignIn(true)}>Sign In</Button>
            </div>
          )}
      </div>
      <div className="app__posts">
        <div className="app__postsLeft">
          {
            posts.map(({id,post})=>(
              <Post
                key={id}
                user={user}
                postId={id} 
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
            />
            ))
          }
        </div>
        
        <div className="app__postsRight">
          <InstagramEmbed
            url='https://instagram.com/p/B_uf9dmAGPw/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
       
      </div>
        
    </div>
    <div>
        {
          user?.displayName ? (
            <ImageUpload username={user?.displayName}/>
          ) : (
            <h3>Sorry you need to login to upload</h3>
          )
        }
    </div>
    </div>
    
  );
}

export default App;
