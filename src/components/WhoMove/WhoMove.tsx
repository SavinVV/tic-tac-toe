import './WhoMove.css'

interface IPropsWhoMove {
    statusGame: string,
    symbol: string
}

const WhoMove = ({statusGame, symbol}: IPropsWhoMove) => {
    let text = 'Ваш ход';
    let typeCell = symbol === 'X' ? 'crossCell' : 'circleCell';
    if (statusGame === 'End') {
        text = 'Игра закончена';
        typeCell = symbol === 'X' ? 'circleCell' : 'crossCell';
    }
    return (
        <div className='who_move'>
            <p>{text}</p>
            <div className={typeCell}></div>
        </div>
    )
}

export default WhoMove;