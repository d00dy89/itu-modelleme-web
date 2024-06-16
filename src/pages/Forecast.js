import React, { useState } from "react";

const generateImageLinks = (baseFolder, domain, range) => {
  const links = [];
  for (let i = 0; i <= range; i++) {
    links.push(`/images/wrf_output_maps/${domain}/${baseFolder}/${baseFolder}_${i}.png`);
  }
  return links;
};

export default function Forecast() {
  const [activeGraph, setActiveGraph] = useState("pwat");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState("d01");
  const [range, setRange] = useState(24);
  const [imageLinks, setImageLinks] = useState(generateImageLinks("pwat", "d01", 24));

  const graphTypes = {
    d01: [
      { value: "avo_adv500", label: "500 hPa Absolute Vorticity Advection" },
      { value: "eth850", label: "850 hPa Equivalent Temperature" },
      { value: "pwat", label: "Precipitable Water" },
      { value: "rh700", label: "700 hPa Relative Humidity" },
      { value: "rvo300", label: "300 hPa Relative Vorticity" },
      { value: "rvo500", label: "500 hPa Relative Vorticity" },
      { value: "tempadv850", label: "850 hPa Temperature Advection" },
      { value: "temphgt500", label: "500 hPa Temperature" },
      { value: "temphgt850", label: "850 hPa Temperature" },
      { value: "total_precip", label: "Total Precipitation" },
      { value: "vertical_v500", label: "500 hPa Vertical Velocity" },
    ],
    d02: [
      { value: "pwat", label: "Precipitable Water" },
      { value: "rh700", label: "700 hPa Relative Humidity" },
      { value: "rvo300", label: "300 hPa Relative Vorticity" },
      { value: "rvo500", label: "500 hPa Relative Vorticity" },
      { value: "temphgt850", label: "850 hPa Temperature" },
      { value: "vertical_v500", label: "500 hPa Vertical Velocity" },
    ]
  };

  const handleChangeGraph = (graphType) => {
    setActiveGraph(graphType);
    setImageLinks(generateImageLinks(graphType, selectedDomain, range));
    setSelectedImageIndex(0);
  };

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  const handleChangeDomain = (domain) => {
    const newRange = domain === "d01" ? 24 : 72;
    setSelectedDomain(domain);
    setRange(newRange);
    setImageLinks(generateImageLinks(activeGraph, domain, newRange));
    setSelectedImageIndex(0);
  };

  return (
    <div className="forecast-page">
      <h1>Forecast</h1>
      <section className="forecast-section">
        <div className="forecast-options-panel">
          {graphTypes[selectedDomain].map((graph) => (
            <button key={graph.value} onClick={() => handleChangeGraph(graph.value)}>
              {graph.label}
            </button>
          ))}
        </div>
        <div className="forecast-image-container">
          <div className="forecast-image-holder">
            <img src={imageLinks[selectedImageIndex]} alt={`graph-${selectedImageIndex}`} />
          </div>
          <div className="forecast-slider-holder">
            <input
              type="range"
              min="0"
              max={imageLinks.length - 1}
              value={selectedImageIndex}
              onChange={(e) => handleImageChange(parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="forecast-domain-panel">
          <button onClick={() => handleChangeDomain("d01")}>WRF Domain 1</button>
          <button onClick={() => handleChangeDomain("d02")}>WRF Domain 2</button>
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
