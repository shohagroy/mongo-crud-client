import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const ItemsAdd = () => {
  const displayData = useLoaderData();
  const [displayItems, setDisplayItems] = useState([]);

  const [updateForm, setUpdatefrom] = useState(false);

  useEffect(() => {
    setDisplayItems(displayData);
  }, [displayData]);

  const [items, setItems] = useState({});
  const itemsAddedHandelar = (event) => {
    event.preventDefault();

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
          const addedItem = { ...items, _id: data.insertedId };

          const newData = [...displayData, addedItem];
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

  const itemsDeletedHandelar = (id) => {
    const confarmation = window.confirm("are you sure this item deleted");

    if (confarmation) {
      fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Items delete!");

            const remainItem = displayItems.filter((items) => items._id !== id);

            setDisplayItems(remainItem);
          }
        });
    }
  };

  const itemsUpdateHandelar = (id) => {
    fetch(`http://localhost:5000/items/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Items delete!");

          const remainItem = displayItems.filter((items) => items._id !== id);

          setDisplayItems(remainItem);
        }
      });
  };
  const updateHandelar = (id) => {
    setUpdatefrom(true);

    console.log(id);
  };

  const itemUpdateHandelar = (event) => {
    event.preventDefault();

    setUpdatefrom(false);
  };
  return (
    <div className="max-w-[1000px] mx-auto">
      <div>
        <form
          onSubmit={itemsAddedHandelar}
          className={`p-4 ${updateForm ? "hidden" : "block"}`}
        >
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

        <form
          onSubmit={itemUpdateHandelar}
          className={`p-4 ${updateForm ? "block" : "hidden"}`}
        >
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
            className=" bg-green-600 text-white py-2 px-8 text-md rounded-md"
          >
            Update
          </button>
        </form>
        <div className="mt-5">
          <table className="w-full">
            <tr className="border border-black">
              <th className="border border-black">Deleted/Update</th>
              <th className="border border-black">Name</th>
              <th className="border border-black">Price</th>
              <th className="border border-black">Quantity</th>
            </tr>
            {displayItems.map((data) => (
              <tr className="text-center" key={data._id}>
                <td className="border border-black">
                  <button
                    onClick={() => itemsDeletedHandelar(data._id)}
                    className="text-red-600 font-bold"
                  >
                    X
                  </button>
                  <button
                    onClick={() => updateHandelar(data._id)}
                    className="text-green-600 font-bold ml-4"
                  >
                    Update
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
