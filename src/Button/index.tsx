import * as React from "react";

const s = require("./Button.scss");

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
}

export default class Button extends React.Component<Props, {}> {
    render() {
        let props = Object.assign({}, this.props);
        delete (props as any).children;
        delete (props as any).className;

        return (
            <button {...props} className={s.button + " " + this.props.className}>
                {this.props.children}
            </button>
        );
    }
}
