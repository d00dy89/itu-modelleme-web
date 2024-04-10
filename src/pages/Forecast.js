import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Forecast() {
  return (
    <div className="page">
      <h1>Forecast</h1>
      <section className="forecast">
        <div className="panel">
          <h3>Kontrol paneli</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
          <button>KAYDET</button>
        </div>
        <div className="carousel-container">
          <Carousel autoPlay>
            <img src="https://www.modelleme.itu.edu.tr/T2/sicaklik_-0.jpg" />
            <img src="https://www.modelleme.itu.edu.tr/T2/sicaklik_-1.jpg" />
            <img src="https://www.modelleme.itu.edu.tr/T2/sicaklik_-2.jpg" />
            <img src="https://www.modelleme.itu.edu.tr/T2/sicaklik_-3.jpg" />
            <img src="https://www.modelleme.itu.edu.tr/T2/sicaklik_-4.jpg" />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
