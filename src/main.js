import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './components/Canvas';
import Line from './components/Line';
import ReactImage from './components/Image';
var App = React.createClass({
    render(){
        return (
            <Canvas width="500" height="500">
                <ReactImage src="https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/5.jpg?2"/>
                <Line points={
        [
            [500 * Math.random(),500 * Math.random() ],
            [500 * Math.random(),500 * Math.random() ]
        ]}
                      end={ false }/>
            </Canvas>
        );
    },
    componentDidMount(){
        setInterval(this.forceUpdate.bind(this), 500);
    }
});
ReactDOM.render(
    <App></App>
    , document.querySelector('.root'));
