// @flow

import React, { Component } from 'react';
import getSize from './get-size';

type Props = {
  canvasRef:
    | { current: null | HTMLCanvasElement }
    | (el: HTMLCanvasElement) => void,
  onResize: () => void,
  scale: number,
};

type State = {
  width: number,
  height: number,
};

export default class ResponsiveCanvas extends Component<Props, State> {
  static defaultProps = {
    scale: window.devicePixelRatio,
  };

  state = {
    width: 0,
    height: 0,
  };

  $canvas: HTMLCanvasElement;

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, false);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize, false);
  }

  handleResize = () => {
    const parent = this.$canvas.parentElement;

    if (!parent) {
      return;
    }

    const [width, height] = getSize(parent);

    this.setState({ width, height });
    this.props.onResize();
  };

  setRef = (el: ?HTMLCanvasElement) => {
    if (!el) {
      return;
    }

    const { canvasRef } = this.props;

    this.$canvas = el;
    if (typeof canvasRef === 'function') {
      canvasRef(el);
    } else if (canvasRef.current) {
      canvasRef.current = el;
    }
  };

  render() {
    const { scale, onResize, canvasRef, ...props } = this.props;
    const { width, height } = this.state;

    return (
      <canvas
        {...props}
        ref={this.setRef}
        width={width * scale}
        height={height * scale}
        style={{ width, height }}
      />
    );
  }
}
