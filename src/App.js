
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [formData, setFormData] = useState({ name: '', message: '' });
  // const [searchName, setSearchName] = useState('');
  // const [fetchedUser, setFetchedUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/");
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append("name", formData.name);
      params.append("message", formData.message);

      const response = await axios.post("http://localhost:8080/api/users?name="+formData.name+"&message="+ formData.message);
      console.log("Response:", response.data);
      alert("User added successfully!");
      setFormData({ name: '', message: '' });
      getAllUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  // const handleFetchUser = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/users", {
  //       params: { name: searchName }
  //     });
  //     setFetchedUser(response.data);
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //     alert("User not found or fetch failed");
  //   }
  // };

  // const handleFetchAllUsers = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/users/");
  //     setAllUsers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //     alert("Failed to fetch users");
  //   }
  // };

  useEffect(() => {
    getAllUsers();
  }, []);


  return (
    <div className="App">
        <h2>React Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message: </label>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {/* {/* <hr style={{ margin: '2rem 0' }} />

{/* 🔎 Get User Section */}
{/* <h3>Fetch User by Name</h3>
<div>
  <input
    type="text"
    placeholder="Enter name to search"
    value={searchName}
    onChange={(e) => setSearchName(e.target.value)}
  />
  <button onClick={handleFetchUser}>Get User</button>
</div>

{fetchedUser && (
  <div style={{ marginTop: '1rem' }}>
    <p><strong>Name:</strong> {fetchedUser.name}</p>
    <p><strong>Message:</strong> {fetchedUser.message}</p>
  </div>
)}  */} 

 {/* 🔽 Horizontal Line */}
 <hr style={{ margin: '2rem 0' }} />

{/* 📋 Get All Users Section */}
<h3>All Users</h3>
{/* <button onClick={handleFetchAllUsers}>Get All Users</button> */}

{allUsers.length > 0 && (
  <table style={{ marginTop: '1rem', borderCollapse: 'collapse', width: '100%' }}>
    <thead>
      <tr>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
        <th style={{ border: '1px solid #ccc', padding: '8px' }}>Message</th>
      </tr>
    </thead>
    <tbody>
      {allUsers.map((user, index) => (
        <tr key={index}>
          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.name}</td>
          <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.message}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

    </div>
  );
}

export default App;
