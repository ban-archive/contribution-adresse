const { h, render } = preact

function onClickHandler() {
  alert('Hi!')
}

render((
  <div id="foo">
    <span>Hello, world!</span>
    <button onClick={onClickHandler}>Click on me</button>
  </div>
), document.body)
