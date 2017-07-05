import { h } from 'preact'

const PopUp = ({ close, arrowBox, children, position='', reverse=false }) => {
  if (arrowBox) return (
    <div class="overlay bottom">
      <div class="arrow-box">{children}</div>
    </div>
  )

  return (
    <div class={`overlay resizable ${position}`}>
      <div class={`panel ${reverse ? 'reverse' : ''}`}>
        { close ? <img class="close" onClick={close} src="close_icon.svg"/> : null}
        {children}
      </div>
    </div>
  )
}

export default PopUp
