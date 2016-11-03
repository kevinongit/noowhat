/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/movies              ->  index
 * POST    /api/movies              ->  create
 * GET     /api/movies/:id          ->  show
 * PUT     /api/movies/:id          ->  update
 * DELETE  /api/movies/:id          ->  destroy
 */

 'use strict';

 import _ from 'lodash';
 import Movie from './movie.model';
 import getmovie from './build-movie-info';

 function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
    .then(updated => {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
      .then(() => {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Movies
export function index(req, res) {
  console.log('here index()');
  getmovie.getRemoteMovieInfo()
      .then(function(list) {
        var fs = require('fs');
        var filename = './boxoffice.json';
        // console.log('*********list = ' + JSON.stringify(list));
        fs.writeFile(filename, JSON.stringify(list), function (err) {
          if (err) { console.log('error : ' + err);}
          console.log('file created : ' + filename);
        });
        res.send(list);
      })
      .catch(handleError(res));
}
// export function index(req, res) {
//   console.log('here index()');
//   getmovie.getDailyBoxOffice().then(function(data) {
//     console.log('inside then');
//     getmovie.prettify(data);

//     res.send(data);
//   })
//   .catch(handleError(res));
// } 

// Gets a single Movie from the DB
export function show(req, res) {
  console.log('show() req.params.id = ' + req.params.id);

  getmovie.getMovieInfoByName(req.params.id).then(function(data) {
    console.log('inside show - then');
    getmovie.prettify2(data);
    res.send(data);
    console.log('res sent!')
  })
  .catch(handleError(res));
}

// Creates a new Movie in the DB
export function create(req, res) {
  return Movie.create(req.body)
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}

// Updates an existing Movie in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Movie.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(saveUpdates(req.body))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Deletes a Movie from the DB
export function destroy(req, res) {
  return Movie.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}
