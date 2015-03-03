'use strict';

var React = require('react'),
    Router = require('react-router'),
    MenuStoreActionCreators = require('./actions/MenuStoreActionCreators'),
    HeaderState = require('./stores/HeaderState'),
    AppStateActionCreators = require('./actions/AppStateActionCreators'),
    ExerciseStoreActionCreators = require('./actions/ExerciseStoreActionCreators'),
    WorkoutStoreActionCreators = require('./actions/WorkoutStoreActionCreators'),
    Route = Router.Route,
    Exercises = require('./pages/Exercises'),
    Training = require('./pages/Training'),
    Home = require('./pages/Home'),
    TrainingDetail = require('./pages/TrainingDetail'),
    BackupRestore = require('./pages/BackupRestore'),
    Settings = require('./pages/Settings'),
    Workouts = require('./pages/Workouts'),
    App = require('./App');

var routes = (
    <Route handler={App}>
        <Route name='home' path='/' handler={Home} />
        <Route name='exercises' path='/exercises' handler={Exercises} />
        <Route name='workouts' path='/workouts' handler={Workouts} />
        <Route name='training' path='/training' handler={Training} />
        <Route name='detail' path='/detail' handler={TrainingDetail} />
        <Route name='backup' path='/backup' handler={BackupRestore} />
        <Route name='settings' path='/settings' handler={Settings} />
    </Route>
);

MenuStoreActionCreators.getAllMenuPoints();
ExerciseStoreActionCreators.getExercises();
WorkoutStoreActionCreators.getWorkouts();
HeaderState.init();

Router.run(routes, (Handler, state) => {
    if(state.action === 'pop') {
        AppStateActionCreators.setNextTransition('slideBack');
    }
    React.render(<Handler/>, document.body);
    // reset Transition animation after every transition
    AppStateActionCreators.resetTransitions();
});
