
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import DraggableItem from './DraggableItem';
import _ from 'lodash';

const itemTarget = {
  drop() {},
};

const dropTargetCollect = (connect) => ({
  connectDropTarget: connect.dropTarget()
});


class OrderableList extends Component {

  constructor(props) {
    super(props);
    this.moveItem = this.moveItem.bind(this);
    this.findItem = this.findItem.bind(this);
    this.state = { items: this.props.items };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ items: nextProps.items });
  }

  moveItem(id, atIndex) {
    const { item, index } = this.findItem(id);
    this.setState(update(this.state, {
      items: {
        $splice: [
          [index, 1],
          [atIndex, 0, item],
        ],
      },
    }));
  }

  findItem(id) {
    const { items } = this.state;
    const item = _.find(items, c => c.id === id) || {};

    return {
      item,
      index: items.indexOf(item),
    };
  }

  render() {
    const { connectDropTarget, dropHandler } = this.props;
    const { items } = this.state;

    return connectDropTarget(
      <this.props.containingTag>
        {items.map(item => (
          <DraggableItem
            key={item.id}
            id={item.id}
            element={item.element}
            moveItem={this.moveItem}
            findItem={this.findItem}
            itemMoved={dropHandler || _.noop}
          />
        ))}
      </this.props.containingTag>,
    );
  }
}

OrderableList.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      element: PropTypes.shape({
        children: PropTypes.arrayOf(React.PropTypes.element),
        parentWrapperTag: PropTypes.string.isRequired,
        handleElementIndex: PropTypes.number
      }).isRequired,
    })
  ).isRequired,
  dropHandler: PropTypes.func,
  containingTag: PropTypes.string.isRequired
};

export default DropTarget('Item', itemTarget, dropTargetCollect)(OrderableList);