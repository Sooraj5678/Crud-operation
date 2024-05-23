import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import React, { useState ,useEffect } from "react";



const Course = () => {
const [data, setData] = useState([]);
const [eachData, seteachData] = useState('');
const [searchTerm, setsearchTerm] = useState(""); 



useEffect(() => {
  getData();
}, []);

function getData() {  
  axios
    .get("https://663b06c1fee6744a6ea00a43.mockapi.io/crud")
    .then((res) => {
      setData(res.data);
     
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
const filteredData = data.filter((eachData) => {
  return (
    searchTerm === "MCA",
    eachData.Course.toLowerCase().includes(searchTerm.toLowerCase())
    
  );
});

{filteredData
.map((eachData) => (
    <tr key={eachData.id}>
      <th scope="row">{eachData.Course}</th>
      
      </tr>
  ))}



  const handledata =()=>{

    if(eachData.Course == "MCA"){

        console.log('YES')
    }
    else{

        console.log("NO")
    }

  }
  return (
   
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Course</th>
            <th scope="col">Active&Inactive</th>
           
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>BCA</td>
            <td>
              <FormControlLabel control={<Switch   onClick={handledata}  />} />
            </td>
            
          </tr>
          
          <tr>
            <th scope="row">2</th>
            <td>MCA</td>
            <td>
              <FormControlLabel control={<Switch onClick={handledata} />} />
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Course;
