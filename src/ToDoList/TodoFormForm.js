import React from 'react';
import { useForm } from 'react-hook-form'


function TodoFormForm(props) {
  const { register, handleSubmit } = useForm();
  
  const toSubmit = (data, event) => 
  {
    event.preventDefault();
    console.log(data)
    props.onSubmit(data);
    props.onClick();

  }

  
  return (
    <form onSubmit={handleSubmit(toSubmit)} >
      <div>
        <div className="form-group row"> 
          <label className="col-sm-2 col-form-label">Task Name</label>
            <div className="col-sm-7">
              <input type="text" name="TaskName" className="form-control" placeholder="Enter Task here!" ref={register}/>
            </div>
        </div>

    <div className="form-group row" >
        <label className="col-sm-2 col-form-label">Details</label>
          <div className="col-sm-7">
          <input type="text" name= "Details" className="form-control" placeholder="Enter details here!" ref={register}/>
          </div>
    </div>

    <div className="form-group row">
        <label className="col-sm-2 col-form-label">Type of Activity</label>
          <div className="col-sm-7">
            <select name="activity_type" defaultValue="Choose-origin" className="form-control" ref={register}>
            <option value="Choose-origin" disabled>Select an activity </option>
            <option value="Work">Work</option>
            <option value="School"> School</option>
            <option value="Health"> Health</option>
            <option value="Personal"> Personal</option>
            <option value="Others"> Others</option>
        </select>
          </div>
        </div>

      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Due Date</label>
          <div className="col-sm-7">
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