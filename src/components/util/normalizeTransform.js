export default function (transform) {
    var div = document.createElement('div');
    div.style.transform = transform;
    document.body.appendChild(div);
    var ret = getComputedStyle(div).transform;
    div.remove();
    return ret;
}