import React from "react";
import "../Gallery.css";

import { PanelProps } from "../types/types";

const Panel: React.FC<PanelProps> = ({
  selectedCategory,
  filteredPhotos,
  setSelectedImage,
}) => {
  return (
    <section className="panel">
      <div className="panel__top">
        <h1 className="first-heading">{selectedCategory}</h1>
      </div>
      <div className="panel__images">
        {filteredPhotos.map((photo: any) => (
          <img
            key={photo.id}
            className="panel__img"
            src={photo.url}
            alt={photo.alt}
            onClick={() => setSelectedImage(photo.url)}
          />
        ))}
      </div>
    </section>
  );
};

export default Panel;
