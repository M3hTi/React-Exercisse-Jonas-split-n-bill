import Item from "./Item";

function FriendList({ list, curOpen, onSelect }) {
  return (
    <ul>
      {list.map((item) => (
        <Item itemObj={item} key={item.id} curOpen={curOpen} onSelect={onSelect}/>
      ))}
    </ul>
  );
}

export default FriendList;
