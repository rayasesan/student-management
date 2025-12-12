import { useState, useEffect } from 'react'
import { db } from './firebase'
import { ref, onValue, push, update, remove } from 'firebase/database'
import './index.css'

function App() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({ npm: '', name: '', email: '' })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const studentsRef = ref(db, 'students')
    
    const unsubscribe = onValue(studentsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const studentList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }))
        setStudents(studentList)
      } else {
        setStudents([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const showMessage = (text, type) => {
    setMessage({ text, type })
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!form.npm || !form.name) {
      showMessage('NPM and Name are required', 'error')
      return
    }

    try {
      if (editingId) {
        await update(ref(db, `students/${editingId}`), {
          ...form,
          updatedAt: new Date().toISOString()
        })
        showMessage('Student updated', 'success')
      } else {
        await push(ref(db, 'students'), {
          ...form,
          createdAt: new Date().toISOString()
        })
        showMessage('Student added', 'success')
      }
      
      setForm({ npm: '', name: '', email: '' })
      setEditingId(null)
    } catch (error) {
      showMessage('Error: ' + error.message, 'error')
    }
  }

  const handleEdit = (student) => {
    setForm({ 
      npm: student.npm, 
      name: student.name, 
      email: student.email || '' 
    })
    setEditingId(student.id)
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return
    
    try {
      await remove(ref(db, `students/${id}`))
      showMessage('Student deleted', 'success')
    } catch (error) {
      showMessage('Error: ' + error.message, 'error')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Student Management</h1>
        <p className="subtitle">CRUD Application</p>
      </header>

      {message && (
        <div className={`alert ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="form-card">
        <h2 className="form-title">
          {editingId ? 'Edit Student' : 'Add Student'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={form.npm}
            onChange={(e) => setForm({...form, npm: e.target.value})}
            className="input"
            placeholder="NPM"
            required
          />
          
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})}
            className="input"
            placeholder="Full Name"
            required
          />
          
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})}
            className="input"
            placeholder="Email"
          />
          
          <div style={{ marginTop: '20px' }}>
            <button type="submit" className="btn primary">
              {editingId ? 'Update Student' : 'Add Student'}
            </button>
            
            {editingId && (
              <button 
                type="button" 
                onClick={() => {
                  setForm({ npm: '', name: '', email: '' })
                  setEditingId(null)
                }}
                className="btn secondary"
                style={{ marginLeft: '10px' }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-card">
        <div className="table-header">
          <h2>Students List ({students.length})</h2>
        </div>
        
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>Loading data...</p>
          </div>
        ) : students.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            No students found
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>NPM</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.npm}</td>
                  <td>{student.name}</td>
                  <td>{student.email || '-'}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(student)}
                      className="btn primary"
                      style={{ padding: '6px 12px', marginRight: '8px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id, student.name)}
                      className="btn danger"
                      style={{ padding: '6px 12px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer className="footer">
        <p>Student Management System</p>
      </footer>
    </div>
  )
}

export default App