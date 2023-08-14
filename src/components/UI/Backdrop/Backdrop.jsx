export default function({ show, clicked }) {
    return (
        show ? <div className='Backdrop' onClick={clicked}></div> : null
    )
}