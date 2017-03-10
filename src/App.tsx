import * as React from "react";
import Button from "./Button";
import Dialog from "./Dialog";
import Table from "./Table";
import Search from "./Search";

enum Status {
    Closed,
    Prompt,
    Confirm,
    Alert,
}

export interface Task {
    text: string;
    dueTo?: Date;
    done: boolean;
    createdAt: Date;
}

interface State {
    tasks: Task[];
    dialogText: string;
    searchText: string;
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
        searchText: null,
        dialogValue: null,
        dialogCallback: null,
        isDialogOpen: Status.Closed,
    };

    textDialog(dialogText: string, dialogCallback: (v: string) => any ) {
        this.setState({
            dialogText,
            dialogCallback,
            dialogValue: "",
            isDialogOpen: Status.Prompt
        } as any );
    }

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
                done: false,
                createdAt: new Date()
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
                        createdAt: task.createdAt,
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
                createdAt: task.createdAt,
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

    onSearch(inputText: string) {
        this.setState({
            searchText: inputText
        })
    }

    render() {
        return (
            <div>
                <h2>{this.props.username}'s A E S T H E T I C S todolist</h2>

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

                <Search onChange={this.onSearch.bind(this)}/>

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

                <Table
                    columns={[
                        {
                            label: "Concluída"
                        },
                        {
                            label: "Tarefa"
                        },
                        {
                            label: "Criada em"
                        },
                        {
                            label: "Prazo"
                        },
                        {
                            label: "Ações"
                        },
                    ]}

                    rows={
                        this.state.tasks.filter(task => {
                            const searchText = this.state.searchText;
                            if (searchText === "" || searchText === null) return true;
                            return task.text.indexOf(searchText) !== -1;
                        }).map((task, i) => (
                            [
                                {
                                    label: <input
                                        type="checkbox"
                                        checked={task.done}
                                        onChange={this.toggleTask.bind(this, i)}
                                    />
                                },
                                {
                                    label: task.text
                                },
                                {
                                    label: task.createdAt.toString()
                                },
                                {
                                    label: (task.dueTo ? task.dueTo.toString() : "")
                                },
                                {
                                    label: (
                                        <Button
                                            onClick={() => this.confirm("Do you really want to delete this task?", this.deleteTask.bind(this, i))}
                                        >
                                            Delete task
                                        </Button>
                                    )
                                }
                            ]
                        ))
                    }
                />
            </div>
        );
    }
}