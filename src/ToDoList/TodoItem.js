import React from "react"

class TodoItem extends React.Component {
    
    render() {
        // Completed Paragraph styling
        const completedStyle = {
            fontStyle: "italic",
            color: "#cdcdcd",
            textDecoration: "line-through"
        }
        
        // Completed Button styling
        const completedStyle2 = {
            margin: "5px",
            width: "100%",
            display: "block"
        }

        /*
            - Checkbox is always displayed in the appropriate state
            - Style of task_name is set based on the completed state
            - Delete Button
            - Button to open the details panel
        */
        return (
            <div  className="todo-item">
                <input 
                    type="checkbox"
                    id={this.props.item.id}
                    checked={this.props.item.completed}
                    onChange={this.props.handleCheck}
                />
                <p style={this.props.item.completed ? completedStyle : null}>{this.props.item.task_name}</p>
                <button onClick={() => this.props.handleClick(this.props.item.id)}> X </button>
                <button style ={completedStyle2} onClick={() => this.props.onDetails(this.props.item.id)}> Click to see Details! </button>
            </div>
        )
    }
}

export default TodoItem