import  React, { useEffect, useState } from "react";
import "./index.css";

export default function AlbumPhotos() {
  const [albums, setAlbums] = useState([]);
  const [albumPhotos, setAlbumPhotos] = useState({});
  const [activeAlbum, setActiveAlbum] = useState(0);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async (_) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      const photos = await response.json();
      const Albums = [];

      const sortedAlbum = photos.reduce((sortedAlbum, element) => {
        if (Albums.indexOf(element.albumId) === -1)
          Albums.push(element.albumId);

        if (sortedAlbum[element.albumId]) {
          sortedAlbum[element.albumId].push(element);
        } else {
          sortedAlbum[element.albumId] = [element];
        }
        return sortedAlbum;
      }, {});

      setAlbumPhotos(sortedAlbum);
      setAlbums(Albums);
    } catch (e) { console.log(e)}
  };

  return (
    <div className="App">
      {albums.map((album) => {
        return (
          <div
            style={{ padding: "10px", cursor: "pointer" }}
            key={album}
            onClick={(_) => setActiveAlbum(album)}
          >
            {album}
            {activeAlbum === album && (
              <div>
                {albumPhotos[activeAlbum].map((photo) => {
                  return (
                    <div style={{ padding: "10px" }} key={photo.id}>
                      <div onClick={(_) => setActiveLink(photo.thumbnailUrl)}>
                        {activeAlbum} - {photo.thumbnailUrl}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      {activeLink && (
        <div className="Model" >
          <button onClick={_=>setActiveLink(null)}>Close</button>
          <img src={activeLink} alt={"photo"} />
        </div>
      )}
    </div>
  );
}
