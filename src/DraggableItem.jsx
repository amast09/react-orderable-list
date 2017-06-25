
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import { DragSource, DropTarget } from 'react-dnd';

const itemSource = {

  beginDrag (props) {
    return {
      id: props.id,
      originalIndex: props.findItem(props.id).index,
    };
  },

  endDrag (props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();

    if (!monitor.didDrop()) {
      props.moveItem(droppedId, originalIndex);
    } else {
      props.itemMoved({ id: droppedId, droppedIndex: props.findItem(droppedId).index });
    }
  }

};

const dropTargetCollect = (connect) => ({
  connectDropTarget: connect.dropTarget()
});

const itemTarget = {

  canDrop () {
    return false;
  },

  hover (props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findItem(overId);
      props.moveItem(draggedId, overIndex);
    }
  },

};

const dragSourceCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

class DraggableItem extends Component {

  render() {
    const { element, isDragging, connectDragSource, connectDropTarget, connectDragPreview, id } = this.props;
    const opacity = isDragging ? 0 : 1;
    let item;

    if (element.handleElementIndex !== undefined) {
      element.children[element.handleElementIndex] = connectDragSource(element.children[element.handleElementIndex]);
      item = connectDragPreview(connectDropTarget(<element.parentWrapperTag style={{ opacity }} key={id}>{element.children}</element.parentWrapperTag>));
    } else {
      item = connectDragSource(connectDropTarget(<element.parentWrapperTag style={{ opacity }} key={id}>{element.children}</element.parentWrapperTag>));
    }

    return item;
  }

}

DraggableItem.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  element: PropTypes.shape({
    children: PropTypes.arrayOf(React.PropTypes.element),
    parentWrapperTag: PropTypes.string.isRequired,
    handleElementIndex: PropTypes.number
  }).isRequired,
  moveItem: PropTypes.func.isRequired,
  findItem: PropTypes.func.isRequired,
  itemMoved: PropTypes.func.isRequired
};

export default _.flow(
  DragSource('Item', itemSource, dragSourceCollect),
  DropTarget('Item', itemTarget, dropTargetCollect)
)(DraggableItem);
