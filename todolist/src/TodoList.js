import React, {Component} from "react";
import TodoItems from "./TodoItems";

var xhr;

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        this.addItemFromServer = this.addItemFromServer.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItems = this.deleteItems.bind(this);
    }

    componentDidMount() {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/check/ip", true);
        xhr.send();
        xhr.addEventListener("readystatechange", this.addItemFromServer, false);
    }

    addItemFromServer() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            var dataArray = Object.entries(response).map(([key, value]) => ({key, value}));

            this.setState({
                items: dataArray
            });
        }
    }

    deleteItems(key) {
        var filteredItems = this.state.items.filter(function(item) {
            return (item.key !== key);
        });

        this.setState({
            items: filteredItems
        });
    }

    addItem(e) {
        var itemArray = this.state.items;

        if(this._inputElement.value !== "") {
            itemArray.push({
                value: this._inputElement.value,
                key: Date.now()
            });

            this.setState({
                items : itemArray
            });
            this._inputElement.value = "";
        }
        console.log(itemArray);
        e.preventDefault();
    }


    render() {
        return (
          <div className="todoListMain">
              <div className="header">
                  <form onSubmit={this.addItem}>
                      <input ref={(a) => this._inputElement = a} placeholder="enter task"/>
                      <button type="submit">add</button>
                  </form>
              </div>
              <TodoItems entries={this.state.items} delete={this.deleteItems}/>
          </div>
        );
    }
}

export default TodoList;