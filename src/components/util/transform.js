import React from 'react';
import normalizeTransform from './normalizeTransform';
import math from 'mathjs';
export default {
    contextTypes: {
        transform: React.PropTypes.array
    },
    componentWillMount(){
        this.withTransform();
    },
    componentWillUpdate(){
        this.withTransform();
    },
    withTransform(){
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
        var env = this.context.env;
        this.env = Object.assign({}, env, {
            add(callback, options){
                function cb(context) {
                    context.transform.apply(context, willTransform);
                    return callback(context);
                }

                env.add(cb, options);
            }
        });
    }
};