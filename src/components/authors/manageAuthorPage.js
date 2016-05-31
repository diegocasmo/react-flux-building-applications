'use strict';

var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var Router = require('react-router');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({

  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if(component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      author: { id: '', firstName: '', lastName: '' },
      errors: { firstName: '', lastName: '' },
      dirty: false
    };
  },

  // Calling 'setState' in this method won't causa a re-render
  componentWillMount: function() {
    var authorId = this.props.params.id;
    if(authorId) {
      this.setState({ author: AuthorApi.getAuthorById(authorId) });
    }
  },

  setAuthorState: function(event) {
    this.setState({ dirty: true });
    var field = event.target.name,
        value = event.target.value;
    this.state.author[field] = value;
    return this.setState({ author: this.state.author });
  },

  authorFormIsValid: function() {
    var isValid = true;
    this.state.errors = { firstName: '', lastName: '' }; // Clear any previous error
    if(this.state.author.firstName.length < 3) {
      this.state.errors.firstName = 'First name must be at least 3 characters.';
      isValid = false;
    }
    if(this.state.author.lastName.length < 3) {
      this.state.errors.lastName = 'Last name must be at least 3 characters.';
      isValid = false;
    }
    this.setState({ errors: this.state.errors });
    return isValid;
  },

  saveAuthor: function(event) {
    event.preventDefault();
    if (this.authorFormIsValid()) {
      AuthorApi.saveAuthor(this.state.author);
      this.setState({ dirty: false });
      toastr.success('Author saved.');
      this.transitionTo('authors');
    }
  },

  render: function() {
    return (
      <AuthorForm
        author={ this.state.author }
        errors={ this.state.errors }
        onChange={ this.setAuthorState }
        onSave={ this.saveAuthor }/>
    );
  }

});

module.exports = ManageAuthorPage;
