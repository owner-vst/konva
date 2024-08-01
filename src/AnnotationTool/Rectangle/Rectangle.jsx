import  { useEffect, useRef } from "react";
import { Rect } from "react-konva";

const Rectangle = ({ x, y, width, height, name, stroke, onTransform }) => {
  const rectRef = useRef(null);

  useEffect(() => {
    if (rectRef.current) {
      rectRef.current.getLayer().batchDraw();
    }
  });

  const handleChange = (event) => {
    const shape = event.target;
    onTransform({
      x: shape.x(),
      y: shape.y(),
      width: shape.width() * shape.scaleX(),
      height: shape.height() * shape.scaleY(),
      rotation: shape.rotation(),
    });
  };

  const handleMouseEnter = (event) => {
    const shape = event.target;
    shape.stroke("#3DF6FF");
    shape.getStage().container().style.cursor = "move";
    rectRef.current.getLayer().draw();
  };

  const handleMouseLeave = (event) => {
    const shape = event.target;
    shape.stroke("#00A3AA");
    shape.getStage().container().style.cursor = "crosshair";
    rectRef.current.getLayer().draw();
  };

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      scaleX={1}
      scaleY={1}
      stroke={stroke}
      strokeWidth={5}
      name={name}
      onDragEnd={handleChange}
      onTransformEnd={handleChange}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      draggable
      ref={rectRef}
    />
  );
};

export default Rectangle;
