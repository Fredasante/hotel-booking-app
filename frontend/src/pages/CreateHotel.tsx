const CreateHotel = () => {
  return (
    <div>
      <h1>Create Hotel</h1>

      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter title"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Enter content"
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            className="form-control"
          />
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default CreateHotel;
