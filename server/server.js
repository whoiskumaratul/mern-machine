const express = require('express');
require('./mongodb/config')
const { ObjectId, ObjectId2 } = require('mongodb');
const multer = require('multer');
const path = require('path');
const router = express.Router();


const loginData = require('./schema/login')
const employee = require('./schema/employee')


const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Storage configuration for multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Specify the directory where files will be stored
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// Initialize multer with the storage configuration
//const upload = multer({ storage: storage });




app.post('/login', async (req, resp) => {
    const user = {
      username: req.body.username,
      password: req.body.password
    }
    if (!user.username || !user.password) {
      return resp.status(400).send("Username and password are required.");
    }  
    const existingUser = await loginData.findOne({ username: user.username  })  
  
    if (!existingUser) {
      return resp.status(400).send("User not found.");
    }
   
  
    if (existingUser.password !== user.password) {
      console.log('Invalid login details');
      return resp.status(401).send("Invalid password.");
    }
    else {
      return resp.status(200).send("login successful")
    }
  
  })

  app.get('/employee', async (req, resp) => {
    data = await employee.find();
    resp.send(data)
    console.log(data);
  })

  app.get('/employee/:_id', async (req, resp) => {
    try {
         let data = await employee.findOne({ _id  : req.params._id});
         
         if(!data){
             return resp.status(404).send("No Data found");
         }else{
             
            return resp.send(data);
         }    
     } catch(error){
         console.log("Error retrieving document", error);
         resp.status(500).send({error : "internal Server Error"})
     }
 })  


//  router.post('/createEmployee',  upload.single('photo'), async (req, res) => {
  app.post('/createEmployee',   async (req, res) => {
  try {
    const {
      name,
      email,
      mobileno,
      designation,
      gender,
      course,
      createdate,
     // photo,
     
    } = req.body;
   // const photoPath = req.file.path; 

    const newEmployee = new employee({
      name,
      email,
      mobileno: parseInt(mobileno), // Convert mobileno to a number
      designation,
      gender,
      course,
      createdate,
   //   photo: photoPath,
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
 


 app.put('/employee/:_id', async(req, resp) => {
  console.log(req.params)
  try{
      let data = await employee.updateOne(
                      // {} condition {name:abc}
                         req.params,
                      {
                         //$set updated data
                         $set :req.body
                      }
                   )
                    resp.send(data)
      console.log(data)
    } catch(error) {
      console.log('error', error);
      resp.status(500).json({error: 'Internal server error'});
  }
})

app.delete('/employee/:_id', async (req, resp) => {
  let data = employee.findByIdAndDelete(req.params._id)
  if (!data){
    return resp.status(200).json({message: "no record found with given id"})
  } else {
    resp.status(200).json({message: "Data deleted successfully", result:data})
  }
})


const dropDownOptions = ['HR', 'Manager', 'Sales'];

app.get('/api/dropdown', (req, resp) => {
  resp.json(dropDownOptions)
})


  app.listen(8000, () => {
    console.log("Server is running on port 8000");
})
