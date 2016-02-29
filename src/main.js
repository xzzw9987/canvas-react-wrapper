import math from 'mathjs';
import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './components/Canvas';
import Line from './components/Line';
import ReactImage from './components/Image';

import Group from './components/Group';
var App = React.createClass({
    render(){
        return (
            <Canvas width="500" height="500">
                <Group transform="translate(0,0)">
                    <Line points={
        [
            [0,200],
            [100,200]
        ]}
                          end={false}/>
                </Group>

                <Group transform={"rotate(" + this.state.deg + "deg)"}>
                    <ReactImage src="https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/5.jpg?2"/>
                </Group>
            </Canvas>
        );
    },
    componentDidMount(){
        var me = this;

        function f() {
            requestAnimationFrame(f);
            me.setState({
                deg: 1 + me.state.deg
            });
        }

        f();
    },
    getInitialState(){
        return {
            deg: 0
        }
    }

});
//                    <ReactImage src="https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/5.jpg?2"/>

ReactDOM.render(
    <App></App>
    , document.querySelector('.root'));