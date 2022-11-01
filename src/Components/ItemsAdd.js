import React, { useState } from "react";
import { json } from "react-router-dom";

const ItemsAdd = () => {
  const [items, setItems] = useState({});
  const itemsAddedHandelar = (event) => {
    event.preventDefault();
    console.log("button click");
    console.log(items);

    // data post server and database
    fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(items),
    });

    event.target.reset();
  };

  const itemsAdded = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    items[name] = value;
  };
  return (
    <div className="max-w-[1000px] mx-auto">
      <div>
        <form onSubmit={itemsAddedHandelar} className="p-4">
          <input
            onBlur={itemsAdded}
            className="border p-2 m-2 rounded-md"
            type="text"
            name="name"
            placeholder="Items Name"
          />
          <input
            onBlur={itemsAdded}
            className="border p-2 m-2 rounded-md"
            type="text"
            name="price"
            placeholder="Items Price"
          />
          <input
            onBlur={itemsAdded}
            className="border p-2 m-2 rounded-md"
            type="text"
            name="quantity"
            placeholder="Items Quantity"
          />
          <button
            type="submit"
            className=" bg-red-600 text-white py-2 px-8 text-md rounded-md"
          >
            Add
          </button>
        </form>
        <div className="mt-5">
          <table className="w-full">
            <tr className="border border-black">
              <th className="border border-black">SL</th>
              <th className="border border-black">Name</th>
              <th className="border border-black">Price</th>
              <th className="border border-black">Quantity</th>
            </tr>
            <tr className="text-center">
              <td className="border border-black">1</td>
              <td className="border border-black">mango</td>
              <td className="border border-black">$20</td>
              <td className="border border-black">200</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemsAdd;
