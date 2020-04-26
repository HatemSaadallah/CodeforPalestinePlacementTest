import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import GoBack from '../components/GoBack';

function Quiz(props) {
  function renderAnswerOptions(key) {
    return (
      <AnswerOption
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={props.questionId}>
        <GoBack goBack={props.goBack}/>
        <button onClick={props.goNext}>التالي</button>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
        <Question content={props.question} />
        {console.log(typeof props.answerOptions, "hei")}
        {typeof props.answerOptions === "object" ?
          <ul className="answerOptions">
            {props.answerOptions.map(renderAnswerOptions)}
          </ul>
          :
          null}

      </div>
    </CSSTransitionGroup>
  );
}



export default Quiz;
