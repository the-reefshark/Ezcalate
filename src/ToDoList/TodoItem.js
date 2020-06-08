import React from "react"

class TodoItem extends React.Component {
    
    render() {
        const completedStyle = {
            fontStyle: "italic",
            color: "#cdcdcd",
            textDecoration: "line-through"
        }

        const completedStyle2 = {
            margin: "5px",
            width: "100%",
            display: "block"
        }

        return (
            <div  className="todo-item">
                <input 
                    type="checkbox" 
                    checked={this.props.item.completed} 
                    onChange={() => this.props.handleCheck(this.props.item.id)}
                />
                
                <p style={this.props.item.completed ? completedStyle: null}>{this.props.item.task_name}</p>
                
                <button onClick={() => this.props.handleClick(this.props.item.id)}> X </button>
                <button style ={completedStyle2} onClick={() => this.props.onDetails(this.props.item.id)}> Click to see Details! </button>
                
            </div>
        )
    }
}

export default TodoItem