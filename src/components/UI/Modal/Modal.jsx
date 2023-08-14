import Backdrop from "../Backdrop/Backdrop"

export default function Modal({ children, show, close }) {
    return (
        <>
            <Backdrop show={show} clicked={close} />
            <div className={`Modal ${show ? 'show' : ''}`}>
                {children}
            </div>
        </>
    )
}