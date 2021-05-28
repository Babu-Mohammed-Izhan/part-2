const Notification = ({ errormessage, message }) => {
    if (message === null && errormessage === null) {
        return null
    }
    return (
        <div>
            {errormessage !== null ? <div className="error">{errormessage}</div> : <div></div>}
            {message !== null ? <div className="message">{message}</div> : <div></div>}
        </div>
    )
}

export default Notification