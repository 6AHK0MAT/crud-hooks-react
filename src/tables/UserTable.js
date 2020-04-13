import React from 'react'

const UserTable = props => {
  const handleDeleteUser = id => {
    let answer = window.confirm('Вы уверены??')

    if (answer) {
      props.deleteUser(id)
    }
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {props.users.length > 0 ? (
          props.users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                {/* добавили обработку на клик */}
                <button
                  onClick={() => {
                    props.editRow(user)
                  }}
                  className="button muted-button"
                >
                  Редактировать
                </button>
                <button
                  className="button muted-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No users</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export { UserTable }
