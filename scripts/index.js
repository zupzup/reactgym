'use strict';

import React from 'react';
import Router from 'react-router';
import MenuStoreActionCreators from './actions/MenuStoreActionCreators';
import HeaderState from './stores/HeaderState';
import AppStateActionCreators from './actions/AppStateActionCreators';
import ExerciseStoreActionCreators from './actions/ExerciseStoreActionCreators';
import WorkoutStoreActionCreators from './actions/WorkoutStoreActionCreators';
import Exercises from './pages/Exercises';
import Training from './pages/Training';
import Home from './pages/Home';
import TrainingDetail from './pages/TrainingDetail';
import BackupRestore from './pages/BackupRestore';
import Settings from './pages/Settings';
import Workouts from './pages/Workouts';
import App from './App';

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
