const Persons = ({ persons, handleDelete }) => {
    return (
        <div>
            {persons.map((props) => <div key={props.id}><p key={props.name}>{props.name} {props.number}</p><button key={props.number} onClick={() => handleDelete(props)}>Delete</button></div>)}
        </div>
    )
}

export default Persons
