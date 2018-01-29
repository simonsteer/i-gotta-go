import React from 'react'

const SearchForm = ({ address, updateAddress, toggleAda, ada, toggleUnisex, unisex, getRestrooms }) => {
  return (
    <form onSubmit={getRestrooms}>
      <h3>Closest intersection and city:</h3>
      <input
        className="closest-intersection"
        type="text"
        value={address}
        onChange={updateAddress}
        placeholder="eg. yonge and college toronto"
      />
      <h3>Do you need a unisex washroom?</h3>
      <div>
        <input type="radio" id="unisex-yes" name="unisex" checked={unisex} onChange={toggleUnisex} />
        <label htmlFor="unisex-yes">Yes</label>
        <input type="radio" id="unisex-no" name="unisex" checked={!unisex} onChange={toggleUnisex} />
        <label htmlFor="unisex-no">No</label>
      </div>

      <h3>Does it need to be ADA accessible?</h3>
      <div>
        <input type="radio" id="ada-yes" name="ada" checked={ada} onChange={toggleAda} />
        <label htmlFor="ada-yes">Yes</label>
        <input type="radio" id="ada-no" name="ada" checked={!ada} onChange={toggleAda} />
        <label htmlFor="ada-no">No</label>
      </div>

      <input className="form__submit-button" type="submit" value="Find Restrooms" />
    </form>
  )
}

export default SearchForm