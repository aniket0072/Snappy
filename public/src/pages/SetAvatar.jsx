import React, { useEffect, useState } from 'react'
import {useNavigate,useHistory,Navigate  } from 'react-router-dom';
import { Buffer } from "buffer";
import styled from "styled-components";
import Loader from "../Assets/loader.gif"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { setAvatarRoute } from '../utils/APIroutes';

export default function SetAvatar() {
  // let history = useHistory();
  const navigate=useNavigate();
const [avatars,setAvatars]=useState([]);
const [isLoading,setIsLoading]=useState(true);
const [selectedAvatar,setSelectedAvatar]=useState(undefined);

const toastOptions={
    position:"bottom-right",
   autoclose:8000,
   pauseOnHover:true,
   draggable:true,
   theme:"dark"};

   useEffect( ()=>{
        if(!localStorage.getItem(`chat-app-user`)){
            navigate(`/Login`)
          }  
   },[])

   const api = `https://api.multiavatar.com/4645646`;
const setProfilePicture=async ()=>{
    console.log("dsgs");
if(selectedAvatar===undefined){
    toast.error("please select an avatar ",toastOptions)
}else{
    const user=await JSON.parse(localStorage.getItem(`chat-app-user`));
    console.log(user);
    console.log(selectedAvatar)
    const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      })
      console.log(data.isSet,user.isAvatarImageSet,user.avatarImage);
      
      
      //   if(localStorage.getItem(`chat-app-user`)){
      //    // navigate(`/`)
      //  //  history.push("/");
      //   }
           if(data.isSet){
        user.isAvatarImageSet=true;
        user.avatarImage=data.image;
        localStorage.setItem("chat-app-user",JSON.stringify(user));
        console.log("moved to chat ");
        navigate(`/`);
 
    }
    else{
        toast.error("error setting avatar please try again  ",toastOptions)
    }
     
}

 }

 const fx=async ()=>{
  const data=[];
  for(let i=0;i<4;i++){
    const image=await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
    const buffer=new Buffer(image.data);
    data.push(buffer.toString("base64"));
  }
  setAvatars(data);
  setIsLoading(false);
}
useEffect( ()=>{
  fx();

},[]);
  return (
      <>
      {isLoading?<Container>
              <img src={Loader}></img>
          </Container>:(
        <Container>
        <div className="title-container">
        <h1>Pick an avatar as your profice picture</h1>
        </div>
        <div className="avatars">
            {avatars.map((Avatar,index)=>{
                return <div 
                key={index} 
                className={`avatar ${
                    selectedAvatar===index?"selected":""
                }`}>
                    <img src={`data:image/svg+xml;base64,${Avatar}`} alt="avatar" onClick={()=>setSelectedAvatar(index) }/>
                </div>
            })}
        </div>
        <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
    </Container>
    )}
    <ToastContainer> </ToastContainer>
    </> 
    )
}

const Container=styled.div` display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.loader {
  max-inline-size: 100%;
}
.title-container {
  h1 {
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;
  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
}
.submit-btn {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
`;
