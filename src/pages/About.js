import { useEffect, useState } from "react";
import axios from "axios";

function About() {

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };

  const addProduct = async () => {

    await axios.post("http://localhost:5000/products", {
      name,
      description,
    });

    setName("");
    setDescription("");

    getProducts();
  };

  const deleteProduct = async (id) => {

    await axios.delete(`http://localhost:5000/products/${id}`);

    getProducts();
  };

  const editProduct = (product) => {

    setEditId(product._id);
    setName(product.name);
    setDescription(product.description);
  };

  const updateProduct = async () => {

    await axios.put(`http://localhost:5000/products/${editId}`, {
      name,
      description,
    });

    setEditId(null);
    setName("");
    setDescription("");

    getProducts();
  };

  return (
    <div>

      <h1>Product Details</h1>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {
        editId ? (
          <button onClick={updateProduct}>Update</button>
        ) : (
          <button onClick={addProduct}>Add</button>
        )
      }

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {
            products.map((product) => (
              <tr key={product._id}>

                <td>{product.name}</td>
                <td>{product.description}</td>

                <td>

                  <button onClick={() => editProduct(product)}>
                    Edit
                  </button>

                  <button onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>

                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default About;