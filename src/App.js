import "./styles.css";
import { useState, useEffect } from "react";

function getRandomQuote(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((json) => {
        setQuotes(json);
        setQuote(json[0]);
      });
  }, []);

  function getNewQuote() {
    setQuote(getRandomQuote(quotes));
  }

  function onRemoveItem(itemToRemove) {
    const newItems = items.filter((item) => {
      return item !== itemToRemove;
    });
    setItems(newItems);
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.item;
    const newItems = [...items, input.value];
    setItems(newItems);
    form.reset();
  }

  function Item({ item, onRemoveItem }) {
    return (
      <li>
        {item}
        <button className="delete" onClick={() => onRemoveItem(item)}>x</button>
      </li>
    );
  }

  return (
    <div class="container"> 
      <h1>To-Do App</h1>
      <h3>"{quote?.text}"</h3>
      <i>- {quote?.author}</i>
      <button class="quote-btn" onClick={getNewQuote}>New Quote</button>
      <div class="todo-list">
        <h2>To-Do List</h2>
        <form onSubmit={onSubmit}>
          <input type="text" name="item" placeholder="Add a new item" required/>
          <button class="add-btn">Add</button>
        </form>
        <ul> {items.map((item, index) => (<Item onRemoveItem={onRemoveItem} key={item + index} item={item} />))}</ul>
      </div>
    </div>
  );
  }