import React from "react"

class TodoItem extends React.Component {
    render() {
        const completedStyle = {
            fontStyle: "italic",
            color: "#cdcdcd",
            textDecoration: "line-through"
        }
    
        return (
            <div className="todo-item">
                <p style={this.props.item.completed ? completedStyle: null}>
                <input 
                    type="checkbox" 
                    checked={this.props.item.completed} 
                    onChange={() => this.props.handleChange(this.props.item.id)}
                   
                />
               {this.props.item.text}</p>
            </div>
        )
    }
}

export default TodoItem