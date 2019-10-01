import { TabPanel } from '@openware/components';
import * as React from 'react';
import { injectIntl, } from 'react-intl';
import { connect, } from 'react-redux';
import { fetchHistory, marketsFetch, resetHistory, walletsFetch, } from '../../modules';
import { HistoryElement } from './HistoryElement';
class History extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { tab: 'deposits' };
        this.tabMapping = ['deposits', 'withdraws', 'trades'];
        this.handleMakeRequest = (index) => {
            if (this.state.tab === this.tabMapping[index]) {
                return;
            }
            this.props.resetHistory();
            this.setState({ tab: this.tabMapping[index] });
        };
        this.renderTabs = () => {
            const { tab } = this.state;
            return [
                {
                    content: tab === 'deposits' ? React.createElement(HistoryElement, { type: "deposits" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.history.deposit' }),
                },
                {
                    content: tab === 'withdraws' ? React.createElement(HistoryElement, { type: "withdraws" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.history.withdraw' }),
                },
                {
                    content: tab === 'trades' ? React.createElement(HistoryElement, { type: "trades" }) : null,
                    label: this.props.intl.formatMessage({ id: 'page.body.history.trade' }),
                },
            ];
        };
    }
    componentDidMount() {
        this.props.fetchMarkets();
        this.props.fetchWallets();
    }
    componentWillUnmount() {
        this.props.resetHistory();
    }
    render() {
        return (React.createElement("div", { className: "pg-history-tab pg-container" },
            React.createElement("div", { className: "pg-history-tab__tabs-content" },
                React.createElement(TabPanel, { panels: this.renderTabs(), onTabChange: this.handleMakeRequest }))));
    }
}
const mapDispatchToProps = dispatch => ({
    fetchMarkets: () => dispatch(marketsFetch()),
    fetchWallets: () => dispatch(walletsFetch()),
    fetchHistory: payload => dispatch(fetchHistory(payload)),
    resetHistory: () => dispatch(resetHistory()),
});
const HistoryTab = injectIntl(connect(null, mapDispatchToProps)(History));
export { HistoryTab, };

