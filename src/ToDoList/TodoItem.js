import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

//Updated to functional component

const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(1),
      backgroundColor: "transparent",
      textAlign: "left",
      display: "block",
      width: "100%",
      textTransform: "none"
    },
}));

function ToDoItem(props){

    //Completed Paragraph styling
    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }

    const classes = useStyles();
    
    return(
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Box order="1" flexGrow="1"  whiteSpace="nowrap" justifyContent="center">
                <p className="date" style={props.item.completed ? completedStyle : null}>{"  " + (props.item.duedate).slice(0,10)}</p>
            </Box>

            <Box order="2">
                <Checkbox
                    className ="checkbox"
                    type="checkbox"
                    id={props.item.id.toString()}
                    checked={props.item.completed}
                    onChange={props.handleCheck}
                />
            </Box>

            <Box order="3" flexGrow="14" >
                <Button className={classes.root} onClick={() => props.onDetails(props.item.id)}  >
                    <p style={props.item.completed ? completedStyle : null}>{props.item.task_name}</p>
                </Button>
            </Box>

            <Box order="4">
                <IconButton className = "delete" onClick={() => props.handleClick(props.item.id)}> 
                    <HighlightOffIcon />
                </IconButton>  
            </Box>     
        </Box>
)}

export default ToDoItem


// The Orgininal Class Component code

// class TodoItem extends React.Component {
    
//     render() {
//         // Completed Paragraph styling
//         const completedStyle = {
//             fontStyle: "italic",
//             color: "#cdcdcd",
//             textDecoration: "line-through"
//         }

//         const classes = useStyles();

//         /*
//             - Checkbox is always displayed in the appropriate state
//             - Style of task_name is set based on the completed state
//             - Delete Button
//             - Button to open the details panel
//         */
//         return (
//             <div className="todo-item">
//                 <p className="date"style={this.props.item.completed ? completedStyle : null}>{(this.props.item.duedate).slice(0,10)}</p>
//                 <input
//                     className ="checkbox"
//                     type="checkbox"
//                     id={this.props.item.id}
//                     checked={this.props.item.completed}
//                     onChange={this.props.handleCheck}
//                 />
//                 <Button className={classes.root} onClick={() => this.props.onDetails(this.props.item.id)}>
//                     <p style={this.props.item.completed ? completedStyle : null}>{this.props.item.task_name}</p>
//                 </Button>

//                 <IconButton className = "delete" onClick={() => this.props.handleClick(this.props.item.id)}> 
//                     <HighlightOffIcon />
//                 </IconButton>
                
                
//             </div>
//         )
//     }
// }

