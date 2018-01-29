import React from 'react'

const SearchResults = ({ restrooms }) => {
  return (
    <main>
      <ul>
        {restrooms.map(rr =>
          <li key={rr.id} id={rr.id}>
            <h2>{rr.name}</h2>
            <p>{rr.directions}</p>
            <p>{rr.street}</p>
            <p>{(rr.distance * 1609.34).toFixed(0)} meters</p>
            <a href={`https://www.google.ca/maps/place/${rr.street}`} target="_blank">GoogleMaps</a>
          </li>
        )}
      </ul>
    </main>
  )
}

export default SearchResults