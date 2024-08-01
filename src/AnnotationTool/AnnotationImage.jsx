import { useState, useEffect } from "react";
import { Image } from "react-konva";

const AnnotationImage = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src =
      "https://thumbs.dreamstime.com/b/car-parking-place-view-above-21981905.jpg";
    img.onload = () => {
      setImage(img);
    };
  }, []);

  return <Image height={640} width={994} image={image} />;
};

export default AnnotationImage;
