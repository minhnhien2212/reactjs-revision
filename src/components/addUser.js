import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './users.css';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function AddUser() {

      const REGEX = {
            name: /^[a-zA-Z][a-zA-Z0-9]{1,48}$/,
            email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
      }

      const [user, setUser] = useState({});

      const editId = useParams().id;

      const[isValid, setIsValid] = useState(false);

      const navigate = useNavigate();

      const handleChange = (e) => {
            /**
             *  the first two lines get the name and value of the changed input field 
             * using the name and value properties of the target object of the event object (e).
             */
            let name = e.target.name;
            let value = e.target.value;

            /**
             * Then, the updatedForm constant is defined using the spread operator (...user) 
             * to create a new object with all the properties of the current user object, 
             * and then the new name and value properties are added to this object using the computed property syntax ([name]: value).
             */
            const updatedForm = ({ ...user, [name]: value });

            /**
             * Finally, the setUser function is called with the updatedForm object 
             * as an argument to update the state of the user object with the new values.
             */
            setUser(updatedForm);
            checkInvalidForm(updatedForm);
      }

      const handleValidate = (e) => {
            const errors = {};

            if (!user.name) {
                  errors.name = "Your name is required";
                  } else if (!REGEX.name.test(user.name)) {
                  errors.name = "Your name must be under 50 characters long."
            }
            
            if (!user.email) {
                  errors.email = "Your email is required";
                  } else if (!REGEX.email.test(user.email)) {
                  errors.email = "Invalid email address";
            }

            return errors;
      }

      const checkInvalidForm = ({ name, email }) => {
            const value = name && email;
            setIsValid(value);
      };

      const handleSubmit = (e) => {

            if (isValid) {
                  /* In the above code, we are first checking if any users exist 
                  * in the localStorage by calling JSON.parse(localStorage.getItem('users')) || []. 
                  * If there are no users, we initialize the initialUsers array with an empty array.*/
                  const initialUsers = JSON.parse(localStorage.getItem('users')) || [];
            
                  /*
                  * Then we use the reduce function to find the maximum ID among all the users 
                  * in the initialUsers array. 
                  * We add 1 to this maximum ID to get the new ID for the user.
                  */
                  const maxId = initialUsers.reduce((max, user) => Math.max(max, user.id), 0);
            
                  /**
                   * Next, we create the updatedUser object by copying all the properties of the user object 
                   * using the spread operator (...user). 
                   * We also set the id property of the updatedUser object to the new ID we just calculated.
                  */
                  const newUser = { ...user, id: maxId + 1 };
            
                  /**
                   * We then find the index of the user whose ID matches with the editId parameter. 
                   * If the index is -1, it means that we are adding a new user, so we push the updatedUser object to the initialUsers array. 
                   * Otherwise, we update the existing user in the initialUsers array with the updatedUser object.
                   */
                  const userIndex = initialUsers.findIndex((u) => parseInt(u.id) === parseInt(editId));

                  if (userIndex === -1) {
                  initialUsers.push(newUser);
                  } else {
                  initialUsers[userIndex] = newUser;
                  }
            
                  /*
                  * Finally, we save the initialUsers array back into localStorage using localStorage.setItem('users', JSON.stringify(initialUsers)), 
                  * and navigate back to the home page using navigate('/').
                  */
                  localStorage.setItem('users', JSON.stringify(initialUsers));
            
                  console.log(newUser);

                  alert("User added succesfully");
            
                  navigate('/');  
            }
      }

      return(
            <>
                  <h2>Add new user</h2>
                  <Formik
                            initialValues={user}
                            validate={handleValidate}
                            onSubmit={handleSubmit}>  

                        {({errors, handleSubmit}) => (
                              <form onSubmit={handleSubmit}>
                                    <div
                                          class="mb-3 form-check"
                                          className={`custom-input ${
                                          errors.name ? "custom-input-error" : ""
                                    }`}>
                                          <label>Name</label>
                                          <input type="text" name="name" 
                                          value={user.name || ""}
                                          onChange={handleChange}/>  
                                          
                                          <p className="errors">{errors.name}</p>
                                  </div>

                                    <div
                                          class="mb-3 form-check"
                                          className={`custom-input ${
                                          errors.name ? "custom-input-error" : ""
                                    }`}>
                                          <label>Email</label>
                                          <input type="email" name="email" 
                                          value={user.email || ""}
                                          onChange={handleChange}/>

                                          <p className="errors">{errors.email}</p>

                                    </div>
                                    <button type='submit' class="btn btn-primary">Save</button>
                              </form>
                        )}                

                  </Formik>

            </>
      )
}