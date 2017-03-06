import * as React from "react";
import Button from "./Button";
import Dialog from "./Dialog";

enum Status {
    Closed,
    Prompt,
    Confirm,
    Alert,
}

export interface Task {
    text: string;
    done: boolean;
}

interface State {
    tasks: Task[];
    dialogText: string;
    dialogValue: string;
    isDialogOpen: Status;
    dialogCallback: (v: string) => any;
}

interface Props {
    username: string;
}

export default class App extends React.Component<Props, State> {
    state: State = {
        tasks: [],
        dialogText: null,
        dialogValue: null,
        dialogCallback: null,
        isDialogOpen: Status.Closed,
    };

    prompt(dialogText: string, dialogCallback: (v: string) => any) {
        this.setState({
            dialogText,
            dialogCallback,
            dialogValue: "",
            isDialogOpen: Status.Prompt
        } as any);
    }

    confirm(dialogText: string, dialogCallback: () => any) {
        this.setState({
            dialogText,
            dialogCallback,
            isDialogOpen: Status.Confirm
        } as any);
    }

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

    closeDialog() {
        this.setState({
            dialogText: null,
            dialogValue: null,
            dialogCallback: null,
            isDialogOpen: Status.Closed
        } as any);
    }

    render() {
        return (
            <div>
                <h2>{this.props.username}'s A E S T H E T I C S todolist</h2>
                <h4>Totally</h4>

                {
                    this.state.isDialogOpen === Status.Prompt ?
                        <Dialog onCloseDialog={this.closeDialog.bind(this)}>
                            <p>{ this.state.dialogText }</p>
                            
                            <input
                                value={this.state.dialogValue}
                                onChange={ev => {
                                    this.setState({ dialogValue: ev.target.value } as any);
                                }}
                            />

                            <button onClick={() => {
                                this.state.dialogCallback(this.state.dialogValue);
                                this.closeDialog();
                            }}>
                                Create task
                            </button>
                        </Dialog>
                    : this.state.isDialogOpen === Status.Confirm ?
                    <Dialog onCloseDialog={this.closeDialog.bind(this)}>
                            <p>{ this.state.dialogText }</p>
                            <button onClick={() => {
                                this.state.dialogCallback(this.state.dialogValue);
                                this.closeDialog();
                            }}>
                                Yes, delete this task
                            </button>
                            <button onClick={() => {
                                this.closeDialog();
                            }}>
                                No, sorry
                            </button>
                        </Dialog>
                    : null
                }

                <p>Here is what you can do</p>
                <Button onClick={() => this.prompt("Insert a task", this.onCreateTask.bind(this))}>
                    Create a task
                </Button>

                <Button onClick={this.deleteAllTasks.bind(this)}>
                    Delete all tasks
                </Button>

                <Button onClick={this.checkAllTasks.bind(this, true)}>
                    Check all tasks
                </Button>

                <Button onClick={this.checkAllTasks.bind(this, false)}>
                    Uncheck all tasks
                </Button>

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
                            
                            <Button onClick={() => this.confirm("Do you really want to delete this task?", this.deleteTask.bind(this, i))}>
                                Delete task
                            </Button>
                        </li>
                        
                    )) }
                </ul>
            </div>
        );
    }
}