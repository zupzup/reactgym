'use strict';

var React = require('react'),
    css = require('style/url!file!../styles/style.css'),
    Router = require('react-router'),
    MenuStoreActionCreators = require('./actions/MenuStoreActionCreators'),
    HeaderState = require('./stores/HeaderState'),
    AppStateActionCreators = require('./actions/AppStateActionCreators'),
    ExerciseStoreActionCreators = require('./actions/ExerciseStoreActionCreators'),
    Route = Router.Route,
    Exercises = require('./pages/Exercises'),
    Home = require('./pages/Home'),
    Workouts = require('./pages/Workouts'),
    App = require('./App');

var routes = (
    <Route handler={App}>
        <Route name='home' path='/' handler={Home} />
        <Route name='exercises' path='/exercises' handler={Exercises} />
        <Route name='workouts' path='/workouts' handler={Workouts} />
    </Route>
);

window.onpopstate = function() {
    AppStateActionCreators.setNextTransition('slideBack');
};

MenuStoreActionCreators.getAllMenuPoints();
ExerciseStoreActionCreators.getExercises();
HeaderState.init();

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler/>, document.body);
    // reset Transition animation after every transition
    AppStateActionCreators.resetTransitions();
});
