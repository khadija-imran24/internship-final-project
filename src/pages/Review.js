import React, { useState } from "react";
import axios from "axios";

function Review() {
  const [form, setForm] = useState({ name: "", review: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/reviews", form)
      .then(() => alert("Review submitted!"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" onChange={handleChange} />
        <textarea name="review" placeholder="Write review" onChange={handleChange}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Review;
