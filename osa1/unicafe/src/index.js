import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" handleClick={() => setGood(good + 1)} />
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="Bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good+neutral+bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={good+neutral+bad} />
          <StatisticLine text="Average" value={(good+bad*-1)/(good+neutral+bad)} />
          <StatisticLine text="Positive" value={(good/(good+neutral+bad)*100)+"%"} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

ReactDOM.render(<App />, 
  document.getElementById('root')
)