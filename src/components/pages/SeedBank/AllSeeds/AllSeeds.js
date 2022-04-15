import React, { useState, useEffect } from "react";
import SingleSeed from "../SingleSeed/SingleSeed";

export default function AllSeeds({ allSeed }) {
  const [searchKey, setSearchKey] = useState("");
  const [displayProduct, setDisplayProduct] = useState(allSeed);

  useEffect(() => {
    const filtredProduct = allSeed.filter((product) => {
      if (searchKey == "") {
        return product;
      } else if (product.name.toLowerCase().includes(searchKey.toLowerCase())) {
        return product;
      }
    });
    setDisplayProduct(filtredProduct);
  }, [searchKey]);
  return (
    <div className="container">
      <div className="container py-2 ">
        <div className="d-flex justify-content-end mb-4">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Seeds/Fertilizers..."
            id="searchKey"
            aria-label="Search"
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
          />
        </div>
      </div>

      {displayProduct.length ? (
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {displayProduct.map((seed) => (
            <div key={seed._id} className="col">
              <SingleSeed seed={seed} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center h5">No Product Available...</p>
      )}
    </div>
  );
}
