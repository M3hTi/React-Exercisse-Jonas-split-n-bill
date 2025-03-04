function Item({ itemObj, curOpen, onSelect }) {
  const { name, image, id, balance } = itemObj;
  const isOpen = curOpen === id;
  return (
    <li className={`${isOpen ? 'selected' : ''}`}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p className={`${balance < 0 ? "red" : balance > 0 ? "green" : ""}`}>
        {balance < 0
          ? `You owe ${name} ${Math.abs(balance)}€`
          : balance > 0
          ? `${name} owes you ${balance}€`
          : `you and  ${name} are even`}
      </p>
      <button className="button" onClick={() => onSelect(id)}>{isOpen ? "close" : "Select"}</button>
    </li>
  );
}

export default Item;
