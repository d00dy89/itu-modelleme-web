import React, { useState } from "react";

export default function Analysis() {
  const [selectedYear, setSelectedYear] = useState(2020);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMapType, setSelectedMapType] = useState("temperature");
  const [showDate, setShowDate] = useState(false);

  const handleNextImage = () => {
    if (selectedHour === 18) {
      const nextDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
      nextDate.setDate(nextDate.getDate() + 1);
      setSelectedYear(nextDate.getFullYear());
      setSelectedMonth(nextDate.getMonth() + 1);
      setSelectedDay(nextDate.getDate());
      setSelectedHour(0);
    } else {
      setSelectedHour((prevHour) => (prevHour + 6) % 24);
    }
  };

  const handlePrevImage = () => {
    if (selectedHour === 0) {
      const prevDate = new Date(selectedYear, selectedMonth - 1, selectedDay);
      prevDate.setDate(prevDate.getDate() - 1);
      setSelectedYear(prevDate.getFullYear());
      setSelectedMonth(prevDate.getMonth() + 1);
      setSelectedDay(prevDate.getDate());
      setSelectedHour(18);
    } else {
      setSelectedHour((prevHour) => (prevHour - 6 + 24) % 24);
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleDayChange = (e) => {
    setSelectedDay(parseInt(e.target.value));
  };

  const handleHourChange = (e) => {
    setSelectedHour(parseInt(e.target.value));
  };

  const handleMapTypeChange = (e) => {
    setSelectedMapType(e.target.value);
  };

  const handleShowDate = () => {
    setShowDate(true);
  };

  const formatDate = () => {
    const date = new Date(selectedYear, selectedMonth - 1, selectedDay, selectedHour);
    const formattedDate = date.toString().split(" ");
    const formattedDateString = `${formattedDate[1]} ${formattedDate[2]}, ${formattedDate[3]} ${formattedDate[4]} UTC`;
    return formattedDateString;
  };
  
  return (
    <div className="analysis-page">
      <h1>Analysis</h1>
      <section className="analysis-section">
        <div className="analysis-image-holder">
          <img
            src={`/images/era5_folder/era5_${selectedMapType}_${selectedYear}${selectedMonth < 10 ? '0' : ''}${selectedMonth}${selectedDay < 10 ? '0' : ''}${selectedDay}${selectedHour < 10 ? '0' : ''}${selectedHour}.jpg`}
            alt={`era5_${selectedMapType}_${selectedYear}${selectedMonth < 10 ? '0' : ''}${selectedMonth}${selectedDay < 10 ? '0' : ''}${selectedDay}${selectedHour < 10 ? '0' : ''}${selectedHour}`}
          />
          <div className="analysis-controls">
            <button className="analysis-control-button" onClick={handlePrevImage}>Previous</button>
            <button className="analysis-control-button" onClick={handleNextImage}>Next</button>
          </div>
        </div>
        <div className="analysis-date-selector">
          <label>Select Map Type:</label>
          <select value={selectedMapType} onChange={handleMapTypeChange}>
            {["temperature", "snow", "precipitation", "wind10m", "height500hpa"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <label>Select Year:</label>
          <select value={selectedYear} onChange={handleYearChange}>
            {[...Array(5)].map((_, index) => (
              <option key={index} value={2020 + index}>{2020 + index}</option>
            ))}
          </select>
          <label>Select Month:</label>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
          <label>Select Day:</label>
          <select value={selectedDay} onChange={handleDayChange}>
            {[...Array(31)].map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
          <label>Select Hour:</label>
          <select value={selectedHour} onChange={handleHourChange}>
            {[0, 6, 12, 18].map((hour) => (
              <option key={hour} value={hour}>{hour}:00</option>
            ))}
          </select>
          <button className="show-button" onClick={handleShowDate}>Show</button>
          {showDate && <p>Date: {formatDate()}</p>}
          {/* {showDate && <p>Filename: era5_{selectedMapType}_{selectedYear}{selectedMonth < 10 ? '0' : ''}{selectedMonth}{selectedDay < 10 ? '0' : ''}{selectedDay}{selectedHour < 10 ? '0' : ''}{selectedHour}.jpg</p>} */}
        </div>
      </section>
      <section className="analysis-about-container">
        <h2>About ERA5 Model</h2>
        <p>
          ERA5 is the fifth generation of the European Centre for Medium-Range Weather Forecasts (ECMWF)
          atmospheric reanalyses of the global climate. It provides hourly estimates of a vast array of atmospheric,
          land, and oceanic climate variables, spanning from 1950 to the near present.
          These reanalyses combine model data with observations from across the world into a globally complete and consistent dataset. 
        </p>
        <p>
          We are using ERA5 data for every 0, 6, 12, and 18 Z runs,
          which we then visualize to assist students in understanding and analyzing past weather and climate events.
          This approach provides a comprehensive tool for educational purposes, 
          enabling detailed study and retrospective analysis of complex atmospheric phenomena.
        </p>
      </section>
    </div>
  );
}
