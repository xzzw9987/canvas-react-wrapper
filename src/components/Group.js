import React from 'react';
import math from 'mathjs';
import transformMixins from './util/transform';
import normalizeTransform from './util/normalizeTransform';
var Group = React.createClass({
    mixins: [transformMixins],
    contextTypes: {
        env: React.PropTypes.object
    },
    childContextTypes: {
        transform: React.PropTypes.array
    },
    getChildContext(){
        var selfTransform = normalizeTransform(this.props.transform);
        var willTransform = this.context.transform;

        if (selfTransform !== 'none') {
            selfTransform = selfTransform.match(/matrix\((.*?),(.*?),(.*?),(.*?),(.*?),(.*?)\)/).slice(1);
            willTransform = (function () {
                var matrix = math.multiply(
                    [
                        [willTransform[0], willTransform[2], willTransform[4]],
                        [willTransform[1], willTransform[3], willTransform[5]],
                        [0, 0, 1]
                    ]
                    ,
                    [
                        [selfTransform[0], selfTransform[2], selfTransform[4]],
                        [selfTransform[1], selfTransform[3], selfTransform[5]],
                        [0, 0, 1]
                    ]
                );
                return [
                    matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]
                ]
            })();
        }
        return {
            transform: willTransform
        }
    },
    render(){
        return (
            <div>
                { this.props.children }
            </div>
        )
    }
});
export default Group;