import React from 'react';
import ReactDOM from 'react-dom';
var Line = React.createClass({
    contextTypes: {
        env: React.PropTypes.object
    },
    render(){
        var {points} = this.props;
        var {env} = this.context;
        points = points || [];
        env.add((context)=> {
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
    }
});
export default Line;
/// propTypes