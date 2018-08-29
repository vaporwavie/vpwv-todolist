import * as React from "react";

const s = require("./Search.scss");

interface Props {
    onChange: (inputText: string) => any;
}

export default class Search extends React.Component<Props, {}> {
    onChange(e: any) {
        this.props.onChange(e.target.value);
    }
    render() {
        let props = Object.assign({}, this.props);

        return (
            <div>
                <label>Search a task: </label>
                <input onChange={this.onChange.bind(this)} />
            </div>
        );
    }
}