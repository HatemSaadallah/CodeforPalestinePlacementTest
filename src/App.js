import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Counter from './components/Counter';
import logo from './svg/logo.svg';
import './App.css';
import GoBack from './components/GoBack';
// import WrittenTask from './components/WrittenTask';
import WrittenQuiz from './components/WrittenQuiz';

import './components/styles/appStyle.css';
var userAnswerPrev;
let name = prompt("الرجاء أدخل الاسم:");
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.setPreviousQuestion = this.setPreviousQuestion.bind(this);
  }
  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    userAnswerPrev = event.currentTarget.value;
    console.log(userAnswerPrev);
    if (this.state.questionId < quizQuestions.length-2) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else if (this.state.questionId < quizQuestions.length) {
      setTimeout(() => this.setNextWrittenQuestion(), 300);
    }
    else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }

  removeUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) - 1
      },
      answer: answer
    }));
  }

  setWrittenQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: ''
    });
  }


  setNextWrittenQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: "",
      answer: ''
    });
  }


  setPreviousQuestion(event) {
    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;


    this.removeUserAnswer(userAnswerPrev);

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      answer: userAnswerPrev
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    // const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    // const maxAnswerCount = Math.max.apply(null, answersCountValues);

    // return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
    return answersCount;
  }

  setResults(result) {
    // if (result.length === 1) {
      this.setState({ result: result });
    // } else {
      // this.setState({ result: 'Undetermined' });
    // }
  }


  renderQuiz() {
    return (
      <div>
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
        goBack={this.setPreviousQuestion}
        goNext={this.handleAnswerSelected}
      />
      </div>
    );
  }
  renderWritten() {
    return (
      // <Question content="The first question" />
      // <WrittenTask
      //
      // />
      <WrittenQuiz
        answer={this.state.answer}
        question={this.state.question}
        questionId={this.state.questionId}
        questionTotal={quizQuestions.length}
        goNext={this.handleAnswerSelected}
        GoBack={this.setPreviousQuestion}
      />
    );
  }
  renderResult() {
    return <Result quizResult={JSON.stringify(this.state.result)} />;
  }
  rendering(){
    if (this.state.counter < 5) {
      return this.renderQuiz();
    } else if (this.state.counter > 5){

      return this.renderWritten();
    }

    return this.renderResult();
    // return this.state.result ? this.renderResult() : this.renderQuiz()
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Code for Palestine اختبار التحاق ببرنامج</h2>
          <div>
            <Counter minutes='45'/>
          </div>
        </div>
        {this.rendering()}


      </div>
    );
  }
}

export default App;
