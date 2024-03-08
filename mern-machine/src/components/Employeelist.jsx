import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'

function Employeelist() {
  
  const [posts, setPosts] = useState([]); 
  
  const navigate = useNavigate();
  
  useEffect(() => {
      const fetch = async () => {
          const {data} = await axios.get('http://localhost:8000/employee');
            setPosts(data);
          console.log("--> home dir ka data", data)
           
      };
      fetch();
  },  [])

  const handleDelete = async (post) => {
      try {
        setPosts(posts.filter(p=> p._id !== post._id))
        await axios.delete(`${`http://localhost:8000/employee`}/${post._id}`);
       
      }
      catch (error){
     console.log(error);
      }
      }
 
  return (
    <div>
    <div className=' grid lg:grid-cols-1 text-left ml-5  '>
        <div className=' uppercase tracking-wide text-gray-700 text-xs font-bold '>
            <h1 className='mt-5' >/Employee List</h1>
          </div>

          
      <div className=' max-w-[1020px] mx-auto '>
        <div className='bts text-center ml-4 mr-4 p-4 mb-12 overflow-x-auto overflow-scroll overflow-y-auto w-full'>
        <div className='grid lg:grid-cols-1    mb-12 '>
        <div className='text-sm  '>
        <table className='w-full py-6  selection:text-red-500 '>
            <thead className='uppercase '>
            <th className='p-5'>Image</th>
                    <th className=''>Name</th>
                    <th className=''>Email</th>
                    <th className=''>Mobile no</th>
                    <th className=''>Designation</th>
                    <th className=''>Gender</th>
                    <th className=''>Course</th>
                    <th className=''>Create Date</th>
                    <th className=''>Action</th>
            </thead>
            <tbody>
                {posts.map((post) => (
                    <tr key={post._id}>
                    <td>{post.name}</td>
                    <td>{post.email}</td>
                    <td>{post.mobileno}</td>
                    <td>{post.designation}</td>
                    <td>{post.gender}</td>
                    <td>{post.course}</td>
                    <td>{post.createdate}</td>
                    <td><button onClick={() => navigate(`/post/${post._id}`)} className=" bg-blue-600 pl-4 pr-4 pt-1 pb-1  text-white">Update</button></td>
                    <td><button onClick={() => handleDelete(post)} className="bg-yellow-600 pl-4 pr-4 pt-1 pb-1  text-white">Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
        </div>
      </div>

           
          </div></div>
  )
}

export default Employeelist