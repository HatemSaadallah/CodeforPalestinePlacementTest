import React from 'react';
import PropTypes from 'prop-types';
import './styles/questionStyle.css';

// Contains the question

function Question(props) {
  return <h2 className="question">{props.content}</h2>;
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
