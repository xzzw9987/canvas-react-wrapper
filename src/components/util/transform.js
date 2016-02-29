import normalizeTransform from './transform';
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
        if (!this.props.transform) {
            return;
        }
        var transform = normalizeTransform(this.props.transform);
        if (transform !== 'none') {
            var {env} = this.context;
            env.add(context=> {
                transform = transform.match(/matrix\((.*?),(.*?),(.*?),(.*?),(.*?),(.*?)\)/);
                context.transform.apply(context, transform.slice(1));
            });
        }
    }
};