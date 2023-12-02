import { Component } from 'react';
import Section from './components/Section/Section';
import Statistics from './components/Statistics/Statistics';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Notification from './components/Notification/Notification';

class App extends Component {
  #SECTION_TITLE = 'Please leave us feedback:';
  #NOTIF_MSG = 'There is no feedback';
  #FEEDBACK_OPTIONS = { good: 'Good', neutral: 'Neutral', bad: 'Bad' };

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = ({ good, neutral, bad }) => {
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = (good, total) => {
    return (good / total) * 100;
  };

  addGood = () => {
    this.setState(state => {
      return { good: state.good + 1 };
    });
  };
  addNeutral = () => {
    this.setState(state => {
      return { neutral: state.neutral + 1 };
    });
  };
  addBad = () => {
    this.setState(state => {
      return { bad: state.bad + 1 };
    });
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback(this.state);
    const positivePercentage = Math.round(this.countPositiveFeedbackPercentage(good, total));

    return (
      <Section title={this.#SECTION_TITLE}>
          <FeedbackOptions option={this.#FEEDBACK_OPTIONS.good} onLeaveFeedback={this.addGood} />
          <FeedbackOptions
            option={this.#FEEDBACK_OPTIONS.neutral}
            onLeaveFeedback={this.addNeutral}
          />
          <FeedbackOptions option={this.#FEEDBACK_OPTIONS.bad} onLeaveFeedback={this.addBad} />
        {total > 0
          ? (<Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={positivePercentage}
          />)
          : (<Notification message={this.#NOTIF_MSG}/>)}
      </Section>
    );
  }
}

export default App;
