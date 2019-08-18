import React from 'react'

const Loading = ({ text }) => (
  <>
    <div className="animated fadeIn lds-css">
      <div className="lds-dual-ring">
        <div></div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
    <p>{text}</p>
  </>
)

export default Loading