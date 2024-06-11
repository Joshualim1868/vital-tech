import React from "react";

function DraggingItem(props) {
  return (
    <div className="flex">
      <div>
        <img
          src={props.url}
          alt="Image"
          className="w-8 h-8 rounded-dragging-image"
        />
      </div>
      <div className="dragging-item-text">
        <p>{props.title}</p>
      </div>
    </div>
  );
}

export default DraggingItem;
