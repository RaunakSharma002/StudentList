import React, { useState, useEffect } from 'react';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', age: '', email: '' });

  // Fetching student data from the backend (to be implemented later)
  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addStudent = () => {
    fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(() => window.location.reload());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Student List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} style={{ backgroundColor: student.id % 2 === 0 ? '#f9f9f9' : '#fff' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.id}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.age}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ color: '#4CAF50' }}>Add Student</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={formData.id}
          onChange={handleInputChange}
          style={{ padding: '10px', width: '20%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          style={{ padding: '10px', width: '20%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          style={{ padding: '10px', width: '20%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ padding: '10px', width: '20%', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          onClick={addStudent}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Student
        </button>
      </div>
    </div>
  );
};

export default StudentTable;