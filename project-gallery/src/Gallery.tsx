import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Panel from "./components/Panel";
import Canvas from "./components/Canvas";
import "./Gallery.css";

import { Photo } from "./types/types";

const Gallery: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch("https://frontend-gallery.darkube.app/api/photos")
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Error fetching photos:", error));

    fetch("https://frontend-gallery.darkube.app/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const filteredPhotos = photos.filter(
    (photo) =>
      (selectedCategory === "" || photo.category === selectedCategory) &&
      (searchQuery === "" ||
        photo.id.toString().includes(searchQuery) ||
        photo.category.includes(searchQuery) ||
        photo.photographer.includes(searchQuery) ||
        photo.alt.includes(searchQuery))
  );

  return (
    <div className="App">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="app__container">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Panel
          selectedCategory={selectedCategory}
          filteredPhotos={filteredPhotos}
          setSelectedImage={setSelectedImage}
        />

        <Canvas selectedImage={selectedImage} />
      </div>
    </div>
  );
};

export default Gallery;
