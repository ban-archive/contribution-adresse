const { h, render } = preact;

render((
    <div id="foo">
        <span>Hello, world!</span>
        <button onClick={ e => alert("Hi!") }>Click on me</button>
    </div>
), document.body);
