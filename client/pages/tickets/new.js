import { useState } from "react";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input
            onBlur={onBlur}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="form-control"
            type="text"
          />
        </div>
        <button
          className="btn btn-primary
        ">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTicket;
