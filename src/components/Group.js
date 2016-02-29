import React from 'react';
var Group = React.createClass({
    childContextTypes: {
        env: React.PropTypes.object
    },
    getChildContext(){
        var {env} = this.context;
        return {
            env: Object.assign({}, env, {
                add(){

                }
            })
        }
    },
    render(){

    }
});