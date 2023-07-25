"use client";
import Column from "@/components/Column/Column";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  Droppable
} from "@hello-pangea/dnd";
import { IOnDragEnd } from "@/utils/interface/dnd";
import { useMemo } from "react";
import { ResponderProvided } from "react-beautiful-dnd";

interface init {
  tasks: {};
  columns: {};
  columnOrder: string[];
}
const initialState: init = {
  tasks: {
    "task-1": { id: "task-1", content: "This is task 1" },
    "task-2": { id: "task-2", content: "This is task 2" },
    "task-3": { id: "task-3", content: "This is task 3" },
    "task-4": { id: "task-4", content: "This is task 4" },
    "task-5": { id: "task-5", content: "This is task 5" },
    "task-6": { id: "task-6", content: "This is task 6" },
    "task-7": { id: "task-7", content: "This is task 7" },
    "task-8": { id: "task-8", content: "This is task 8" },
    "task-9": { id: "task-9", content: "This is task 9" },
    "task-10": { id: "task-10", content: "This is task 10" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Todo",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"]
    },
    "column-2": {
      id: "column-2",
      title: "Todo_2",
      taskIds: ["task-6", "task-7", "task-8", "task-9", "task-10"]
    },
    "column-3": {
      id: "column-3",
      title: "Test",
      taskIds: []
    }
  },
  columnOrder: ["column-1", "column-2", "column-3"]
};

export default function Home() {
  const [data, setData] = useState<any>(initialState);
  const [homeIndex, setHomeIndex] = useState<number>(0);
  const [animation, setAnimation] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const renderData = useMemo(() => {
    return data.columnOrder.map((col: string, index: number) => {
      const column = data.columns[col];
      const tasks = column.taskIds.map((taskId: string) => data.tasks[taskId]);

      // const isDropDisable = index < homeIndex;

      // console.log(data.columnOrder);
      return (
        <Column key={column.id} column={column} tasks={tasks} index={index} />
      );
    });
  }, [data]);

  // useCallback(
  //   (col: string, index: number) => {
  //     const column = data.columns[col];
  //     const tasks = column.taskIds.map((taskId: string) => data.tasks[taskId]);
  //     console.log(column);
  //     const isDropDisable = index < homeIndex;
  //     console.log("test");
  //     // console.log(index, homeIndex, isDropDisable);
  //     // console.log(isDropDisable);
  //     return (
  //       <Column
  //         key={column.id}
  //         column={column}
  //         tasks={tasks}
  //         // columnOrder={data.columOrder}
  //         index={index}
  //         // isDropDisable={isDropDisable}
  //       />
  //     );
  //   },
  //   [homeIndex]
  // );
  const onDragStart = (start: DragStart, provided: ResponderProvided) => {
    if (start.type === "task") {
      const indexhome = data.columnOrder.indexOf(start.source.droppableId);
      // console.log(start.source.droppableId);
      // console.log(indexhome);
      setHomeIndex(indexhome);
    }
    // provided.announce("Hello");
    // use extension Screen Reader for use provided.announce("My super cool message");
    // console.log("check_drag_start");
  };
  const onDragUpdate = (update: DragUpdate, provided: ResponderProvided) => {};
  // console.log("re-render");
  const onDragEnd = (result: IOnDragEnd) => {
    const { draggableId, source, destination, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "column") {
      let newColumns = Array.from(data.columnOrder);
      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, draggableId);
      let newState = {
        ...data,
        columnOrder: newColumns
      };
      setData(newState);
    } else if (type === "task") {
      // Method 1 : use Array.from()
      if (source.droppableId === destination.droppableId) {
        const column = data.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
        const newColumn = {
          ...column,
          taskIds: newTaskIds
        };
        const newState = {
          ...data,
          columns: {
            ...data.columns,
            [newColumn.id]: newColumn
          }
        };
        // console.log(newState);
        setData(newState);
      } else {
        const column = data.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        // Destination
        const columnDestination = data.columns[destination.droppableId];
        const newTaskIds_2 = Array.from(columnDestination.taskIds);
        newTaskIds_2.splice(destination.index, 0, draggableId);
        let newColumn_1 = {
          ...column,
          taskIds: newTaskIds
        };
        let newColumn_2 = {
          ...columnDestination,
          taskIds: newTaskIds_2
        };
        // console.log(newColumn_1, newColumn_2);
        setData({
          ...data,
          columns: {
            ...data.columns,
            [newColumn_1.id]: newColumn_1,
            [newColumn_2.id]: newColumn_2
          }
        });
        // console.log(data);
      }
    }

    // // Method 2 : use filter
    // if (source.droppableId === destination.droppableId) {
    //   let column = data.columns[source.droppableId];
    //   let tasks = column.taskIds.filter(
    //     (taskId: string) => taskId !== draggableId
    //   );
    //   tasks.splice(destination.index, 0, draggableId);
    //   if (tasks.length !== 0) {
    //     column.taskIds = tasks;

    //     let newState = {
    //       ...data,
    //       columns: {
    //         ...data.columns,
    //         [data.columns[source.droppableId].id]: column,
    //       },
    //     };
    //     setData(newState);
    //   }
    // } else {
    //   // Source
    //   const columnSource = data.columns[source.droppableId];
    //   const tasksSource = columnSource.taskIds.filter(
    //     (taskId: string) => taskId !== draggableId
    //   );
    //   // Destination
    //   const columnDestination = data.columns[destination.droppableId];
    //   columnDestination.taskIds.splice(destination.index, 0, draggableId);

    //   columnSource.taskIds = tasksSource;
    //   columnDestination.taskIds = columnDestination.taskIds;
    //   console.log(tasksSource, columnDestination.taskIds);
    //   setData({
    //     ...data,
    //     [data.columns[source.droppableId].id]: columnSource,
    //     [data.columns[destination.droppableId].id]: columnDestination,
    //   });
    // }
  };

  return (
    <div>
      {domLoaded && (
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragUpdate={onDragUpdate}
          onDragStart={onDragStart}
        >
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={"flex shrink-0 overflow-auto bg-gray-700 min-h-[300px] p-10"}
              >
                {renderData}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
