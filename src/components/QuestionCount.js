import React from 'react';
import PropTypes from 'prop-types';
import './styles/questionCountStyle.css';

function QuestionCount(props) {
  return (
    <div className="questionCount">
      السؤال رقم <span>{props.counter}</span> من <span>{props.total}</span>
    </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
