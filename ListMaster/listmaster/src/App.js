import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    items: [],
    newItem: '',
    newPriority: '1'
  };

  handleChange = (value) => {
    this.setState({ newItem: value });
  };

  handleNewPriorityChange = (value) => {
    this.setState({ newPriority: value });
  };

  handleAdd = () => {
    const newItem = {
      id: Date.now(),
      text: this.state.newItem,
      priority: this.state.newPriority
    };

    const items = [...this.state.items, newItem];

    // Sort items based on priority
    items.sort((a, b) => a.priority - b.priority);

    this.setState({
      items: items,
      newItem: '',
      newPriority: '1'
    });
  };

  handleDelete = (id) => {
    const items = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: items });
  };

  handlePriorityChange = (id, value) => {
    const item = this.state.items.map((item) => {
      if (item.id === id) {
        return { ...item, priority: value };
      } else {
        return item;
      }
    });

    // Sort items based on priority
    item.sort((a, b) => a.priority - b.priority);

    this.setState({ items: item });
  };

  handleMoveToTop = (id) => {
    const items = [...this.state.items];
    const itemIndex = items.findIndex((item) => item.id === id);
  
    // Move item to top of list and set priority to 1
    items.splice(0, 0, { ...items.splice(itemIndex, 1)[0], priority: "1" });
  
    this.setState({ items: items });
  };

  render() {
      const items = this.state.items.map((item, index) => {
      return (
        <li key={item.id}>
          <span>{index + 1}. {item.text}</span>
          <span>
            <select value={item.priority} onChange={(e) => this.handlePriorityChange(item.id, e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <button onClick={() => this.handleMoveToTop(item.id)}>Move to top</button>
            <button onClick={() => this.handleDelete(item.id)}>Delete</button>
          </span>
        </li>
      );
    });

    return (
      <div className="App">
        <h1>List Master</h1>
        <div>
          <label htmlFor="newItem">New item:</label>
          <input type="text" id="newItem" value={this.state.newItem} onChange={(e) => this.handleChange(e.target.value)} />
          <select value={this.state.newPriority} onChange={(e) => this.handleNewPriorityChange(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.handleAdd}>Add</button>
        </div>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}

export default App;
