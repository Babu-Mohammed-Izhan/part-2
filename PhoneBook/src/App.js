import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        console.log("Use Effect is running")
        axios
            .get("http://localhost:3001/persons")
            .then(res => {
                console.log("data has arrived")
                setPersons(res.data)
            })
    }, [])





    const addPerson = (event) => {
        event.preventDefault()

        if (persons.every((element) => { return element.name === newName })) {
            window.alert(`${newName} is already added to phonebook`)
        } else if (persons.every((element) => { return element.number === newNumber })) {
            window.alert(`${newNumber} is already added to phonebook`)
        } else {
            const personObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(personObject))
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
    const copy = persons;
    const personToShow = newSearch !== '' ? copy.filter((person) => { return person.name.toLowerCase().includes(newSearch.toLowerCase()) }) : copy;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleSearch={handleSearch} newSearch={newSearch} />
            <h3>add a new</h3>
            <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} newName={newName} newNumber={newNumber} />
            <h3>Numbers</h3>
            <Persons persons={personToShow} />
        </div>
    )
}

export default App