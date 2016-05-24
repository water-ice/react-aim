import React, { Component, PropTypes } from 'react';
import rect from './rect';
import line, { position } from './line';
import { corners, lines } from '../../src/corners';
import aiming from '../../src/aim';

class Corners extends Component {
  lines = [];
  mousePosition;
  prevMousePosition;

  componentDidMount() {
    this.draw(this.refs.svg);
  }

  draw(svg) {
    let obj = new rect(svg, 200, 100, '400px', '400px');
    document.addEventListener('mousemove', e => this.drawLines(e, svg, obj));
  }

  drawLines(e, svg, rect) {
    this.prevMousePosition = this.mousePosition;
    this.mousePosition = { x: e.pageX, y: e.pageY };

    aiming(e, this.mousePosition, this.prevMousePosition, rect);

    const l = lines(corners(e, rect), e, rect);
    if (!this.lines[0]) this.lines[0] = new line(svg);
    if (!this.lines[1]) this.lines[1] = new line(svg, 'blue');

    if (l[0] && l[0][0]) position(this.lines[0], l[0][0].x, l[0][0].y, l[0][1].x, l[0][1].y);
    if (l[1] && l[1][0]) position(this.lines[1], l[1][0].x, l[1][0].y, l[1][1].x, l[1][1].y);
  }

  render() {
    return (
      <svg ref="svg" width="100vw" height="100vh" style={{ display: 'block' }}/>
    );
  }
}

export default Corners;