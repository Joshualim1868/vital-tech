import React from "react";

function DraggableItem(props) {
  return (
    <div className="flex">
      <div>
        <img src={props.url} alt="Image" className="w-24 h-24 rounded-drag-image" />
      </div>
      <div className="draggable-item-text">
        <p className="draggable-item-content-title">
          {props.title}
        </p>
        <div className="flex pt-1">
          <div className="pt-1">
            <img src="icon.png" alt="Dark Icon" className="w-4 h-4" />
          </div>
          <p className="draggable-item-content-text">{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default DraggableItem;
