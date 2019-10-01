import { Button } from '@openware/components';
import * as React from 'react';
import { connect } from 'react-redux';
import { selectUserInfo } from '../../modules';
import { selectTiersData, selectTiersDisabled, selectTiersError, tiersFetch, } from '../../modules/user/profile';
class ProfileTiersComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.handleEnablePayFees = () => {
            // todo: implement
        };
    }
    componentWillReceiveProps(next) {
        const currentUID = this.props.user.uid;
        const isUserLoaded = !!currentUID || currentUID.length > 0;
        if (next.user.uid && !isUserLoaded) {
            this.props.tiers({
                uid: next.user.uid,
                currency: 'btc',
            });
        }
    }
    render() {
        const { tier, tiersDisabled, error, } = this.props;
        if (tiersDisabled) {
            return null;
        }
        return (React.createElement("div", { className: "pg-profile-page__box pg-profile-page__right-col__token" },
            React.createElement("div", { className: "pg-profile-page__box-header" },
                React.createElement("h3", null,
                    React.createElement("span", { className: "pg-profile-page__text-purple" }, "Exchange token"),
                    " holder incentives")),
            React.createElement("div", { className: "pg-profile-page__row pg-profile-page__pb-gap-6" },
                React.createElement("h1", { className: "pg-profile-page__text-purple" },
                    tier.min_holding,
                    React.createElement("span", { className: "pg-profile-page__currency" }, "Exchange"))),
            React.createElement("div", { className: "pg-profile-page__row" }, error ? this.renderError(error.message) : this.renderTier(tier)),
            React.createElement("div", { className: "pg-profile-page__row" },
                React.createElement("div", { className: "pg-profile-page__col" },
                    React.createElement("label", null, "Use Exchange to pay trading fee")),
                React.createElement("div", { className: "pg-profile-page__col" },
                    React.createElement(Button, { className: "pg-profile-page__btn-secondary", onClick: this.handleEnablePayFees, label: "Off" }),
                    React.createElement("div", { className: "pg-profile-page__vertical-line" }),
                    React.createElement(Button, { className: "pg-profile-page__btn-secondary pg-profile-page__btn-secondary__active", onClick: this.handleEnablePayFees, label: "Enable" })))));
    }
    renderError(message) {
        return React.createElement("span", { className: "pg-profile-page__error" }, message);
    }
    renderTier(tier) {
        return (React.createElement("div", { className: "pg-profile-page-tiers" },
            React.createElement("p", { className: "pg-profile-page-tiers__detail" },
                React.createElement("span", { className: "pg-profile-page-tiers__detail-data" }, tier.color),
                React.createElement("span", { className: "pg-profile-page-tiers__detail-title" }, "Exchange Tier grant you the following incentives")),
            React.createElement("p", { className: "pg-profile-page-tiers__detail" },
                React.createElement("span", { className: "pg-profile-page-tiers__detail-data" }, `${tier.fee_discount}%`),
                React.createElement("span", { className: "pg-profile-page-tiers__detail-title" }, "Discount on trading fee")),
            React.createElement("p", { className: "pg-profile-page-tiers__detail" },
                React.createElement("span", { className: "pg-profile-page-tiers__detail-data" }, "20"),
                React.createElement("span", { className: "pg-profile-page-tiers__detail-title" }, "Token survey points"))));
    }
}
const mapStateToProps = state => ({
    user: selectUserInfo(state),
    tier: selectTiersData(state),
    error: selectTiersError(state),
    tiersDisabled: selectTiersDisabled(state),
});
const mapDispatchToProps = dispatch => ({
    tiers: ({ uid, currency }) => dispatch(tiersFetch({ uid, currency })),
});
const ProfileTiers = connect(mapStateToProps, mapDispatchToProps)(ProfileTiersComponent);
export { ProfileTiers, };

