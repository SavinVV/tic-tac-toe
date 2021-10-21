import './Table.css';

interface IPropsTable {
    matrix: string[][];
    symbol: string;
    statusGame: string;
    changeMatrix: (i:number, j:number, symbol: string) => void;
    changeSymbol: (item: string) => void;
}

const Table = (props: IPropsTable): any => {

    const rows = props.matrix.map((row, i) => {
        return (
            <tbody key={i}>
                <tr key={i}>
                {
                    row.map((item, j) => {
                        return (
                            <td onClick={(e) => tdClick(e)}
                                key={`${i}${j}`}
                                data-row={i}
                                data-column={j}
                            ></td>
                        )
                    })
                }
                </tr>
            </tbody>
            
        )
    })

    const tdClick = (e: React.MouseEvent): void => {
        const {statusGame, symbol, changeSymbol, changeMatrix} = props;
        if (statusGame === 'In progress') {
            const target = e.target as HTMLElement;
            const row = target.dataset.row as string;
            const column = target.dataset.column as string;
            if (target.classList.length === 0) {
                if (symbol === 'X') {
                    target.classList.add('crossCell')
                    changeMatrix(+row, +column, symbol);
                    changeSymbol('O')
                } else {
                    target.classList.add('circleCell')
                    changeMatrix(+row, +column, symbol);
                    changeSymbol('X')
                }
            }
        }
    }

    return (
        <>
            <table>
                {rows}
            </table>
        </>
    )
}

export default Table;