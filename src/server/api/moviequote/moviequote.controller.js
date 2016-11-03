/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/moviequotes              ->  index
 * POST    /api/moviequotes              ->  create
 * GET     /api/moviequotes/:id          ->  show
 * PUT     /api/moviequotes/:id          ->  upsert
 * PATCH   /api/moviequotes/:id          ->  patch
 * DELETE  /api/moviequotes/:id          ->  destroy
 */

'use strict';

// import jsonpatch from 'fast-json-patch';
import Moviequote from './moviequote.model';

import getmoviequote from './getmoviequote';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

// function patchUpdates(patches) {
//   return function(entity) {
//     try {
//       jsonpatch.apply(entity, patches, validate true);
//     } catch(err) {
//       return Promise.reject(err);
//     }

//     return entity.save();
//   };
// }

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
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

// Gets a list of moviequotes
export function index(req, res) {
  getmoviequote.getMovieQuotes().then(function(list) {
    console.log('index() list.length = ' + list.length);
    res.send(list);   
  });
 
  // return Moviequote.find().exec()
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Gets a single Moviequote from the DB
export function show(req, res) {
  return Moviequote.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Moviequote in the DB
export function create(req, res) {
  console.log('req.body.quote : ' + req.body.quote);
  getmoviequote.addMovieQuotes(req.body);
  console.log('create() done');
  // respondWithResult(res);
  res.send('ok');
  // return Moviequote.create(req.body)
  //   .then(respondWithResult(res, 201))
  //   .catch(handleError(res));
}

// Upserts the given Moviequote in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Moviequote.findOneAndUpdate(req.params.id, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Moviequote in the DB
// export function patch(req, res) {
//   if(req.body._id) {
//     delete req.body._id;
//   }
//   return Moviequote.findById(req.params.id).exec()
//     .then(handleEntityNotFound(res))
//     .then(patchUpdates(req.body))
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// Deletes a Moviequote from the DB
export function destroy(req, res) {
  return Moviequote.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
