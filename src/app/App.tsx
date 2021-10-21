import { useState } from "react"
import Table from "../components/Table";
import WhoMove from "../components/WhoMove";
import SizeMatrix from "../components/SizeMatrix";

import "./App.css";

export default function App(): any {

    const createMatrix = (size: number): string[][] => {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push('');
            }
            matrix.push(row);
        }
        return matrix;
    }
    
    let [sizeMatrix, setSizeMatrix] = useState(3);
    let [matrix, setMatrix] = useState(createMatrix(sizeMatrix));
    let [statusGame, setStatusGame] = useState('In progress');
    let [symbol, setSymbol] = useState('X');

    const changeSizeMatrix = (size: number): void => {
        setSizeMatrix(size);
        const newMatrix = createMatrix(size);
        setMatrix(newMatrix);
        setSymbol('X');
        clearClassList();
        setStatusGame('In progress');
    }

    const changeMatrix = (i:number, j:number, symbol: string): void => {
        const cloneMatrix = [...matrix];
        cloneMatrix[i][j] = symbol;
        setMatrix(cloneMatrix);
        const result = checkResult(symbol);
        if (result.length > 0) {
            paintCells(result);
            setStatusGame('End');
        }
    }
    const changeSymbol = (item: string): void => {
        setSymbol(item);
    }

    const checkResult = (symbol: string): string[] => {
        const len = matrix.length;
        let result = [];
        // check rows
        for (let i = 0; i <= len - 1; i++) {
            const counter = matrix[i].filter(item => item === symbol).length;
            if (counter === len) {
                for (let j = 0; j <= len - 1; j++) {
                    const cellNumber = `${i}${j}`;
                    result.push(cellNumber);
                }
                return result
            }
        }

        // check columns 
        for (let i = 0; i <= len - 1; i++) {
            result = [];
            for (let j = 0; j <= len - 1; j++) {
                if (matrix[j][i] === symbol) {
                    const cellNumber = `${j}${i}`
                    result.push(cellNumber);
                }
                if (result.length === len) {
                    return result
                }
            }
        }

        // check main diagonal
        result = [];
        for (let i = 0; i <= len - 1; i++) {
            if (matrix[i][i] === symbol) {
                const cellNumber = `${i}${i}`
                result.push(cellNumber);
            }
            if (result.length === len) {
                return result
            }
        }

        // check side diagonal
        result = [];
        for (let i = 0; i <= len - 1; i++) {
            if (matrix[i][len - 1 - i] === symbol) {
                const cellNumber = `${i}${len - 1 - i}`
                result.push(cellNumber);
            }
            if (result.length === len) {
                return result
            }
        }
        return [];
    }

    const paintCells = (listCells: string[]): void => {
        listCells.forEach(item => {
            document.querySelectorAll('td').forEach(cell => {
                if (cell.dataset.row === item[0] && cell.dataset.column === item[1]) {
                    cell.style.backgroundColor = '#55dc646b';
                }
            })
        })
    }

    const clearClassList = (): void => {
        const classList = document.querySelectorAll('td');
        classList.forEach(item => {
            item.className = "";
            item.style.backgroundColor = ''
        })
    }

    return (
        <div className='app'>
            <h1>Крестики нолики</h1>
            <SizeMatrix changeSizeMatrix={changeSizeMatrix}/>
            <WhoMove 
                symbol={symbol}
                statusGame={statusGame}/>
            <Table
                statusGame={statusGame}
                matrix={matrix}
                changeMatrix={changeMatrix}
                symbol={symbol}
                changeSymbol={changeSymbol}/>
            <button onClick={() => {
                setMatrix(createMatrix(sizeMatrix));
                setSymbol('X');
                clearClassList();
                setStatusGame('In progress');
            }}>Сбросить</button>
        </div>
    )
}