
import React, { useEffect, useState } from 'react'
import './Post.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import './Post.css';

function Post() {

    const navigate = useNavigate();
    const {_id} = useParams();
 
    const [post, setPost] = useState({
        name : '',
email: '',
mobileno: '',
designation: '',
gender: '',
course: '',
    });

    useEffect(() => {
        if(_id === 'new') return;
        const fetch = async() => {
            const {data} = await axios.get(`http://localhost:8000/employee/${_id}`);
            setPost(data);
        };
        fetch();

    }, [_id])

   
    const handleChange =   (e) => {
        const postClone = {...post};
        
        postClone[e.target.name] = e.target.value;
        setPost(postClone);
        console.log("after clicked on update button" , postClone);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handle submit --->", e.preventDefault)
        
       
        try {
            if(_id === 'new'){
               
                axios.post(`http://localhost:8000/post` , post);
                return navigate('/employeelist');
            } else {
              
              const box =  await axios.put(`http://localhost:8000/employee/${_id}`, post);
              console.log("-------------> /post ka data status"  , box)
                
                return navigate("/employeelist")
            }
        }
        catch (error) {
            console.log(error);
            throw error; // Add this line to propagate the error
        }        
    }

  return (
    <div>
    
    <div className='max-w-[1220px] mx-auto'>
        <div className='bts text-center p-4 mb-12 mt-12'>
        <div className='grid lg:grid-cols-1 ml-5 mr-5 pr-5 pl-5   mb-12'>
        <div className=''>
            <form className=''>
            <div className='grid lg:grid-cols-1'>

            
            Name
                <input type="text"
                placeholder='username'
                value={post.name}
                name="name"
                onChange={handleChange}
                />


email
                <input type="text"
                placeholder=' email'
                value={post.email}
                name="email"
                onChange={handleChange}
                />


mobileno
                <input type="text"
                placeholder=' mobileno'
                value={post.mobileno}
                name="mobileno"
                onChange={handleChange}
                />

designation
                <input type="text"
                placeholder=' designation'
                value={post.designation}
                name="designation"
                onChange={handleChange}
                />


gender
                <input type="text"
                placeholder=' gender'
                value={post.gender}
                name="gender"
                onChange={handleChange}
                />

                
course
                <input type="text"
                placeholder=' course'
                value={post.course}
                name="course"
                onChange={handleChange}
                />

<div>
<button onClick={handleSubmit} 
      className="mt-6 bg-blue-800 pl-6 pr-6 pt-1 pb-1 text-white">
      {_id === 'new' ? 'Add Data': "Update"}
      </button>
      </div>


</div>
            </form>
            </div>
        </div>
        </div>
        </div>
    
    
    </div>
  )
}

export default Post