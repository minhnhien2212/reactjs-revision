import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './components/users';
import EditUser from './components/editUser';
import AddUser from './components/addUser';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users/>}></Route>
        <Route path="/addUser" element={<AddUser />}></Route>
        <Route path='/editUser/:id' element={<EditUser/>}></Route>      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
