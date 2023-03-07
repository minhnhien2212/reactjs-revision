import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Users() {
      const [users, setUsers] = useState([
            {}
      ]);

      const [searchText, setSearchText] = useState('');

      const navigate = useNavigate();

      useEffect(() => {
            const initialUsers = JSON.parse(localStorage.getItem('users'));
            setUsers(initialUsers);
      }, []);

      const handleDelete = (index) => {
            if (window.confirm("Do you want to remove this user?")) {

            /**
             * This line creates a new array called updatedUsers by filtering the users array using the Array.filter() method. 
             * The filter function checks if the id of each user (u.id) is not equal to the id of the index object (index.id). 
             * The parseInt() function is used to ensure that the comparison is done on numbers instead of strings.
             */
            const updatedUsers = users.filter((u) => parseInt(u.id) !== parseInt(index));
            
            /**
             * This line stores the updated user list as a string in the localStorage using the localStorage.setItem() method. 
             * The JSON.stringify() method is used to convert the updatedUsers array to a JSON string.
             */
            localStorage.setItem('users', JSON.stringify(updatedUsers));          

            setUsers(updatedUsers);
            } 
      }

      const handleSearch = (e) => {
            e.preventDefault();
            const searchResults = users.filter(u=>u.name.indexOf(searchText) > -1);
            setUsers(searchResults);
    
        }

      return (
            <div>
                  <h2>Userlist</h2>
                  <button onClick={() => navigate(`/addUser`)} class="btn btn-primary">Add new user</button>

                  <form>
                        <input value={searchText} onChange={e => setSearchText(e.target.value)}></input>
                        <button onClick={handleSearch}>Search</button>
                  </form>
                  <hr />
                  <table class="table table-striped">
                        <thead>
                              <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                              </tr>
                        </thead>
                        <tbody>
                              {users.map(usr => (
                                    <tr>
                                          <td>{usr.id}</td>
                                          <td>{usr.name}</td>
                                          <td>{usr.email}</td>
                                          <td><button class="btn btn-primary" onClick={() => navigate(`/editUser/${usr.id}`)}>Edit</button></td>
                                          <td><button class="btn btn-primary" onClick={() => handleDelete(usr.id)}>Delete</button></td>
                                    </tr>
                              ))}
                        </tbody>
                  </table>
            </div>
      )
}