function Filter({ handleSearch, newSearch }) {
    return (
        <div>
            <h3>filter shown with <input value={newSearch} onChange={handleSearch} /></h3>
        </div>
    )
}

export default Filter
