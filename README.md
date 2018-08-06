# react-responsive-canvas

[![npm](https://badgen.now.sh/npm/v/react-responsive-canvas)](https://www.npmjs.com/package/react-responsive-canvas)

Simple React component for a canvas that fits the size of its parent.

## Installation

```
npm install --save react-responsive-canvas
```

## Usage

#### Props

* `canvasRef: (el: HTMLCanvasElement) => void` - A [ref callback function](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) to set a reference to the `canvas` element
* `onResize: () => void` - A callback for when the canvas resizes
* `scale: number` - A ratio to scale the canvas by. Used to support high-quality canvases on retina screens. Defaults to `window.devicePixelRatio`

#### Example

```jsx
import Canvas from 'react-responsive-canvas';

class App extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.draw();
  }

  draw() {
    // Draw whatever
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render () {
    return (
      <div>
        <Canvas
          canvasRef={el => (this.canvas = el)}
          handleResize={this.draw} />
      </div>
    );
  }
}
```

## Context

By default, HTML `<canvas />` elements are a fixed size. When creating animated canvas graphics, I usually want the canvas to take the shape of the container it sits in — whether that's the whole page, or a header image.

After writing this component too many times using [hughsk/canvas-fit](https://github.com/hughsk/canvas-fit), I built this module.

It auto-resizes the canvas to fill it's container, and by default scales the canvas to match the user's screen resolution (ie. regular vs. retina screens).

## License

MIT
