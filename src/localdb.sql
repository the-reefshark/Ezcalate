CREATE TABLE tododata (
    id SERIAL PRIMARY KEY,
    task_name VARCHAR,
    details VARCHAR,
    completed BOOLEAN,
    activity_type VARCHAR, 
    duedate VARCHAR,
    dateCompleted VARCHAR,
    timer INTEGER
)