import { useEffect, useRef } from "react";
import { Transformer } from "react-konva";

const RectTransformer = ({ selectedShapeName }) => {
  const transformerRef = useRef(null);

  const checkNode = () => {
    const stage = transformerRef.current.getStage();
    const selectedNode = stage.findOne(`.${selectedShapeName}`);
    if (selectedNode === transformerRef.current.node()) {
      return;
    }

    if (selectedNode) {
      transformerRef.current.attachTo(selectedNode);
    } else {
      transformerRef.current.detach();
    }
  };

  useEffect(() => {
    checkNode();
  });

  return <Transformer ref={transformerRef} rotateEnabled={false} />;
};

export default RectTransformer;
