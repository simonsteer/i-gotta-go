import React from 'react'

const SearchResults = ({ restrooms }) => {
  return (
    <main>
      <ul>
        {restrooms.map(rr =>
          <li key={rr.id} id={rr.id}>
            <h2>{rr.name}</h2>
            <a href={`https://www.google.ca/maps/place/${rr.street}`} target="_blank">{rr.street}</a><br />
            <p>{(rr.distance * 1609.34).toFixed(0)} meters</p>
            <p className="directions">{rr.directions}</p>
          </li>
        )}
      </ul>
    </main>
  )
}

export default SearchResults