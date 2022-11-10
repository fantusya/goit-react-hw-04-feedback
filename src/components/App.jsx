import React, { useState, useEffect } from 'react';
import SectionOfFeedback from './SectionOfFeedback';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const [total, setTotal] = useState(0);

  const { good, bad, neutral } = feedback;

  // IF SEPARATELY
  // const [good, setGood] = useState(0);
  // const [neutral, setNeutral] = useState(0);
  // const [bad, setBad] = useState(0);

  const handleIncrement = data => {
    setFeedback(prevState => ({
      ...prevState,
      [data]: prevState[data] + 1,
    }));
  };

  // IF SEPARATELY
  // const handleIncrement = data => {
  //   switch (data) {
  //     case 'good':
  //       setGood(prevstate => prevstate + 1);
  //       break;
  //     case 'neutral':
  //       setNeutral(prevstate => prevstate + 1);
  //       break;
  //     case 'bad':
  //       setBad(prevstate => prevstate + 1);
  //       break;
  //     default:
  //       throw new Error(`Unknowns feedback type - ${data}`);
  //   }
  // };

  // const countTotalFeedback = () => {
  //   const arrayOfValues = Object.values(this.state);
  //   return arrayOfValues.reduce((total, number) => total + number, 0);
  // };

  useEffect(() => {
    setTotal(good + neutral + bad);
  }, [good, neutral, bad]);

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / total) * 100);
  };

  return (
    <SectionOfFeedback title="Feedback of cafe Expresso">
      <FeedbackOptions
        options={Object.keys(feedback)}
        onLeaveFeedback={handleIncrement}
      />
      {total === 0 ? (
        <Notification message="There is no feedback" />
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      )}
    </SectionOfFeedback>
  );
};

// USING CLASS
// class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   handleIncrement = data => {
//     this.setState(prevState => ({
//       [data]: prevState[data] + 1,
//     }));
//   };

//   countTotalFeedback = () => {
//     const arrayOfValues = Object.values(this.state);
//     return arrayOfValues.reduce((total, number) => total + number, 0);
//   };

//   countPositiveFeedbackPercentage = () => {
//     const { good } = this.state;
//     const totalFeedbacks = this.countTotalFeedback();
//     return Math.round((good / totalFeedbacks) * 100);
//   };

//   render() {
//     const { good, neutral, bad } = this.state;

//     return (
//       <SectionOfFeedback title="Feedback of cafe Expresso">
//         <FeedbackOptions
//           options={Object.keys(this.state)}
//           onLeaveFeedback={this.handleIncrement}
//         />
//         {this.countTotalFeedback() === 0 ? (
//           <Notification message="There is no feedback" />
//         ) : (
//           <Statistics
//             good={good}
//             neutral={neutral}
//             bad={bad}
//             total={this.countTotalFeedback()}
//             positivePercentage={this.countPositiveFeedbackPercentage()}
//           />
//         )}
//       </SectionOfFeedback>
//     );
//   }
// }

export default App;
