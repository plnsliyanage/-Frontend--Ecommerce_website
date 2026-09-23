import { useState } from "react";

export default function ImageSlider(props) {
  const images = props.images;
  const [activeImage, setActiveImage] = useState(0);
  if (!images.length) {
    return (
      <div className="w-[400px] h-[400px] grid place-items-center rounded-xl bg-white text-secondary/70">
        No image available
      </div>
    );
  }

  return (
    <div className="w-[400px]  ">
      <img
        className="w-full h-[400px] object-cover"
        src={images[activeImage]}
        alt="Selected product preview"
      />
      <div className="w-full h-[100px] flex justify-center items-center gap-2">
        {images.map((img, index) => {
          return (
            <img
              onClick={() => {
                setActiveImage(index);
              }}
              key={index}
              className={
                "w-[90px] h-[90px] object-cover " +
                (activeImage == index && "border-4 border-accent")
              }
              src={img}
              alt={`Product thumbnail ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
