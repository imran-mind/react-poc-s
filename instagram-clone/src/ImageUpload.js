import React,{useState} from 'react'
import { Button } from '@material-ui/core'
import { storage,db } from './firebase';
import "./ImageUpload.css";

function ImageUpload({username}) {
    const [caption,setCaption] = useState(null);
    const [image,setImage] = useState('');
    const [progress,setProgress] = useState(0);

    const handleChange = (e)=>{
        if(e.target.files.length && e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
    
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress logic is here
                const progressNum =  Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log('progressNum=> ',progressNum)
                console.log('snapshot.totalBytes : ',snapshot)
                console.log('snapshot.bytesTransferred : ',snapshot.bytesTransferred)
                setProgress(progressNum);
            },
            (error)=>{
                // Error function
                console.log(error);
                alert(error.message);
            },
            ()=>{
                // complete function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        console.log(progress)

                        //post image inside into db
                        db.collection('posts').add({
                            timestamp: new Date().getTime(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        })
                    });
                    setProgress(0);
                    setCaption('');
                    setImage(null);
            }
        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100"/>
            <input
                type="text"
                placeholder="Enter a caption ..."
                value={caption}
                onChange={(e)=> setCaption(e.target.value)}
                />
            <input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
