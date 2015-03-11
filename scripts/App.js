'use strict';

let React = require('react/addons'),
    Header = require('./components/Header'),
    Menu = require('./components/Menu'),
    Modal = require('./components/Modal'),
    Router = require('react-router'),
    AppState = require('./stores/AppState'),
    AppStateActionCreators = require('./actions/AppStateActionCreators'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    RouteHandler = Router.RouteHandler,
    Navigation = Router.Navigation;

let App = React.createClass({
    mixins: [Router.State, Navigation],

    getInitialState() {
        return AppState.getAll();
    },

    contentHandler() {
        if(this.state.menuOpen) {
            AppStateActionCreators.closeMenu();
        }

        if(this.state.modal) {
            AppStateActionCreators.closeModal();
        } 
    },

    render() {
        let name = this.context.router.getCurrentRoutes().reverse()[0].name,
            menuOpen = this.state.menuOpen ? 'open' : '',
            modal = <Modal content={this.state.modal} closeHandler={AppStateActionCreators.closeModal}  />,
            modalClass = this.state.modal ? ' modalOpen' : '',
            mask = (menuOpen || this.state.modal) ? <div className={'mask' + modalClass} onClick={this.contentHandler}></div> : null;

        return (
            <div className='App'>
                <Menu className={menuOpen}/>
                {modal}
                {mask}
                <div className={'contentArea ' + menuOpen}>
                    <Header />
                    <ReactCSSTransitionGroup className='content' component='div' transitionName={AppState.getNextTransition()}>
                        <RouteHandler key={name} />
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
    },

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
});

module.exports = App;
