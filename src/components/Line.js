import React from 'react';
import ReactDOM from 'react-dom';
import transformMixins from './util/transform'
var Line = React.createClass({
    mixins: [transformMixins],
    contextTypes: {
        env: React.PropTypes.object
    },
    render(){
        var {points} = this.props;
        var {env} = this;
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
    },
    componentDidMount(){
    }
});
export default Line;
/// propTypes