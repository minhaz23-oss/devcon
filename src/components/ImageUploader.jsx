'use client'
import { app } from "@/utils/firebase";
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";

const ImageUploader = ({setShowImageUploader,setImgUrl}) => {
    const imgPicker = useRef(null);
    const [selectedImage,setSelectedImage] = useState(null);
    const [imageFileUrl,setImageFileUrl] = useState(null);
    const [btnLoad,setBtnLoad] = useState(false);
    const [progressvar,setProgressbar] = useState('');
    const handleChange = (e) => {
       const file = e.target.files[0];
       if(file){
        setSelectedImage(file);
        setImageFileUrl(URL.createObjectURL(file));
       
       } else {
        console.log('file is not here')
       }
    }

    useEffect(() => {
        if(selectedImage){
          console.log("Selected image updated:", selectedImage);
            setBtnLoad(true)
            uploadImageToStorage();
        }
    },[selectedImage]);

    const uploadImageToStorage = () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' +selectedImage.name;
        const storageRef = ref(storage,fileName);
        const  uploadTask = uploadBytesResumable(storageRef,selectedImage);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress+ 'is uploaded')
                setProgressbar(progress);
            },
            (error) => {
              console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setImageFileUrl(downloadUrl);
                    setImgUrl(downloadUrl);
                    setBtnLoad(false);
                    setShowImageUploader(false)
                })
            }
        )
    }
  return (
    <section className=" backdrop-blur-sm w-full h-screen absolute top-0 left-0 flex flex-col justify-center items-center">
      <div className=" relative border-2 border-primary min-w-[300px] min-h-[100px] p-4 bg-white rounded-md flex flex-col justify-center items-center  ">
        <h1 className="text-[25px] text-primary font-black">Upload Photo</h1>
      <input hidden type="file" accept="image/*" ref={imgPicker} onChange={handleChange} />
      
      {selectedImage && (
        <div className="w-[300px] h-[250px]">
        <img src={imageFileUrl && imageFileUrl} alt="img Preview" className="w-full h-full "/>
        </div>
      )}
      <button onClick={() => imgPicker.current.click()} className="btn-primary mt-3 px-[25px]">{btnLoad ? `Loading..(${Math.round(progressvar)}%)` : "Select Image"}</button>
      <ImCross onClick={() => { 
              console.log('worked')
              setShowImageUploader(false)
             
              }} className="absolute top-3 right-5 text-primary text-[16px] hover:text-[18px] cursor-pointer" />
      </div>
    </section>
  )
}

export default ImageUploader;
