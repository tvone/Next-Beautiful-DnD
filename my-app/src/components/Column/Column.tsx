import React, { FC, memo } from "react";
import Task from "../Task/Task";
import { Draggable, Droppable } from "@hello-pangea/dnd";
interface task {
  id: string;
  content: string;
}

interface props {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: task[];
  // isDropDisable: boolean;
  index: number;
}

const Column: FC<props> = ({
  column,
  tasks,
  // isDropDisable,
  index
}) => {
  // console.log("re-render column " + column.id);
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`min-w-[350px] mr-2 cursor-move p-2$ ${
            snapshot.isDragging ? "bg-green-400" : ""
          } `}
        >
          <div
            {...provided.dragHandleProps}
            className="w-full bg-yellow-500 text-center p-2"
          >
            {column.title}
          </div>

          <Droppable droppableId={column.id} isDropDisabled={false} type="task">
            {(provided, snapshot) => (
              <div
                className={`flex flex-col flex-grow-1 min-h-[300px]${
                  snapshot.isDraggingOver ? "bg-blue-700" : ""
                } `}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task: task, index: number) => {
                  return (
                    <Task
                      key={task.id}
                      id={task.id}
                      content={task.content}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

// export default React.memo(Column, (prevProps, nextProps) => {
//   // console.log(
//   //   prevProps.column,
//   //   nextProps.column,
//   //   prevProps.columnOrder,
//   //   nextProps.columnOrder,
//   //   prevProps.index,
//   //   nextProps.index
//   // );
//   if (
//     prevProps.column === nextProps.column &&
//     prevProps.columnOrder === nextProps.columnOrder &&
//     prevProps.index === nextProps.index
//   ) {
//     return false;
//   } else {
//     return true;
//   }
//   // Hàm so sánh tùy chỉnh, trả về true nếu muốn re-render hoặc false nếu không
//   // So sánh các dependencies như prevProps.someProp và nextProps.someProp
//   // và trả về true nếu giá trị someProp thay đổi và muốn re-render, ngược lại trả về false
// });
export default memo(Column);
