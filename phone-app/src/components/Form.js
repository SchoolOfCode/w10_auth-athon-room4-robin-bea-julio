import React from "react";

export default function Form() {
  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <label htmlFor="number">Number</label>
        <input type="number" placeholder="072" id="number" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
