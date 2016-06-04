'use strict';

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {

  createAuthor: function(author) {
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_AUTHOR,
      author: AuthorApi.saveAuthor(author)
    });
  },

  updateAuthor: function(author) {
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: AuthorApi.saveAuthor(author)
    });
  },

  deleteAuthor: function(id) {
    AuthorApi.deleteAuthor(id);
    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_AUTHOR,
      id: id
    });
  }

};

module.exports = AuthorActions;
