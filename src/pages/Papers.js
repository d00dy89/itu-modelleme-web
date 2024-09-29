import React from "react";
import Card from "../components/Card";
import papersData from "./papersData.json";

export default function Papers() {
  

  return (
    <div className="page papers">
      <h1>Research Articles</h1>
      <div className="card-wrapper">
        {papersData.map((paper, index) => (
          <Card
            key={index}
            title={paper.title}
            text={paper.text}
            author={paper.author}
            publishYear={paper.publishYear}
            publishJournal={paper.publishJournal}
            doi={paper.doi}
            link={paper.link}
            />
        ))}
      </div>
    </div>
  );
}
