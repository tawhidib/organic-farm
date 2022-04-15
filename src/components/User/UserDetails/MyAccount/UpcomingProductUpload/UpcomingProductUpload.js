import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import useAuth from "../../../../../hooks/useAuth";
import LoadingSpinner from "../../../../utilities/LoadingSpinner/LoadingSpinner";

export default function UpcomingProductUpload() {
  const [cropName, setCropName] = useState("");
  const [cropCategory, setCropCategory] = useState("");
  const [cropQuantity, setCropQuantity] = useState("");
  const [cropPrice, setCropPrice] = useState(0);
  const [cropStock, setCropStock] = useState(0);
  const [cropImage, setCropImage] = useState(null);
  const [allCrop, setAllCrop] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [myCrop, setMyCrop] = useState([]);

  const [updatedCropName, setUpdatedCropName] = useState("");
  const [updatedCropCategory, setUpdatedCropCategory] = useState("");
  const [updatedCropQuantity, setUpdatedCropQuantity] = useState("");
  const [updatedCropPrice, setUpdatedCropPrice] = useState(0);
  const [updatedCropStock, setUpdatedCropStock] = useState(0);

  const { user } = useAuth();

  const uploadCropHandler = (event) => {
    event.preventDefault();
    const d = new Date();
    const postTime = `${d.toLocaleString("default", {
      month: "short",
    })}'${d.getDate()} ${d.getFullYear()}`;

    const formData = new FormData();
    formData.append("name", cropName);
    formData.append("category", cropCategory);
    formData.append("quantity", cropQuantity);
    formData.append("price", cropPrice);
    formData.append("stock", cropStock);
    formData.append("file", cropImage);
    formData.append("farmerId", user._id);
    formData.append("farmerName", user.name);
    formData.append("postTime", postTime);

    axios
      .post(
        "https://shrouded-basin-02702.herokuapp.com/add_new_upcoming_product",
        formData
      )
      .then((res) => {
        console.log(res);
        setFlag((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
      });

    setCropName("");
    setCropCategory("");
    setCropQuantity("");
    setCropPrice(0);
    setCropStock(0);
    setCropImage(null);
  };
  const loadMyCrops = async () => {
    try {
      const data = await axios
        .get("https://shrouded-basin-02702.herokuapp.com/all_upcoming_products")
        .then((res) => {
          setAllCrop(res.data.reverse());
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (allCrop.length > 0) {
      const filtered = allCrop.filter((myCrop) => user._id === myCrop.farmerId);
      setMyCrop(filtered);
    }
  }, [allCrop]);

  const updateCrop = (
    id,
    farmerName,
    farmerId,
    updatedCropName,
    updatedCropCategory,
    updatedCropQuantity,
    updatedCropPrice,
    updatedCropStock,
    prevName,
    prevCategory,
    prevQuantity,
    prevPrice,
    prevStock
  ) => {
    const d = new Date();
    const postTime = `${d.toLocaleString("default", {
      month: "short",
    })}'${d.getDate()} ${d.getFullYear()}`;

    axios
      .post(
        "https://shrouded-basin-02702.herokuapp.com/update_upcoming_product_info",
        {
          id: id,
          name: updatedCropName || prevName,
          category: updatedCropCategory || prevCategory,
          quantity: updatedCropQuantity || prevQuantity,
          price: updatedCropPrice || prevPrice,
          stock: updatedCropStock || prevStock,
          farmerId: farmerId,
          farmerName: farmerName,
          postTime: postTime,
        }
      )
      .then((res) => {
        console.log(res);
        setFlag((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => loadMyCrops(), [flag]);

  const deleteMyCrop = (id) => {
    axios
      .post(
        "https://shrouded-basin-02702.herokuapp.com/delete_upcoming_product",
        {
          id: id,
        }
      )
      .then((res) => {
        console.log(res);
        setFlag((prevState) => !prevState);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h3 className="text-center mb-4">Upload A New Upcoming Crop</h3>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <form onSubmit={uploadCropHandler}>
            <div>
              <div className="form-group mt-4">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={cropName}
                  placeholder="Crop Name..."
                  onChange={(e) => {
                    setCropName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-4">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={cropCategory}
                  placeholder="Crop Category..."
                  onChange={(e) => {
                    setCropCategory(e.target.value);
                  }}
                />
              </div>
              <div className="form-group mt-4">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={cropQuantity}
                  placeholder="Crop Quantity..."
                  onChange={(e) => {
                    setCropQuantity(e.target.value);
                  }}
                />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="cropStock">Crop Price</label>
                <input
                  required
                  type="number"
                  id="cropPrice"
                  className="form-control"
                  value={cropPrice}
                  min={0}
                  placeholder="Crop Price..."
                  onChange={(e) => {
                    setCropPrice(e.target.value);
                  }}
                />
              </div>

              <div className="form-group mt-4">
                <label htmlFor="cropStock">Crop Stock</label>
                <input
                  required
                  type="number"
                  id="cropStock"
                  className="form-control"
                  value={cropStock}
                  min={0}
                  placeholder="Crop Stock..."
                  onChange={(e) => {
                    setCropStock(e.target.value);
                  }}
                />
              </div>

              <div className="form-group mt-4">
                <input
                  required
                  type="file"
                  className="form-control"
                  onChange={(e) => setCropImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="form-group mt-4">
              <button type="submit" className="list-btn px-4 py-2 text-white">
                Upload Crop
              </button>
            </div>
          </form>
        </div>
      </div>
      <hr />

      {Boolean(myCrop) && (
        <Fragment>
          <h3 className="text-center my-4">My Uploaded Upcoming Crops</h3>
          <div className="table-responsive">
            <table className="table  table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Post Time</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              <tbody>
                {myCrop.map((crop, index) => (
                  <tr key={crop._id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <input
                        onChange={(e) => setUpdatedCropName(e.target.value)}
                        className="form-control"
                        type="text"
                        defaultValue={crop.name}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => setUpdatedCropCategory(e.target.value)}
                        className="form-control"
                        defaultValue={crop.category}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        onChange={(e) => setUpdatedCropQuantity(e.target.value)}
                        type="text"
                        defaultValue={crop.quantity}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        onChange={(e) => setUpdatedCropPrice(e.target.value)}
                        min="1"
                        type="number"
                        defaultValue={crop.price}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        onChange={(e) => setUpdatedCropStock(e.target.value)}
                        min="1"
                        type="number"
                        defaultValue={crop.stock}
                      />
                    </td>
                    <td>{crop.postTime}</td>
                    <td>
                      <button
                        onClick={() =>
                          updateCrop(
                            crop._id,
                            crop.farmerName,
                            crop.farmerId,
                            updatedCropName,
                            updatedCropCategory,
                            updatedCropQuantity,
                            updatedCropPrice,
                            updatedCropStock,
                            crop.name,
                            crop.category,
                            crop.quantity,
                            crop.price,
                            crop.stock
                          )
                        }
                        className="list-btn px-3 py-1"
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteMyCrop(crop._id)}
                        className="list-btn px-3 py-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      )}

      {isLoading && <LoadingSpinner />}
    </>
  );
}
