import React, { FC } from "react";
import { Draggable } from "@hello-pangea/dnd";
interface props {
  id: string;
  content: string;
  index: number;
}

const Task: FC<props> = ({ id, content, index }) => {
  const checkDisable = id === "task-1";
  // console.log("re-render task " + id);
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={checkDisable}>
      {(provided, snapshot) => (
        <div
          aria-roledescription="Draggable item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-dragging={snapshot.isDragging}
          className={`p-2 border border-dashed border-white mb-2 ${
            snapshot.isDragging ? "bg-sky-500" : ""
          } ${checkDisable ? "bg-gray-400" : ""}
          }`}
        >
          <div>{content}</div>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(Task);
