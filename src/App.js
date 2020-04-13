import React, { useState } from 'react'
import { AddUserForm } from './forms/AddUserForm'
import { EditUserForm } from './forms/EditUserForm'
import { UserTable } from './tables/UserTable'
import './App.css'

const App = () => {
  const usersData = [
    { id: 1, name: 'Таня', username: 'Иванова' },
    { id: 2, name: 'Макс', username: 'Петров' },
    { id: 3, name: 'Ольга', username: 'Петухова' },
  ]

  const [users, setUsers] = useState(usersData)
  // флаг editing - изначально false, функция установки флага
  const [editing, setEditing] = useState(false)
  // начальное значение для формы редактирования
  // так как мы не знаем, кто редактируется - пустые поля
  const initialFormState = { id: null, name: '', username: '' }
  // значение "текущий пользователь на редактировании" + функция установки этого значения
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setEditing(false)
    setUsers(users.filter(user => user.id !== id))
  }

  // обновление пользователя
  const updateUser = (id, updatedUser) => {
    // когда мы готовы обновить пользователя, ставим флажок editing в false
    setEditing(false)
    // и обновляем пользователя, если нашли его по id
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  // редактирование пользователя
  const editRow = user => {
    // готовы редактировать - флажок в true
    setEditing(true)
    // устанавливаем значения полей для формы редактирования
    // на основании выбранного "юзера"
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  return (
    <div className="container">
      <h1>CRUD приложение с использованием HOOKS</h1>
      <div className="flex-row">
        <div className="flex-large">
          {/* редактируем ? рисуй форму редактирования, иначе - форму добавления */}
          {editing ? (
            <div>
              <h2>Редактировать пользователя</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Добавить пользователя</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>Просмотр пользователей</h2>
          {/* передаем editRow */}
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export { App }
