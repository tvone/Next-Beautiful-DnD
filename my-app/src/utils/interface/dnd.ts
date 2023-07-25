export interface IOnDragStart {
  draggableId: string;
  mode: string;
  source: {
    droppableId: string;
    index: number;
  };
  type: string;
}

export interface IOnDragUpdate {
  draggableId: string;
  mode: string;
  source: {
    droppableId: string;
    index: number;
  };
  destination: {
    droppableId: string;
    index: number;
  } | null;
  type: string;
}

export interface IOnDragEnd {
  combine: any | null;
  destination: {
    droppableId: string;
    index: number;
  } | null;
  draggableId: string;
  mode: string;
  reason: string;
  source: {
    droppableId: string;
    index: number;
  };
  type: string;
}
