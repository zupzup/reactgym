'use strict';

var React = require('react'),
    css = require('style/url!file!../styles/style.css'),
    Router = require('react-router'),
    MenuStoreActionCreators = require('./actions/MenuStoreActionCreators'),
    HeaderState = require('./stores/HeaderState'),
    Route = Router.Route,
    Exercises = require('./pages/Exercises'),
    Workouts = require('./pages/Workouts'),
    App = require('./App');

var routes = (
    <Route name='home' path='/' handler={App}>
      <Route name='exercises' path='/exercises' handler={Exercises} />
      <Route name='workouts' path='/workouts' handler={Workouts} />
    </Route>
);

MenuStoreActionCreators.getAllMenuPoints();
HeaderState.init();

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler/>, document.body);
});
