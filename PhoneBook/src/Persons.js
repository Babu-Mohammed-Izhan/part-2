const Persons = ({ persons }) => {
    return (
        <div>
            {persons.map((props) => <p key={props.name}>{props.name} {props.number}</p>)}
        </div>
    )
}

export default Persons
