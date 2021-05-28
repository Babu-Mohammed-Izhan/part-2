import React, { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';
import personService from './services/person';
import Notification from './Notification';


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        console.log("Use Effect is running")
        personService
            .getAll()
            .then(res => {
                console.log("data has arrived")
                setPersons(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.some((person) => { return (person.name === newName) })) {
            if (persons.some((person) => { return (person.number !== newNumber) })) {
                if (window.confirm(`${newName} has already added to the phonebook, replace the old number with a new one?`)) {
                    const updatePerson = persons.filter((person) => { return person.name === newName })
                    console.log(updatePerson);
                    const personObject = updatePerson[0]
                    const updateObject = { name: newName, number: newNumber }
                    const id = personObject.id
                    console.log(id)
                    personService
                        .updateNumber(id, updateObject)
                        .then(res => {
                            setMessage(
                                `${newName}'s number changed to ${newNumber}`
                            )
                            setTimeout(() => {
                                setMessage(null)
                            }, 5000)
                        })
                        .catch(err => {
                            setErrorMessage(
                                `Information of ${newName} has already been removed from server`
                            )
                            setTimeout(() => {
                                setErrorMessage(null)
                            }, 5000)
                        })
                }
            } else {
                window.alert(`${newName} is already added to phonebook`)
            }
        } else if (persons.some((person) => { return (person.number === newNumber) })) {
            window.alert(`${newNumber} is already added to phonebook`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            personService
                .create(personObject)
                .then(res => {
                    setMessage(
                        `Added ${newName}`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(err => {
                    console.log(err);
                })
            setNewName('')
            setNewNumber('')
        }
    }
    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        setNewSearch(event.target.value)
    }
    const handleDelete = (props) => {
        const id = props.id
        console.log(props)
        if (window.confirm(`Delete ${props.name}?`)) {
            personService
                .deleteNumber(id)
                .then(res => {
                    setErrorMessage(
                        `${props.name}'s number has been deleted`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
                .catch(err => {
                    setErrorMessage(
                        `Error in deleting the number.Please Try again`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
        }
    }
    const copy = persons;
    const personToShow = newSearch !== '' ? copy.filter((person) => { return person.name.toLowerCase().includes(newSearch.toLowerCase()) }) : copy;

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification errormessage={errorMessage} message={message} />
            <Filter handleSearch={handleSearch} newSearch={newSearch} />
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} newName={newName} newNumber={newNumber} />
            <h3>Numbers</h3>
            <Persons persons={personToShow} handleDelete={handleDelete} />
        </div>
    )
}

export default App