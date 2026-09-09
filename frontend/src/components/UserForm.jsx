function UserForm({
  name,
  email,
  age,
  setName,
  setEmail,
  setAge,
  saveUser,
  editId,
  cancelEdit
}) {

  return (

    <div>

      <h2>
        {editId !== null
          ? "Update User"
          : "Add User"}
      </h2>


      

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />


      <br />
      <br />



      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />


      <br />
      <br />



      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) =>
          setAge(e.target.value)
        }
      />


      <br />
      <br />



      <button onClick={saveUser}>

        {editId !== null
          ? "Update User"
          : "Save User"}

      </button>


      {" "}



      {editId !== null && (

        <button onClick={cancelEdit}>
          Cancel
        </button>

      )}

    </div>

  );

}

export default UserForm;