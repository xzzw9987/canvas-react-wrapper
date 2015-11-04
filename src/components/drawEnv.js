var Promise = window.Promise;
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
        options.end ? context.closePath() : void 0;
        context.stroke();
        context.restore();
        ret instanceof Promise ?
            ret.then(loop.bind(null, index + 1, callbackMap))
                .catch(loop.bind(null, index + 1, callbackMap))
            : loop(index + 1, callbackMap);

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