import React from 'react';
import { useForm } from 'react-hook-form'
import ToDoList from './TodoList'
import ToDoFormModal from "./TodoFormModal"

function TodoFormForm(props) {
  const { register, handleSubmit, errors } = useForm();
  
  const toSubmit = (data, event) => 
  {
    event.preventDefault();
    props.onSubmit(data);
    props.onClick();

  }
  //console.log(errors);

  
  return (
    <form onSubmit={handleSubmit(toSubmit)} >
      <div>
      <div class="form-group row"> 
        <label class="col-sm-2 col-form-label">Task Name</label>
          <div class="col-sm-7">
            <input type="text" name="TaskName" class="form-control" placeholder="Enter Task here!" ref={register}/>
          </div>
    </div>

    <div class="form-group row" >
        <label class="col-sm-2 col-form-label">Details</label>
          <div class="col-sm-7">
          <input type="text" name= "Details" class="form-control" placeholder="Enter details here!" ref={register}/>
          </div>
    </div>

    <div class="form-group row">
        <label class="col-sm-2 col-form-label">Type of Activity</label>
          <div class="col-sm-7">
            <select name="activitytype" class="form-control" ref={register}>
            <option value="" disabled selected>Select an activity </option>
            <option value="Work">Work</option>
            <option value=" School"> School</option>
            <option value=" Health"> Health</option>
            <option value=" Personal"> Personal</option>
            <option value=" Others"> Others</option>
        </select>
          </div>
        </div>

      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Due Date</label>
          <div class="col-sm-7">
            <input type="datetime-local" placeholder="Due Date" name="DueDate" ref={register} />
          </div>
        </div>
      </div>

      <input type="submit" />
    

     {/* <input type="text" placeholder="Enter Task here!" name="Task Name" ref={register} />
      <br/>
      <input type="text" placeholder="Details" name="Details" ref={register} />
      <select name="Type" ref={register}>
        <option value="Work">Work</option>
        <option value=" School"> School</option>
        <option value=" Health"> Health</option>
        <option value=" Personal"> Personal</option>
        <option value=" Others"> Others</option>
      </select>
      <input type="datetime-local" placeholder="Due Date" name="Due Date" ref={register} />

      <input type="submit" /> */}
    </form>
  );
}

export default TodoFormForm