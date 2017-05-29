import * as React from "react";

const s = require("./Dialog.scss");

interface Props {
    onCloseDialog: () => any;
}

export default class Dialog extends React.Component<Props, {}> {
    render() {
        let props = Object.assign({}, this.props);

        return (
            <div className={s.dialogWrapper} onClick={this.props.onCloseDialog}>
                <div className={s.dialog} onClick={ev => ev.stopPropagation()}>
                    <div className={s.closeButton} onClick={this.props.onCloseDialog}>
                        &times;
                    </div>    
                    { this.props.children }
                </div>
            </div>
        );
    }
}