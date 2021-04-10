import React from 'react';
import CounterContainer from './containers/CounterContainer';
import TodoContainer from './containers/TodoContainer';

const App = () => {
  return (
    <div>
      <CounterContainer number={0} />
      <hr />
      <TodoContainer />
    </div>
  )
}

export default App;