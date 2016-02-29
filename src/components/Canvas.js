import React from 'react';
import ReactDOM from 'react-dom';
import drawEnv from './util/drawEnv';
var Canvas = React.createClass({
    childContextTypes: {
        env: React.PropTypes.object,
        transform: React.PropTypes.array
    },
    getChildContext(){
        var env = this._env;
        return {env, transform: [1, 0, 0, 1, 0, 0]}
    },
    render(){
        return (
            <canvas {...this.props} ref="canvas">
                {
                    this._env ? this.props.children : null
                }
            </canvas>
        );
    },
    componentDidMount(){
        // Get the Real DOM
        this._env = drawEnv(this.refs.canvas.getContext('2d'));

        // And then Re-Render
        this.setState({});
    },
    componentWillUpdate(){
        this._env.clear();
    },
    componentDidUpdate(){
        this._env.render();
    }
});
export default Canvas;