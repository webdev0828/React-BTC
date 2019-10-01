import { Decimal, Loader, OrderBook } from '@openware/components';
import classNames from 'classnames';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, } from 'react-redux';
import { accumulateVolume, calcMaxVolume, sortBids } from '../../helpers';
import { selectCurrentMarket, selectCurrentPrice, selectDepthAsks, selectDepthBids, selectDepthLoading, setCurrentPrice, } from '../../modules';
class OrderBookContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.orderBook = (bids, asks) => (React.createElement(OrderBook, { side: 'right', title: this.props.intl.formatMessage({ id: 'page.body.trade.header.bids' }), headers: this.renderHeaders(), data: this.renderOrderBook(bids, 'bids', this.props.intl.formatMessage({ id: 'page.noDataToShow' }), this.props.currentMarket), rowBackgroundColor: 'rgba(84, 180, 137, 0.4)', maxVolume: calcMaxVolume(bids, asks), orderBookEntry: accumulateVolume(bids), onSelect: this.handleOnSelect }));
        this.renderHeaders = () => {
            return [
                this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.volume' }),
                this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.amount' }),
                this.props.intl.formatMessage({ id: 'page.body.trade.orderbook.header.price' }),
            ];
        };
        this.renderOrderBook = (array, side, message, currentMarket) => {
            const total = accumulateVolume(array);
            const priceFixed = currentMarket ? currentMarket.bid_precision : 0;
            const amountFixed = currentMarket ? currentMarket.ask_precision : 0;
            return (array.length > 0) ? array.map((item, i) => {
                const [price, volume] = item;
                return [
                    React.createElement(Decimal, { key: i, fixed: amountFixed }, total[i]),
                    React.createElement(Decimal, { key: i, fixed: amountFixed }, volume),
                    React.createElement("span", { style: { color: 'var(--open-orders-order-buy)' }, key: i },
                        React.createElement(Decimal, { fixed: priceFixed }, price)),
                ];
            }) : [[[''], message]];
        };
        this.handleOnSelect = (index) => {
            const { bids, currentPrice } = this.props;
            const priceToSet = bids[Number(index)] ? bids[Number(index)][0] : '';
            if (currentPrice !== priceToSet) {
                this.props.setCurrentPrice(priceToSet);
            }
        };
    }
    render() {
        const { bids, bidsLoading, asks } = this.props;
        const cn = classNames('', {
            'pg-bids--loading': bidsLoading,
        });
        return (React.createElement("div", { className: cn }, bidsLoading ? React.createElement(Loader, null) : this.orderBook(sortBids(bids), asks)));
    }
}
const mapStateToProps = state => ({
    bids: selectDepthBids(state),
    asks: selectDepthAsks(state),
    bidsLoading: selectDepthLoading(state),
    currentMarket: selectCurrentMarket(state),
    currentPrice: selectCurrentPrice(state),
});
const mapDispatchToProps = dispatch => ({
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
});
const Bids = injectIntl(connect(mapStateToProps, mapDispatchToProps)(OrderBookContainer));
export { Bids, };

