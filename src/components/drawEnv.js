var Promise = window.Promise;
export default function drawEnv(context) {
    var callbackMap = [];

    function add(callback, options = {}) {
        callbackMap.push({callback, options})
    }


    function render() {
        var index = 0;
        loop();
        function loop() {
            var {callback,options} = callbackMap[index++] || {};
            if (callback) {
                context.save();
                for (var key in options) {
                    context[key] = options[key];
                }
                context.beginPath();
                var ret = callback(context);
                options.end ? context.closePath() : void 0;
                context.stroke();
                context.restore();
                if (ret instanceof Promise) {
                    ret.then(loop)
                        .catch(loop);
                }
                else {
                    loop();
                }
            }
        }

    }

    function clear() {
        callbackMap = [];
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    return {add, render, clear};
}