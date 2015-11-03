var Promise = window.Promise;
import React from 'react';
var ReactImage = React.createClass({
    render(){
        var cachedImages = this.cachedImages = this.cachedImages || {};
        var {env,src} = this.props;
        env.add((context)=> {
            var ahref = document.createElement('a');
            ahref.href = src;
            var cachedImage = cachedImages[ahref.href];
            if (cachedImage) {
                context.drawImage(cachedImage, 0, 0, cachedImage.width, cachedImage.height);
                return;
            }
            var d = Promise.defer();
            var i = new Image();
            i.src = ahref.href;
            i.addEventListener('load', ()=> {
                d.resolve();
            });
            i.addEventListener('error', ()=> {
                d.reject();
            });

            return d.promise.then(()=> {
                cachedImages[ahref.href] = i;
                context.drawImage(i, 0, 0, i.width, i.height);
            });
        });
        return null;
    },
    _x: [1, 2, 3]
});
export default ReactImage;
