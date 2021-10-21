import './SizeMatrix.css'

interface IPropsSizeMatrix {
    changeSizeMatrix: (size: number) => void,
}

const SizeMatrix = ({changeSizeMatrix}: IPropsSizeMatrix) => {
    return (
        <div className='size_matrix'>
            <p>Размер поля</p>
            <div className='size_matrix__btns_list'>
                <button onClick={() => changeSizeMatrix(3)}>3</button>
                <button onClick={() => changeSizeMatrix(4)}>4</button>
                <button onClick={() => changeSizeMatrix(5)}>5</button>
            </div>
        </div>
    )
}

export default SizeMatrix;