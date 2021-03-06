import React from 'react'

const SearchForm = ({ address, updateAddress, toggleAda, ada, toggleUnisex, unisex, getRestrooms }) => {
  return (
    <form onSubmit={getRestrooms}>
      <h3>intersection &amp; city:</h3>
      <input
        className="closest-intersection"
        type="text"
        value={address}
        onChange={updateAddress}
        placeholder="eg. yonge and college toronto"
      />
      <h3>do you need a unisex washroom?</h3>
      <div>
        <input
          type="radio"
          id="unisex-yes"
          name="unisex"
          checked={unisex}
          onChange={toggleUnisex}
        />
        <label
          htmlFor="unisex-yes"
          tabIndex="0"
          role="button"
          onKeyDown={e => e.keyCode === 13 && !unisex ? toggleUnisex() : () => { }}>Yes</label>
        <input
          type="radio"
          id="unisex-no"
          name="unisex"
          checked={!unisex}
          onChange={toggleUnisex}
        />
        <label
          htmlFor="unisex-no"
          tabIndex="0"
          role="button"
          onKeyDown={e => e.keyCode === 13 && unisex ? toggleUnisex() : () => { }}>No</label>
      </div>

      <h3>does it need to be ADA accessible?</h3>
      <div>
        <input
          type="radio"
          id="ada-yes"
          name="ada"
          checked={ada}
          onChange={toggleAda}
        />
        <label
          htmlFor="ada-yes"
          tabIndex="0"
          role="button"
          onKeyDown={e => e.keyCode === 13 && !ada ? toggleAda() : () => { }}>Yes</label>
        <input
          type="radio"
          id="ada-no"
          name="ada"
          checked={!ada}
          onChange={toggleAda}
        />
        <label
          htmlFor="ada-no"
          tabIndex="0"
          role="button"
          onKeyDown={e => e.keyCode === 13 && ada ? toggleAda() : () => { }}>No</label>
      </div>

      <input className="form__submit-button" type="submit" value="Find Restrooms" />
    </form>
  )
}

export default SearchForm