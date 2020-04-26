import React from 'react';

class Counter extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      minutes: props.minutes,
      seconds: 0
    }
  }
  componentDidMount() {
  this.myInterval = setInterval(() => {
    const { seconds, minutes } = this.state
    if (seconds > 0) {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1
      }))
    }
      if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(this.myInterval)
          } else {
            this.setState(({ minutes }) => ({
              minutes: minutes - 1,
              seconds: 59
            }))
          }
        }
      }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

  render(){
    const {minutes, seconds} = this.state;
    return(
        <div>{minutes}:{seconds < 10 ? `0${ seconds }` : seconds} <span>:الوقت المتبقي</span></div>
    );
  }
}

export default Counter;