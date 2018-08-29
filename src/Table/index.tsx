import * as React from "react";

const s = require("./Table.scss");

export interface Column {
    label: string;
    sortFunction?: (a: any, b: any) => number;
}

export interface Cell {
    value?: any;
    label: React.ReactNode;
}

interface Props {
    rows: Cell[][];
    columns: Column[];
}

interface State {
    sortedColumnIndex: number;
}

export default class Table extends React.Component<Props, State> {
    state: State = {
        sortedColumnIndex: -1
    };

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        {
                            this.props.columns.map((col, i) => (
                                <th key={i}>
                                    {col.label}
                                    {
                                        // incluir 'botão' pra quando clicar, ordenar a tabela de acordo com essa coluna
                                    }
                                </th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        this.props.rows.map((row, i) => (
                            <tr key={i}>
                                {
                                    row.map((cell, j) => (
                                        <td key={j}>
                                            {cell.label}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}