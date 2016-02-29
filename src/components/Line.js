import React from 'react';
import ReactDOM from 'react-dom';
var Line = React.createClass({
    contextTypes: {
        env: React.PropTypes.object
    },
    render(){
        console.log('render line');
        var {points} = this.props;
        var {env} = this.context;
        points = points || [];
        env.add(context=> {
            points.forEach((point, index)=> {
                if (index === 0) {
                    context.moveTo(point[0], point[1]);
                }
                else {
                    context.lineTo(point[0], point[1]);
                }
            });
        });
        return null;
    },
    componentWillMount(){
        console.log('will mount line');
    },
    componentDidMount(){
        console.log('did mount line');
    }
});
export default Line;
/// propTypes