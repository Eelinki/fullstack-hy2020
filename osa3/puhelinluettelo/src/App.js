import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationType, setNotificationType ] = useState('success')

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addNumber = (e) => {
    e.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const resultFound = persons.find((person) => person.name === newName)

    if(resultFound !== undefined) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.update(resultFound.id, personObject).then(returnedPerson => {
          setPersons(persons.map(p => p.id !== resultFound.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')

          setNotificationType('success')
          setNotificationMessage(
            `Information of ${returnedPerson.name} updated successfully`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        }).catch(error => {
          setPersons(persons.filter(p => p.id !== resultFound.id))

          setNotificationType('error')
          setNotificationMessage(
            `Information of ${newName} has already been deleted from server`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      }
    } else {
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setNotificationType('success')
          setNotificationMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationType('error')
          setNotificationMessage(error.response.data.error)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const deleteNumber = (e, person) => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      personsService.deleteItem(person.id).then(returnedPerson => {
        setPersons(persons.filter(p => p.id !== person.id))

        setNotificationType('success')
        setNotificationMessage(
          `Deleted ${person.name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }).catch(error => {
        setPersons(persons.filter(p => p.id !== person.id))

        setNotificationType('error')
        setNotificationMessage(
          `Information of ${person.name} has already been deleted from server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredPersons = searchQuery.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />

      <Filter handleSearchChange={handleSearchChange} />

      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addNumber={addNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deleteNumber={deleteNumber} />
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with <input onChange={props.handleSearchChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNumber}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div>
    {
      props.filteredPersons.map((person, i) =>
        <p key={person.name}>{person.name} {person.number}
          <button onClick={(e) => props.deleteNumber(e, person)}>delete</button>
        </p>)
    }
    </div>
  )
}

const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

export default App