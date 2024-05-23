import './App.css';
import Page1 from "./components/Page1"
import Read from './components/Read';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from './components/Update';
import Course from './components/Course';



function App() {
  
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
          <Route path="/course" element={<Course />} />
          
         
           </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
