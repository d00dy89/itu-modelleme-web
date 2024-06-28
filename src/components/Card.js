import React from "react";
import "./components.css";
import PDFIcon from "./PDF_file_icon.svg";

export default function Card({ children, title, text, author, publishYear, publishJournal, doi, link }) {
  return (
    <div className="card">
      <div className="left-column">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="right-column">
        <h4>Identity Information</h4>
        <p>Author: {author}</p>
        <p>Published: {publishYear}</p>
        <p>Journal: {publishJournal}</p>
        <p>DOI: {doi}</p>
      </div>
      <div className="download-column">
        <a href={link} target="_black" rel="noopener noreferrer">
          <img src={PDFIcon} alt={title} />
        </a>
      </div>
    </div>
  );
}
