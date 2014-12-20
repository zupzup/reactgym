'use strict';

var React = require('react'),
    css = require('style/url!file!../styles/style.css'),
    Router = require('react-router'),
    Route = Router.Route,
    Exercises = require('./pages/exercises'),
    Workouts = require('./pages/workouts'),
    App = require('./App');

var routes = (
    <Route name='home' path='/' handler={App}>
      <Route name='exercises' path='/exercises' handler={Exercises} />
      <Route name='workouts' path='/workouts' handler={Workouts} />
    </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
    React.render(<Handler/>, document.body);
});
