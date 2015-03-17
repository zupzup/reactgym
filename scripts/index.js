'use strict';

let React = require('react'),
    Router = require('react-router'),
    MenuStoreActionCreators = require('./actions/MenuStoreActionCreators'),
    HeaderState = require('./stores/HeaderState'),
    AppStateActionCreators = require('./actions/AppStateActionCreators'),
    ExerciseStoreActionCreators = require('./actions/ExerciseStoreActionCreators'),
    WorkoutStoreActionCreators = require('./actions/WorkoutStoreActionCreators'),
    Exercises = require('./pages/Exercises'),
    Training = require('./pages/Training'),
    Home = require('./pages/Home'),
    TrainingDetail = require('./pages/TrainingDetail'),
    BackupRestore = require('./pages/BackupRestore'),
    Settings = require('./pages/Settings'),
    Workouts = require('./pages/Workouts'),
    App = require('./App');

let Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

let routes = (
    <Route name='app' path='/' handler={App}>
        <DefaultRoute name='home' handler={Home} />
        <Route name='exercises' handler={Exercises} />
        <Route name='workouts' handler={Workouts} />
        <Route name='training' handler={Training} />
        <Route name='detail' handler={TrainingDetail} />
        <Route name='backup' handler={BackupRestore} />
        <Route name='settings' handler={Settings} />
    </Route>
);

MenuStoreActionCreators.getAllMenuPoints();
ExerciseStoreActionCreators.getExercises();
WorkoutStoreActionCreators.getWorkouts();
HeaderState.init();

Router.run(routes, (Handler, state) => {
    if (state.action === 'pop') {
        AppStateActionCreators.setNextTransition('slideBack');
    }
    React.render(<Handler/>, document.body);
    // reset Transition animation after every transition
    AppStateActionCreators.resetTransitions();
});
