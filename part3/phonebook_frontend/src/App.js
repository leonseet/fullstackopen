import { useEffect, useState } from 'react'
import './index.css'

import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

import apiService from "./services/restapi"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null)

  useEffect(() => {
    apiService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    const filteredObject = persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilter(filteredObject)
  }

  const addName = (e) => {
    if (persons.some(person => person.name === newName)) {
      e.preventDefault()
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const selectedPerson = persons.filter(object => object.name === newName)[0]
        apiService
          .update(selectedPerson.id, { ...selectedPerson, number: newNumber })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setErrorMessage(`Updated ${newName}`)
            setErrorType("success")
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setErrorType("fail")
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      e.preventDefault()
      const nameObject = {name: newName, number: newNumber}
      apiService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setErrorMessage(`Added ${newName}`)
          setErrorType("success")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => console.log(error.response.data.error))
    }
  }

  const deleteName = (e) => {
    const personName = e.target.value
    if (window.confirm(`Delete ${personName} ?`)) {
      const personId = persons.filter(object => object.name === personName)[0].id
      apiService
        .remove(personId)
        .then(setPersons(persons.filter(object => object.name !== personName)))
    }
  }

  const persons_list = newFilter ? newFilter : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={errorType} />
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      {persons_list.map(person => 
        <Persons key={person.name} person={person} deleteName={deleteName} />)}
    </div>
  )
}

export default App