/**
 * Created by baidu on 15/10/19.
 */
'use strict';

var _exports = null;
var React = require('react');
var path = require('path');
var base = path.resolve(__dirname, '../');
var XComponent = React.createClass({
    displayName: 'XComponent',

    render: function render() {
        var list = this.state.list.map(function (content, index) {
            return React.createElement(
                Item,
                { key: index, index: index },
                content
            );
        });
        return React.createElement(
            'ul',
            null,
            list
        );
    },
    getInitialState: function getInitialState() {
        return {
            list: ['a', 'b', 'c']
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        setTimeout(function () {
            _this.setState({
                list: ['x', 'y', 'z']
            });
        }, 2000);
    }
});
var Item = React.createClass({
    displayName: 'Item',

    render: function render() {
        return React.createElement(
            'li',
            { onClick: this.click },
            this.props.children
        );
    },
    componentDidMount: function componentDidMount() {
        console.log('Mount item');
    },
    click: function click() {
        console.log(this.props.index);
    }
});
var component = React.createElement(XComponent, null);
var elements = { component: component };
!serverSide() && React.render(component, document.querySelector('.react'));
serverSide() && (_exports = require('fs').readFileSync(base + '/react.html').toString().replace(/\$\{(.*?)}/g, function (all, component) {
    return React.renderToString(elements[component]) || '';
}));
console.log(_exports);
module.exports = _exports;
function serverSide() {
    return !(process && process.browser);
}
