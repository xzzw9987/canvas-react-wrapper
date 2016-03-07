import React from 'react';
import transformMixin from './util/transform';
export default React.createClass({
    mixins: [transformMixin],
    contextTypes: {
        env: React.PropTypes.object
    },
    render(){
        var {draw} = this.props;
        var {env} = this;
        env.add(context=> {
            draw(context);
        }, {
            type: this.props.type
        });
        return null;
    }
});