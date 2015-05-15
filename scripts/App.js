'use strict';

import React from "react/addons";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Modal from "./components/Modal";
import Router from "react-router";
import AppState from "./stores/AppState";
import AppStateActionCreators from "./actions/AppStateActionCreators";

let ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


let App = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return AppState.getAll();
    },

    contentHandler() {
        if (this.state.menuOpen) {
            AppStateActionCreators.closeMenu();
        }

        if (this.state.modal) {
            AppStateActionCreators.closeModal();
        }
    },

    render() {
        let name = this.context.router.getCurrentPath(),
            menuOpen = this.state.menuOpen ? 'open' : '',
            modal = <Modal content={this.state.modal} closeHandler={AppStateActionCreators.closeModal} />,
            modalClass = this.state.modal ? ' modalOpen' : '',
            mask = (menuOpen || this.state.modal) ?
                <div className={'mask' + modalClass} onClick={this.contentHandler}></div> : null;

        return (
            <div className='App'>
                <Menu className={menuOpen}/>
                {modal}
                {mask}
                <div className={'contentArea ' + menuOpen}>
                    <Header />
                    <ReactCSSTransitionGroup className='content'
                        component='div' transitionName={AppState.getNextTransition()}>
                        <Router.RouteHandler key={name} />
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    },

    getStateFromStores() {
        return AppState.getAll();
    },

    componentDidMount() {
        AppState.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        AppState.removeChangeListener(this._onChange);
    },

    _onChange() {
        this.setState(this.getStateFromStores());
    }
});

module.exports = App;

