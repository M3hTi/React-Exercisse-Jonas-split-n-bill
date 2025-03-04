import * as React from "react";
import { nanoid } from "nanoid";
import FriendList from "./FriendList";
import Form from "./Form";

import "./App.css";

const initialFriends = [
  {
    id: nanoid(),
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: nanoid(),
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: nanoid(),
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friendList, setFriendList] = React.useState(initialFriends);
  const [formOpen, setFormOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("https://i.pravatar.cc/48");
  const [curOpen, setCurOpen] = React.useState(null);

  // declare states for split bill form
  const [billValue, setBillValue] = React.useState(0);
  const [urExpense, setUrExpense] = React.useState(0);
  // we can calculate other input value(friend expense)
  const friendExpense = billValue - urExpense;

  // declare state for control select element
  const [billPayer, setBillPayer] = React.useState("me");

  const selectedFriend = friendList.filter((friend) => friend.id === curOpen);

  function handlerSelectItem(id) {
    setCurOpen((s) => (s === id ? null : id));
    setFormOpen(false);
  }

  // for add friend form
  function handlerSubmit(e) {
    e.preventDefault();
    if (!name) return;
    const newItem = {
      id: nanoid(),
      name,
      image: imgUrl,
      balance: 0,
    };

    setFriendList([...friendList, newItem]);
    setName("");
    setImgUrl("https://i.pravatar.cc/48");
    setFormOpen(false);
  }

  // handler for split-bill
  function handleBillForm(e) {
    e.preventDefault();
    const didIPay = billPayer === "me" ? true : false;

    // console.log(didIPay);

    setFriendList((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === curOpen
          ? {
              ...friend,
              balance: didIPay
                ? friend.balance + friendExpense
                : friend.balance - urExpense,
            }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          list={friendList}
          curOpen={curOpen}
          onSelect={handlerSelectItem}
        />
        {formOpen && (
          <Form className="form-add-friend" onSubmitHandler={handlerSubmit}>
            <label>👫 Friend name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>🌄 Image URL</label>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
            <button className="button">Add</button>
          </Form>
        )}
        <button className="button" onClick={() => setFormOpen((s) => !s)}>
          {!formOpen ? "Add friend" : "close"}
        </button>
      </div>
      {curOpen && (
        <Form className="form-split-bill" onSubmitHandler={handleBillForm}>
          <h2>Split a bill with {selectedFriend[0].name}</h2>
          <label>💰 Bill Value</label>
          <input
            type="text"
            value={billValue}
            onChange={(e) => setBillValue(Number(e.target.value))}
          />
          <label>🧍‍♀️ Your expense</label>
          <input
            type="text"
            value={urExpense}
            onChange={(e) => setUrExpense(Number(e.target.value))}
          />
          <label>👫 {selectedFriend[0].name}'s expense</label>
          <input type="text" disabled={true} value={friendExpense} />
          <label>🤑 Who is paying the bill</label>
          <select
            value={billPayer}
            onChange={(e) => setBillPayer(e.target.value)}
          >
            <option value="me">you</option>
            <option value={selectedFriend[0].name}>
              {selectedFriend[0].name}
            </option>
          </select>
          <button class="button">Split bill</button>
        </Form>
      )}
    </div>
  );
}

export default App;
