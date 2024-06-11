import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import React, { useState } from "react";
import DraggableItem from "./DraggableItem";
import DraggingItem from "./DraggingItem";

const dragList = [
  {
    url: "1.jpg",
    title: "Scotland Island",
    text: "Sydney, Australia",
  },
  {
    url: "2.jpg",
    title: "The Charles Grand Brasserie & Bar",
    text: "Lorem ipsum, Dolor",
  },
  {
    url: "3.png",
    title: "Bridge Climb",
    text: "Dolor, Sit amet",
  },
  {
    url: "4.jpg",
    title: "Scotland Island",
    text: "Sydney, Australia",
  },
  {
    url: "5.png",
    title: "Clam Bar",
    text: "Etcetera veni, Vidi vici",
  },
  {
    url: "6.png",
    title: "Vivid Festival",
    text: "Sydney, Australia",
  },
];
// Dummy data for the list
const getListStyle = (isDraggingOver) => ({
  background: "white",
  padding: "20px 0px 20px 0px",
  width: 568,
  height: 946,
});

const getItemStyle = (isDragging, draggableStyle) =>
  isDragging
    ? {
        ...draggableStyle,
        width: 288,
        height: 64,
        padding: 16,
        border: "1px solid #0000001A",
        background: "white",
        borderRadius: 8,
      }
    : {
        userSelect: "none",
        border: "1px 0px 1px 0px",
        borderColor: "white",
        padding: `20px 40px 20px 40px`,
        background: "white",
      };

const initialItems = Array.from({ length: 6 }, (v, k) => ({
  id: `item-${k}`,
  content: <DraggableItem {...dragList[k]} />,
}));

function DraggableList() {
  const [items, setItems] = useState(initialItems);
  const [draggingPosition, setDraggingPosition] = useState(null);
  const [draggingItem, setDraggingItem] = React.useState(null);

  const onDragEnd = (result) => {
    setDraggingPosition(null);
    setDraggingItem(null);

    if (!result.destination) return;

    const newItems = Array.from(items);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
  };

  const onDragStart = (start) => {
    const item = items[start.source.index];
    setDraggingItem(item);
  };

  const onDragUpdate = (update) => {
    if (update.destination) {
      setDraggingPosition(update.destination.index);
    }
  };
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragUpdate={onDragUpdate}
      onDragStart={onDragStart}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div>
                    <div
                      style={{
                        height: 3,
                        backgroundColor:
                          index === draggingPosition ? "#1E9BF0" : "white",
                      }}
                    />
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {snapshot.isDragging ? (
                        <DraggingItem {...item.content.props} />
                      ) : (
                        item.content
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DraggableList;
