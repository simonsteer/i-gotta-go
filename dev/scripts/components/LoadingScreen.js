import React from 'react'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <h2 style={{ margin: "0 0 20px 0", fontSize: "30px" }}>Please Hold</h2>
      <img src="../../public/images/please-hold.gif" alt=""/>
    </div>
  )
}

export default LoadingScreen