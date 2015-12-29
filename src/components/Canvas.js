import React from 'react';
import ReactDOM from 'react-dom';
import drawEnv from './drawEnv';
var Canvas = React.createClass({
    childContextTypes: {
        env: React.PropTypes.object
    },
    getChildContext(){
        var env = this._env;
        return {
            env
        }
    },
    render(){
        return (
            <canvas {...this.props} ref="canvas">
                {
                    this._env ? React.Children.map(this.props.children, child=> {
                        return React.cloneElement(child);
                    }) : null
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