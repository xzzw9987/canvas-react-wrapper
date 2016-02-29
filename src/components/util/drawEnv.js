import math from 'mathjs';
export default function drawEnv(context) {
    var callbackMap = [];

    function loop(index, callbackMap) {
        var {callback,options} = callbackMap[index] || {};
        if (!callback)
            return;
        context.save();
        for (var key in options) {
            context[key] = options[key];
        }
        context.beginPath();
        var ret = callback(context);

        function f() {
            options.end ? context.closePath() : void 0;
            context.stroke();
            context.restore();
            loop(index + 1, callbackMap);
        }

        (typeof ret === 'object' && 'then' in ret) ?
            ret.then(f,f)
            : f()


    }

    function add(callback, options = {}) {
        callbackMap.push({callback, options})
    }

    function render() {
        loop(0, callbackMap);
    }

    function clear() {
        callbackMap = [];
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    return {add, render, clear};
}