import React from 'react'

const SearchForm = ({ toggleAda, ada, toggleUnisex, unisex, getRestrooms }) => {
  return (
    <form onSubmit={getRestrooms}>
      <h2>Do you need...</h2>
      <h3>...a unisex washroom?</h3>
      <label htmlFor="unisex-yes">Yes</label>
      <input type="radio" id="unisex-yes" name="unisex" checked={unisex} onChange={toggleUnisex} />
      <label htmlFor="unisex-no">No</label>
      <input type="radio" id="unisex-no" name="unisex" checked={!unisex} onChange={toggleUnisex} />

      <h3>...an ADA accessible washroom?</h3>
      <label htmlFor="ada-yes">Yes</label>
      <input type="radio" id="ada-yes" name="ada" checked={ada} onChange={toggleAda} />
      <label htmlFor="ada-no">No</label>
      <input type="radio" id="ada-no" name="ada" checked={!ada} onChange={toggleAda} />

      <input type="submit" value="Find Restrooms" />
    </form>
  )
}

export default SearchForm