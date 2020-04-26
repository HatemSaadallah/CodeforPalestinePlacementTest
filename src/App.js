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

// This vriable is used to store the previous answer of the question, when the user goes back, it will use this value
var userAnswerPrev;

// Prompt the username
let name = prompt("الرجاء أدخل الاسم:");


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0, // This is used as a question counter
      questionId: 1, // This is a question ID
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.setPreviousQuestion = this.setPreviousQuestion.bind(this);
  }

  // Whenever a component mounts, the answers will be shuffled so they will not be the same
  componentDidMount() {
    const shuffledAnswerOptions = quizQuestions.map(question =>
      this.shuffleArray(question.answers)
    );
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0]
    });
  }
// This function is used to shuffle things, I used it to shuffle answers, could be used to shuffle questions as well, havn't tried it yet.
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

  // This function sets the answer the user entered while inserting the initial values of the state
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

  // This function is used to append the data the user entered to the existing answers, I used the three dots to take the existing values and add up to them.
  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer: answer
    }));
  }


  // This function does the opposite of the previous one, it removes the answer and subtract 1 from answersCount so it will go back the previous question.
  removeUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) - 1
      },
      answer: answer
    }));
  }

// This function is deprecated, there's no need for it, I am keeping it for a purpose but will remove it asap.
  setWrittenQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
  }

  // This function adds up one to counter and questonId in the state store whenever the user inputs his answer
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

  // This function does the same as the previous one but there some options that are not needed because it's a written question, will optimize it as soon as I figure this shit out
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

  // Same as the previous one with minus sign.

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

  // This function returns the results the user did input.
  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    // const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    // const maxAnswerCount = Math.max.apply(null, answersCountValues);

    // return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
    return answersCount;
  }

  // This function sets a value to result that is the state store, and when result change, it will show the results.
  setResults(result) {
    // if (result.length === 1) {
      this.setState({ result: result });
    // } else {
      // this.setState({ result: 'Undetermined' });
    // }
  }

  // This function returns the component the return the MCQ questions
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

  // This function returns the componentthe returns the written questions
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

  // This function returns the results
  renderResult() {
    return <Result quizResult={JSON.stringify(this.state.result)} />;
  }

  // This function is responsiple of rendering the content in the page
  rendering(){
    if (this.state.counter < 5) {
      return this.renderQuiz();
    } else if (this.state.counter >= 5){
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
