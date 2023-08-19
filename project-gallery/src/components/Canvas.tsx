import React from "react";
import "../Gallery.css";

import { CanvasProps } from "../types/types";

const Canvas: React.FC<CanvasProps> = ({ selectedImage }) => {
  return (
    <main className="main">
      <div className="artboard">
        <section className="canvas">
          {selectedImage && (
            <img
              className="canvas__img"
              src={selectedImage}
              alt="Selected Large Image"
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default Canvas;
