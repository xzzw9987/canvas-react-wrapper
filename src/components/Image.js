import $ from 'jquery';
import React from 'react';
import transformMixins from './util/transform'

var ReactImage = React.createClass({
    mixins: [transformMixins],
    contextTypes: {
        env: React.PropTypes.object
    },
    render(){
        var cachedImages = this.cachedImages = this.cachedImages || {};
        var {src} = this.props;
        var {env} = this;
        env.add(context=> {
            var ahref = document.createElement('a');
            ahref.href = src;
            var cachedImage = cachedImages[ahref.href];
            if (cachedImage) {
                context.drawImage(cachedImage, 0, 0, cachedImage.width, cachedImage.height);
                return;
            }
            var d = $.Deferred();
            var i = new Image();
            i.src = ahref.href;
            i.addEventListener('load', ()=> {
                d.resolve();
            });
            i.addEventListener('error', ()=> {
                d.reject();
            });

            return d.promise().then(()=> {
                cachedImages[ahref.href] = i;
                context.drawImage(i, 0, 0, i.width, i.height);
            });
        });
        return null;
    }
});
export default ReactImage;
