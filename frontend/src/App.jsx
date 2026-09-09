import { useState, useEffect } from "react";
import UserForm from "./components/UserForm";

function App() {

  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [users, setUsers] = useState([]);

  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");



  const getUsers = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/users"
      );

      const data = await response.json();

      if (!response.ok) {

        setMessage(
          data.message || "Unable to fetch users"
        );

        return;
      }

      setUsers(data);

    } catch (error) {

      console.error(error);

      setMessage(
        "Server error. Please check backend."
      );

    }

  };




  useEffect(() => {

    getUsers();

  }, []);



  const saveUser = async () => {


    if (name.trim() === "") {

      setMessage("Name is required");

      return;
    }


    if (email.trim() === "") {

      setMessage("Email is required");

      return;
    }


    if (age === "" || Number(age) <= 0) {

      setMessage(
        "Age must be a positive number"
      );

      return;
    }


    const userData = {

      name: name.trim(),

      email: email.trim(),

      age: Number(age)

    };


    try {

      let url =
        "http://localhost:5000/api/users";

      let method = "POST";



      if (editId !== null) {

        url =
          `http://localhost:5000/api/users/${editId}`;

        method = "PUT";

      }


      const response = await fetch(url, {

        method: method,

        headers: {

          "Content-Type": "application/json"

        },

        body: JSON.stringify(userData)

      });


      const data = await response.json();



      if (!response.ok) {

        setMessage(
          data.message || "Something went wrong"
        );

        return;
      }


      

      setMessage(data.message);


     

      getUsers();


      

      setName("");

      setEmail("");

      setAge("");

      setEditId(null);


    } catch (error) {

      console.error(error);

      setMessage(
        "Server error. Please try again."
      );

    }

  };




  const editUser = (user) => {

    setEditId(user.id);

    setName(user.name);

    setEmail(user.email);

    setAge(user.age);

    setMessage("");

  };


 

  const deleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );


    if (!confirmDelete) {

      return;

    }


    try {

      const response = await fetch(
        `http://localhost:5000/api/users/${id}`,
        {
          method: "DELETE"
        }
      );


      const data = await response.json();


      if (!response.ok) {

        setMessage(
          data.message || "Delete failed"
        );

        return;

      }


      setMessage(data.message);

      getUsers();


    } catch (error) {

      console.error(error);

      setMessage(
        "Server error. Please try again."
      );

    }

  };




  const cancelEdit = () => {

    setEditId(null);

    setName("");

    setEmail("");

    setAge("");

    setMessage("");

  };


  

  return (

    <div className="container">

      <h1>
        User Management Application
      </h1>


      

      {message && (

        <p>
          {message}
        </p>

      )}


      

      <UserForm

        name={name}

        email={email}

        age={age}

        setName={setName}

        setEmail={setEmail}

        setAge={setAge}

        saveUser={saveUser}

        editId={editId}

        cancelEdit={cancelEdit}

      />



      <h2>
        User List
      </h2>


      <table border="1">

        <thead>

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Email</th>

            <th>Age</th>

            <th>Action</th>

          </tr>

        </thead>


        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>
                {user.id}
              </td>

              <td>
                {user.name}
              </td>

              <td>
                {user.email}
              </td>

              <td>
                {user.age}
              </td>

              <td>

                <button
                  onClick={() =>
                    editUser(user)
                  }
                >
                  Edit
                </button>


                {" "}


                <button
                  onClick={() =>
                    deleteUser(user.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}


export default App;