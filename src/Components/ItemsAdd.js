import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const ItemsAdd = () => {
  const displayData = useLoaderData();
  const [displayItems, setDisplayItems] = useState([]);

  useEffect(() => {
    setDisplayItems(displayData);
  }, []);

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
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          const newData = [...displayData, items];
          setDisplayItems(newData);

          alert("Item added Sussectfully");
          event.target.reset();
        }
      });
  };

  const itemsAdded = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    items[name] = value;
  };

  const itemsDeletedHandelar = (id) => {};

  console.log(displayData);
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
              <th className="border border-black">Deleted</th>
              <th className="border border-black">Name</th>
              <th className="border border-black">Price</th>
              <th className="border border-black">Quantity</th>
            </tr>
            {displayItems.map((data) => (
              <tr className="text-center">
                <td className="border border-black">
                  <button
                    onClick={() => itemsDeletedHandelar(data._id)}
                    className="text-red-600 font-bold"
                  >
                    X
                  </button>
                </td>
                <td className="border border-black">{data.name}</td>
                <td className="border border-black">${data.price}</td>
                <td className="border border-black">{data.quantity}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemsAdd;
