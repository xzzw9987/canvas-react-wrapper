import React from 'react';
import math from 'mathjs';
import transformMixins from './util/transform';
var Group = React.createClass({
    mixins: [transformMixins],
    contextTypes: {
        env: React.PropTypes.object
    },
    childContextTypes: {
        transform: React.PropTypes.array
    },
    getChildContext(){
        var me = this;
        return {
            transform: me.context.transform
        }
    },
    render(){
        return (
            <div data-transform={this.props.transform}>
                { this.props.children }
            </div>
        )
    },
    componentWillMount(){
        console.log('will mount group');
        this.setTransform();
    },
    componentWillUpdate(){
        this.setTransform();
    },
    componentDidUpdate(){
        this.resetTransform();
    },
    componentDidMount(){
        console.log('did mount group');
        this.resetTransform();
    },
    setTransform(){
        if (!this.context.env)
            return;
        var transform = normalizeTransform(this.props.transform);
        if (transform !== 'none') {
            var {env} = this.context;
            env.add(context=> {
                transform = transform.match(/matrix\((.*?),(.*?),(.*?),(.*?),(.*?),(.*?)\)/);
                context.transform.apply(context, transform.slice(1));
            });
        }
    },
    resetTransform(){
        if (!this.context.env)
            return;
        var transform = normalizeTransform(this.props.transform);
        if (transform !== 'none') {
            var {env} = this.context;
            env.add(context=> {
                transform = transform.match(/matrix\((.*?),(.*?),(.*?),(.*?),(.*?),(.*?)\)/);
                var m00 = transform[1];
                var m10 = transform[2];
                var m01 = transform[3];
                var m11 = transform[4];
                var m02 = transform[5];
                var m12 = transform[6];
                var inverse = math.inv([[m00, m01, m02], [m10, m11, m12], [0, 0, 1]]);
                console.log('----inverse');
                console.log(JSON.stringify(inverse));
                console.log('----');
                context.transform(inverse[0][0], inverse[1][0], inverse[0][1], inverse[1][1], inverse[0][2], inverse[1][2]);
            });
        }
    }
});
export default Group;

function normalizeTransform(transform) {
    var div = document.createElement('div');
    div.style.transform = transform;
    document.body.appendChild(div);
    var ret = getComputedStyle(div).transform;
    div.remove();
    return ret;
}