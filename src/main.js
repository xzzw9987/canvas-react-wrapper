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

                <Group transform="translate(200px,0)">
                    <Line points={
        [
            [0,200],
            [100,200]
        ]}
                          end={false}/>
                </Group>

                <Group transform="translate(400px,0)">
                    <Line points={
        [
            [0,0 ],
            [100,100 ]
        ]}
                          end={false}/>
                </Group>
            </Canvas>
        );
    },
    componentDidMount(){

    }
});
//                    <ReactImage src="https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/5.jpg?2"/>

ReactDOM.render(
    <App></App>
    , document.querySelector('.root'));