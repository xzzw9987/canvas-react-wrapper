import React from 'react';
import ReactDOM from 'react-dom';
import drawEnv from './drawEnv';
var Canvas = React.createClass({
    render(){
        return (
            <canvas {...this.props} ref="canvas">
                {
                    this.env ? React.Children.map(this.props.children, child=> {
                        return React.cloneElement(child, {env: this.env})
                    }) : null
                }
            </canvas>
        );
    },
    componentDidMount(){
        // Get the Real DOM
        this.env = drawEnv(this.refs.canvas.getContext('2d'));

        // And then Re-Render
        this.forceUpdate();
    },
    componentWillUpdate(){
        this.env.clear();
    },
    componentDidUpdate(){
        this.env.render();
    }
});
export default Canvas;