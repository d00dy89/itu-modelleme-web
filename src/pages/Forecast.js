import React, { useState } from "react";

const imageLinks = {
  temperature: [
    "https://www.modelleme.itu.edu.tr/T2/sicaklik_-0.jpg",
    "https://www.modelleme.itu.edu.tr/T2/sicaklik_-1.jpg",
    "https://www.modelleme.itu.edu.tr/T2/sicaklik_-2.jpg",
    "https://www.modelleme.itu.edu.tr/T2/sicaklik_-3.jpg",
    "https://www.modelleme.itu.edu.tr/T2/sicaklik_-4.jpg",
  ],
  precipitation: [
    "https://www.modelleme.itu.edu.tr/yagis/yagis_-0.jpg",
    "https://www.modelleme.itu.edu.tr/yagis/yagis_-1.jpg",
    "https://www.modelleme.itu.edu.tr/yagis/yagis_-2.jpg",
    "https://www.modelleme.itu.edu.tr/yagis/yagis_-3.jpg",
    "https://www.modelleme.itu.edu.tr/yagis/yagis_-4.jpg",
  ],
  snow: [
    "https://www.modelleme.itu.edu.tr/bulut/snowfall-0.jpg",
    "https://www.modelleme.itu.edu.tr/bulut/snowfall-1.jpg",
    "https://www.modelleme.itu.edu.tr/bulut/snowfall-2.jpg",
    "https://www.modelleme.itu.edu.tr/bulut/snowfall-3.jpg",
    "https://www.modelleme.itu.edu.tr/bulut/snowfall-4.jpg",
  ],
};

export default function Forecast() {
  const [activeGraph, setActiveGraph] = useState("temperature");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleChangeGraph = (graphType) => {
    setActiveGraph(graphType);
    setSelectedImageIndex(0);
  };

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="forecast-page">
      <h1>Forecast</h1>
      <section className="forecast-section">
        <div className="forecast-options-panel">
          <button onClick={() => handleChangeGraph("temperature")}>Temperature</button>
          <button onClick={() => handleChangeGraph("precipitation")}>Precipitation</button>
          <button onClick={() => handleChangeGraph("snow")}>Snow</button>
        </div>
        <div className="forecast-image-holder">
          <img src={imageLinks[activeGraph][selectedImageIndex]} alt={`graph-${selectedImageIndex}`} />
          <input
            type="range"
            min="0"
            max={imageLinks[activeGraph].length - 1}
            value={selectedImageIndex}
            onChange={(e) => handleImageChange(parseInt(e.target.value))}
          />
        </div>
      </section>
      <section className="forecast-about-container">
        <h2>About WRF Model</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere ipsum vitae felis consectetur, sit amet elementum urna dapibus. Vivamus nec risus non purus fermentum lacinia.
        </p>
        <p>
          Integer nec tortor non purus viverra faucibus. Sed nec risus eget nunc placerat volutpat. Vivamus consequat, justo non vehicula consequat, purus libero lacinia nunc, nec placerat justo lorem vel mauris.
        </p>
      </section>
    </div>
  );
}