import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditUser() {

      /**
       * Retrieves the id parameter from the URL using the useParams hook 
       * and assigns it to the editId constant.
       */
      const editId = useParams().id;

      const [user, setUser] = useState({});

      const navigate = useNavigate();

      useEffect(() => {

            /**
             * Inside the effect function, the first line retrieves the users data from the local storage 
             * and parses it from a JSON string to a JavaScript object using the JSON.parse method.
             */
            const initialUsers = JSON.parse(localStorage.getItem('users'));
            
            /**
             * using the find method on the initialUsers array, the code searches for a user object 
             * whose id property matches the editId value (which was retrieved from the URL parameters)
             */
            const user = initialUsers.find((u) => parseInt(u.id) === parseInt(editId));
            
            /**
             * Once it finds the matching user object, it sets the state of the user object 
             * to the matching user using the setUser function.
             */
            setUser(user);

            console.log(user);
      }, [editId]); // Adding [editId] at the end of the useEffect hook's dependency array specifies that the effect should run whenever the editId value changes.

      const handleChange = (e) => {
            let name = e.target.name;
            let value = e.target.value;
            const updatedForm = ({ ...user, [name]: value });
            setUser(updatedForm);
            console.log(name, value);
      }

      const handleSubmit = (e) => {
            e.preventDefault();
  
            const initialUsers = JSON.parse(localStorage.getItem('users'));
          
            const userIndex = initialUsers.findIndex((u) => parseInt(u.id) === parseInt(editId));
          
            const updatedUser = { ...user };
          
            initialUsers[userIndex] = updatedUser;
          
            localStorage.setItem('users', JSON.stringify(initialUsers));
            
            console.log(updatedUser);

           navigate('/');
      }

      return(
            <>
                  <h2>Edit user</h2>
                  <form onSubmit={handleSubmit}>
                        <div>
                              <label>Id</label>
                              <input disabled name="id" value={user.id}/>
                        </div>
                        <div>
                              <label>Name</label>
                              <input name="name" onChange={handleChange} value={user.name}/>
                        </div>
                        <div>
                              <label>Email</label>
                              <input name="email" onChange={handleChange} value={user.email}/>
                        </div>
                        <button type='submit'>Save</button>
                  </form>

            </>
      )
}