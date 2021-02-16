const NewTicket = () => {
  return (
    <div>
      <h1>Create a Ticket</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input className="form-control" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="">Price</label>
          <input className="form-control" type="text" />
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
