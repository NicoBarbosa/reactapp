import './style.css'
import { Card, PropsType } from '../../components/Card'
import React, { useState, useEffect } from 'react'

type ProfileResponse = {
  name: string,
  avatar_url: string
}
type User = {
  name: string,
  avatar: string
}

function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState<PropsType[]>([])
  const [count, setCount] = useState(0)
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudents() {
    const newStudent = {
      id: count,
      nome: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setCount((count) => count + 1)

    setStudents(preState => [...preState, newStudent])

  }
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/NicoBarbosa')
      const data = await response.json() as ProfileResponse
      
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    fetchData()
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>
      <input 
      type="text" 
      placeholder="Digite o nome..."
      onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudents}>Adicionar</button>

      {
        students.map(student => (
        <Card 
          key={student.id}
          id={student.id}
          nome={student.nome} 
          time={student.time}
        />))
      }

    </div>
  )
}

export default Home
