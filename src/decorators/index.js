import * as React from 'react';
import { PG_TITLE_PREFIX } from '../constants';
const Titled = (title) => (Child) => {
    return class extends React.Component {
        componentWillReceiveProps(next) {
            // nothing
        }
        componentDidMount() {
            document.title = [PG_TITLE_PREFIX, title].join(': ');
        }
        render() {
            return React.createElement(Child, Object.assign({}, this.props));
        }
    };
};
export { Titled, };

