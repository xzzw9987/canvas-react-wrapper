import math from 'mathjs';
import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './components/Canvas';
import Line from './components/Line';
import ReactImage from './components/Image';
import Path from './components/Path';
import Group from './components/Group';

var width;
var height;
resize();
var App = React.createClass({
    render(){
        var children = this.state.children;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var value = children[i * 10 + j];
                if (value === undefined) {
                    value = {
                        y: 128 * i,
                        x: j * 128
                    };
                }
                else {
                    value.y -= 5;
                    if (value.y < -1 * 128) {
                        value.y += 1280;
                    }
                }
                children[i * 10 + j] = value;

            }
        }

        //console.log(children);


        return (
            <Canvas width={width} height={height}>
                {
                    children.map(item=> {
                        return (
                            <Group transform={"translate(" + item.x +"px," + item.y +"px)"}>
                                <ReactImage src="./rocket.png"></ReactImage>
                            </Group>
                        );
                    })
                }
            </Canvas>
        );
    },
    componentDidMount(){
        var me = this;
        var dir = 1;

        function f() {
            requestAnimationFrame(f);
            if (me.state.radius > 200) {
                dir = -1;
            }
            else if (me.state.radius < 100) {
                dir = 1;
            }
            me.setState({
                radius: dir * 2 + me.state.radius,
                deg: 1 + me.state.deg
            });
        }

        f();

        window.addEventListener('resize', ()=> {
            resize();
            this.setState({});
        });

    },
    getInitialState(){
        return {
            deg: 0,
            radius: 100,
            children: []
        }
    }

});

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    console.log(width, height);
}
//                    <ReactImage src="https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/skin/5.jpg?2"/>

ReactDOM.render(
    <App></App>
    , document.querySelector('.root'));