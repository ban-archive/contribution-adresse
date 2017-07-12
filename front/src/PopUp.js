import React from 'react'

const PopUp = ({ close, arrowBox, children, position='', reverse=false }) => {
  if (arrowBox) return (
    <div className="overlay bottom">
      <div className="arrow-box">{children}</div>
    </div>
  )

  return (
    <div className={`overlay resizable ${position}`}>
      <div className={`panel ${reverse ? 'reverse' : ''}`}>
        { close ? <img className="close" onClick={close} src="close_icon.svg"/> : null}
        {children}
      </div>
    </div>
  )
}

export default PopUp
