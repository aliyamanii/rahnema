import React, { useState, useEffect } from "react";
import "./Gallery.css";

const Gallery: React.FC = () => {
  interface Photo {
    id: number;
    category: string;
    url: string;
    photographer: string;
    alt: string;
    page_url: string;
    width: number;
    height: number;
    path: string;
  }

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

  return (
    <div className="App">
      <header className="header">
        <h1 className="logo"> Gallerie </h1>
        <form className="search-form">
          <input
            type="text"
            name="search-bar"
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
        </form>
      </header>

      <div className="app__container">
        <div className="sidebar">
          <section className="menu">
            <button
              className={`menu__button ${
                selectedCategory === "" ? "menu__button--active" : ""
              }`}
              onClick={() => setSelectedCategory("")}
            >
              <i className="fas fa-layer-group menu__icon"></i>
              <span className="menu__text">All</span>
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`menu__button ${
                  selectedCategory === category ? "menu__button--active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <i className="fas fa-layer-group menu__icon"></i>
                <span className="menu__text">{category}</span>
              </button>
            ))}
          </section>
        </div>

        <section className="panel">
          <div className="panel__top">
            <h1 className="first-heading">{selectedCategory}</h1>
          </div>
          <div className="panel__images">
            {photos
              .filter(
                (photo) =>
                  photo.category === selectedCategory ||
                  photo.id.toString().includes(searchQuery) ||
                  photo.category.includes(searchQuery) ||
                  photo.photographer.includes(searchQuery) ||
                  photo.alt.includes(searchQuery)
              )
              .map((photo: Photo) => (
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
      </div>
    </div>
  );
};

export default Gallery;
