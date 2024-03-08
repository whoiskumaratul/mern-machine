import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Home() {
 
  const navigate = useNavigate();


 const [name, setName] = useState();
 const [email, setEmail] = useState();
 const [mobileno, setMobileno] = useState();
 const [designation, setDesignation] = useState();
 const [gender, setGender] = useState('');  // New state for radio button
  const [course, setCourse] = useState([]);  // New state for checkboxes
 
  const [photo, setPhoto] = useState(null);
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleCheckboxChange = (value) => {
    // Check if the value is already in the array
    if (course.includes(value)) {
      // If yes, remove it
      setCourse(course.filter((item) => item !== value));
    } else {
      // If not, add it
      setCourse([...course, value]);
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/createEmployee', {
        name,
        email,
        mobileno,
        designation: selectedOption,
        gender,
        course,
       photo,
    
        
      });
      if (response.status === 200){
        return navigate('/employeelist')
      }

      console.log(response.data); 
      
      setName('');
      setEmail('');
      setMobileno('');
      setDesignation('');
      setGender('')
      setCourse('');
      setPhoto('');
    } catch (error) {
      console.error('Error adding employee:', error.message);
      
    }
  };

    // const options1 = ['HR', 'Manager', 'Sales'];
    // const onOptionChangeHandler = (event) => {
    //     console.log("Use Selected Value", event.target.value);
    // }
  
    const [dropdownData, setDropdowndata] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');


    useEffect(() =>{
      const fetchData = async () =>{
        try {
          const response = await axios.get('http://localhost:8000/api/dropdown');
          setDropdowndata(response.data);
        } catch(error){
          console.log('Erro fetching dropdown data: ', error.message)
        }
      };

      fetchData();
    }, []);


  return (

   

    <div>
     <div className=' grid lg:grid-cols-1 text-left ml-5  '>
        <div className=' uppercase tracking-wide text-gray-700 text-xs font-bold '>
            <h1 className='mt-5' >/Create Employee</h1>
          </div>
           
          </div>

    
    
          <div class="grid grid-cols-1  ml-20 mt-[50px] mr-20  ">
      {/* max-w-lg */}
      

        {/* <form
          class="w-full "

          className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  "
          enctype="multipart/form-data"
          
        > */}
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="name"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your Name"

                value={name}
                 onChange={(e) => setName(e.target.value)}
                name="name"
                
                
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              />


            </div>

            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="email"
              >
                Email{" "}
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                name="email"
                
                
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />

             
            </div>
          </div>

         

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="Mobile No"
              >
                Mobile No
              </label>
              <input
                type="text"
                placeholder="Enter your mobile no"
                name="mobileno"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={mobileno} onChange={(e) => setMobileno(e.target.value)}
              />
             
            </div>

            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="Designation"
              >
                Designation
              </label>
             {/* <select onChange={onOptionChangeHandler} className="dropdown-button  w-full bg-white p-2 border text-xs/[12px] py-3 px-4 ">
             
            <option> Please Select Designation</option>
                          {options1?.map((option, index) => {
                              return <option key={index}  >
                             
                                  {option}
                              </option>
                          })}
                          
                      </select> */}
                      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}
                      className="dropdown-button  w-full bg-white p-2 border text-xs/[12px] py-3 px-4 "
                      
                      >
        <option 
                      value={designation} onChange={(e) => setMobileno(e.target.value)} disabled>Select an option</option>
        {dropdownData.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {selectedOption && (
        <p>You selected: {selectedOption}</p>
      )}
            </div>

          </div>


          <div class="flex flex-wrap -mx-3 mb-6">
          
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="Skills"
              >
                Gender
              </label>
              
              <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={() => setGender('male')}
          />
          <label for="male" className="px-2">
            Male
          </label>

          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={() => setGender('female')}
          />
          <label for="female" className="px-2">
            Female
          </label>

            </div>

            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="Skills"
              >
                Course
              </label>

              <input
            type="checkbox"
            id="mca"
            name="course"
            value="MCA"
            checked={course.includes('MCA')}
            onChange={() => handleCheckboxChange('MCA')}
          />
          <label for="mca"> MCA </label>

          <input
            type="checkbox"
            id="bca"
            name="course"
            value="BCA"
            checked={course.includes('BCA')}
            onChange={() => handleCheckboxChange('BCA')}
          />
          <label for="bca"> BCA </label>

          <input
            type="checkbox"
            id="bsc"
            name="course"
            value="BSC"
            checked={course.includes('BSC')}
            onChange={() => handleCheckboxChange('BSC')}
          />
          <label for="bsc"> BSC </label>
        
              {/* <input
                type="text"
                placeholder="Enter your Skills"
                name="skills"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              
              /> */}
             
            </div>

            

          </div>

         
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="photo"
              >
                Upload Photo{" "}
              </label>
              <input
                type="file"
  name="photo"
  onChange={handleFileChange}
                placeholder="Enter your Photo"
               
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                encType="multipart/form-data"
                
              />
              
            </div>
          </div>

          {/* {<a href={post.project}>View</a>} */}

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              
            </div>
          </div>
          {/* <button onClick={handleSubmit}  className='bg-blue-600 text-white pt-2 pb-2 pr-3 pl-3 mt-3'>
          {id === "new" ? "Signin" : "Update"}
        </button>
  */}

          <button className="bg-blue-600 text-white pt-2 pb-2 pr-3 pl-3 mt-3"
          onClick={handleSubmit}
          >
            Add Employee
          </button>

          <div>
            
          </div>
        {/* </form> */}
      </div>
    
    
    
    </div>
  )
}

export default Home