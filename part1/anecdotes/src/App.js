import React, { useState } from "react";

const initVote = (length) => () => Array.from({ length }, () => 0);

const App = ({ anecdotes }) => {
  const [selected, setSeleted] = useState(0);
  const [vote, setVote] = useState(initVote(anecdotes.length));

  const handleClick = () => {
    const r = Math.random() * anecdotes.length;
    const index = Math.floor(r);
    setSeleted(index);
  };

  const handleVote = () => {
    const voteHistory = vote.slice();
    voteHistory[selected]++;
    setVote(voteHistory);
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[vote.indexOf(Math.max(...vote))]}</p>
    </>
  );
};

export default App;
