import React, { useEffect, useState } from 'react';
import Navbar from '../component/NavBar';
import Footer from '../component/Footer';
import Card from '../component/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodcat, setFoodcat] = useState([]);
  const [fooditem, setFooditem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setFooditem(data[0]);
      setFoodcat(data[1]);
      console.log(data[0], data[1]);
    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain" }}>
          <div className="carousel-inner" id='carousal'>
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="Burger" />
            </div>
            <div className="carousel-item">
              <img src="https://media.istockphoto.com/id/478348860/photo/chocolate-cake-with-chocolate-fudge-drizzled-icing-and-chocolate-curls.webp?b=1&s=170667a&w=0&k=20&c=D88K93o1MsvHIysc_RcVzJUMkbv3x1CdloRILuIF-sA=" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="Chocolate Cake" />
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww" style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="Burger" />
            </div>
          </div>
          <div className="carousel-caption" style={{ zIndex: "10", bottom: "20px", }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {foodcat.length > 0 ? foodcat.map((category) => (
          <div key={category.id} className='row mb-3'>
            <div className='fd-3 m-3'>
              <h5>{category.CategoryName}</h5>
              <hr className='custom-line' />
              <div className='row'>
                {fooditem.length > 0 ? fooditem
                  .filter((item) => ((item.CategoryName === category.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))))
                  .map((filteredItem) => (
                    <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodItem={filteredItem}
                        options={filteredItem.options && filteredItem.options.length > 0 ? filteredItem.options[0] : {}}
                        imgsrc={filteredItem.img} // Ensure imgsrc is passed correctly
                      />
                    </div>
                  )) : <p>No items available for this category</p>}
              </div>
              <hr className='custom-line' />
            </div>
          </div>
        )) : <p>No categories available</p>}
      </div>
      <Footer />
    </div>
  );
}
