import { useState, useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import shortid from "shortid";

import Rectangle from "./AnnotationTool/Rectangle/Rectangle";
import RectTransformer from "./AnnotationTool/Rectangle/RectTranformer";
import AnnotationImage from "./AnnotationTool/AnnotationImage";
import "./App.css";
import OptionsDialog from "./AnnotationTool/OptionsDialog";

const App = () => {
  const [rectangles, setRectangles] = useState([]);
  const [rectCount, setRectCount] = useState(0);
  const [selectedShapeName, setSelectedShapeName] = useState("");
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDraw, setMouseDraw] = useState(false);
  const [newRectX, setNewRectX] = useState(0);
  const [newRectY, setNewRectY] = useState(0);

  const stageRef = useRef(null);
  const imgLayerRef = useRef(null);

  useEffect(() => {
    imgLayerRef.current.moveToBottom();
  }, []);

  const handleStageMouseDown = (event) => {
    if (event.target.className === "Image") {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      setMouseDown(true);
      setNewRectX(mousePos.x);
      setNewRectY(mousePos.y);
      setSelectedShapeName("");
      return;
    }

    const clickedOnTransformer =
      event.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = event.target.name();
    const rect = rectangles.find((r) => r.name === name);
    if (rect) {
      setSelectedShapeName(name);
    } else {
      setSelectedShapeName("");
    }
  };

  const handleRectChange = (index, newProps) => {
    const updatedRectangles = rectangles.slice();
    updatedRectangles[index] = {
      ...updatedRectangles[index],
      ...newProps,
    };
    setRectangles(updatedRectangles);
  };

  const handleNewRectChange = (event) => {
    const stage = event.target.getStage();
    const mousePos = stage.getPointerPosition();
    if (!rectangles[rectCount]) {
      const newRectangles = [
        ...rectangles,
        {
          x: newRectX,
          y: newRectY,
          width: mousePos.x - newRectX,
          height: mousePos.y - newRectY,
          name: `rect${rectCount + 1}`,
          stroke: "#00A3AA",
          key: shortid.generate(),
        },
      ];
      setRectangles(newRectangles);
      setMouseDraw(true);
      return;
    }

    const updatedRectangles = rectangles.slice();
    updatedRectangles[rectCount].width = mousePos.x - newRectX;
    updatedRectangles[rectCount].height = mousePos.y - newRectY;
    setRectangles(updatedRectangles);
  };

  const handleStageMouseUp = () => {
    if (mouseDraw) {
      setRectCount(rectCount + 1);
      setMouseDraw(false);
    }
    setMouseDown(false);
  };

  return (
    <div id="app">
      <Stage
        ref={stageRef}
        container="app"
        width={994}
        height={640}
        onMouseDown={handleStageMouseDown}
        onTouchStart={handleStageMouseDown}
        onMouseMove={mouseDown && handleNewRectChange}
        onTouchMove={mouseDown && handleNewRectChange}
        onMouseUp={mouseDown && handleStageMouseUp}
        onTouchEnd={mouseDown && handleStageMouseUp}
      >
        <Layer>
          {rectangles.map((rect, i) => (
            <Rectangle
              sclassName="rect"
              key={rect.key}
              {...rect}
              onTransform={(newProps) => {
                handleRectChange(i, newProps);
              }}
            />
          ))}
          <RectTransformer selectedShapeName={selectedShapeName} />
        </Layer>
        <Layer ref={imgLayerRef}>
          <AnnotationImage />
        </Layer>
      </Stage>
      <OptionsDialog shapes={rectangles}/>
    </div>
  );
};

export default App;
