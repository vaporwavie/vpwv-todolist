import * as React from "react";

export interface Task {
    text: string;
    done: boolean;
}

interface State {
    tasks: Task[];
}

interface Props {
    username: string;
}

export default class App extends React.Component<Props, State> {
    state: State = { tasks: [] };

    onCreateTask(text: string) {
        this.setState({
            tasks: (this.state.tasks || []).concat({
                text,
                done: false
            })
        });
    }

    toggleTask(index: number) {
        this.setState({
            tasks: this.state.tasks.map((task, i) => {
                if (i === index) {
                    return {
                        text: task.text,
                        done: !task.done,
                    };
                }

                return task;
            })
        });
    }

    checkAllTasks(done: boolean) {
        this.setState({
            tasks: this.state.tasks.map((task) => ({
                done: done,
                text: task.text,
            }))
        });
    }

    deleteTask(index: number) {
        let tasks = [...this.state.tasks];

        tasks.splice(index, 1);
        this.setState({ tasks });
    }

    deleteAllTasks() {
        this.setState({ tasks: [] });
    }

    render() {
        return (
            <div>
                <h2>{this.props.username}'s A E S T H E T I C S todolist</h2>
                <h4>And you must respect it.</h4>

                <p>Here is what you  can do</p>
                <button onClick={() => this.onCreateTask(prompt("Digite a tarefa a ser feita"))}>
                    Create task
                </button>

                <button onClick={this.deleteAllTasks.bind(this)}>
                    Delete all tasks
                </button>

                <button onClick={this.checkAllTasks.bind(this, true)}>
                    Check all tasks
                </button>

                <button onClick={this.checkAllTasks.bind(this, false)}>
                    Uncheck allTasks
                </button>

                <ul>
                    { this.state.tasks.map((task, i) => (
                        <li key={i}>
                            <input
                                type="checkbox"
                                checked={task.done}
                                onChange={this.toggleTask.bind(this, i)}
                            />
                            
                            &nbsp;{task.text}

                            &nbsp;
                            
                            <button onClick={this.deleteTask.bind(this, i)}>
                                Delete task
                            </button>
                        </li>
                        
                    )) }
                </ul>
            </div>
        );
    }
}