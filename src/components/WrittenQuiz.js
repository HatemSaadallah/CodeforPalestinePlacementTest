import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import { Form, Button } from 'react-bootstrap';
import GoBack from '../components/GoBack';
// import { TextField } from '@material-ui/core';
import './styles/questionStyle.css';

function WrittenQuiz(props){
  return(
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
    <div  key={props.questionId}>
      <QuestionCount counter={props.questionId} total={props.questionTotal} />
      <Question content={props.question} />
      <Form.Group className="template">
        <Form.Control className="form"  as="textarea" rows="3" />
      </Form.Group>
      <GoBack goBack={props.goBack}/>
      <button onClick={props.goNext}>التالي</button>
    </div>
    </CSSTransitionGroup>
  );
}
// WrittenQuiz.propTypes = {
//   question: PropTypes.string.isRequired,
//   questionId: PropTypes.number.isRequired,
//   questionTotal: PropTypes.number.isRequired,
// };
export default WrittenQuiz;
