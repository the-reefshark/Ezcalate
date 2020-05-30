CREATE TABLE todoata (
    id INT,
    task_name VARCHAR,
    completed BOOLEAN,
    activity_type VARCHAR CHECK (activity_type IN ('Work', 'School', 'Health', 'Personal', 'Others' )),
    username VARCHAR
    
    )
