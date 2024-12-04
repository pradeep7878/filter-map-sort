import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './FilterMapSort.css';

const FilterMapSort = () => {
    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState('');
    const [productsCopy, setProductsCopy] = useState([]);
    const [priceFilter, setPriceFilter] = useState([0, Infinity]); // Default: no price filter
    const [ratingFilter, setRatingFilter] = useState([0, 5]); // Default: no rating filter
    const API_URL = 'https://dummyjson.com/products';

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(API_URL);
                const data = response.data;
                setProducts(data.products);
                setProductsCopy(data.products);
            } catch (error) {
                console.log("Error occurred", error);
            }
        };

        getData();
    }, []);

    const handleChange = (e) => {
        setSearchProduct(e.target.value);
    };

    const handlePriceFilter = (price1, price2) => {
        setPriceFilter([price1, price2]);
    };



    const handleRatingFilter = (rating1, rating2) => {
        setRatingFilter([rating1, rating2]);
    };

    const filteredProducts = productsCopy
        .filter((product) =>
            product.price >= priceFilter[0] &&
            product.price <= priceFilter[1]
        )
        .filter((product) =>
            product.rating >= ratingFilter[0] &&
            product.rating <= ratingFilter[1]
        )
        .filter((product) =>
            product.title.toLowerCase().startsWith(searchProduct.toLowerCase())
        );

    console.log("priceFilter", priceFilter)
    console.log("ratingFilter", ratingFilter)
    console.log("products", products)
    console.log("filteredProducts", filteredProducts)

    return (
        <>
            <div className="container px-5">
                <h1 className="my-5">Filter Map Sort</h1>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <form>
                                <input
                                    className="form-control mb-2"
                                    type="text"
                                    placeholder="Search Product.."
                                    value={searchProduct}
                                    onChange={handleChange}
                                />
                                <button className="btn btn-primary" type="button">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
                <table className="table table-bordered text-center align-middle">
                    <thead>
                        <tr className="align-middle">
                            <th scope="col">S.No</th>
                            <th scope="col">Title</th>
                            <th scope="col">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Price
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" onClick={() => handlePriceFilter(0, Infinity)}>All</a></li>
                                        <li><a className="dropdown-item" onClick={() => handlePriceFilter(0, 100)}>0-100</a></li>
                                        <li><a className="dropdown-item" onClick={() => handlePriceFilter(101, 1000)}>101-1000</a></li>
                                        <li><a className="dropdown-item" onClick={() => handlePriceFilter(1001, 2000)}>1001 and above</a></li>
                                    </ul>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Rating
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" onClick={() => handleRatingFilter(0, 5)}>All</a></li>
                                        <li><a className="dropdown-item" onClick={() => handleRatingFilter(4.0, 4.5)}>4.00-4.50</a></li>
                                        <li><a className="dropdown-item" onClick={() => handleRatingFilter(4.51, 5.0)}>4.51-5.00</a></li>
                                    </ul>
                                </div>
                            </th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td onClick={() => setSearchProduct(product.title)}>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.rating}</td>
                                <td>
                                    <img
                                        className="product-image"
                                        src={product.thumbnail}
                                        alt="product"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default FilterMapSort;
