import React from 'react';

export default function Carousel() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain"}}>
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
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
        </form>
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
  );
}
