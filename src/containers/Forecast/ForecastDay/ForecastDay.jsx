import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import Button from "../../../components/UI/Button/Button"
import Card from "../../../components/UI/Card/Card"
import Modal from "../../../components/UI/Modal/Modal"
import ForecastHour from "../ForecastHour/ForecastHour"

export default function ForecastDay({ dayData, current }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Modal show={isOpen} close={() => setIsOpen(false)}>
                <Card data={{...current, ...dayData}} />
                <Button className="ButtonIc close" onClick={() => setIsOpen(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </Modal>
            <Button className="openModal" onClick={() => setIsOpen(true)}>Read more &raquo;</Button>
            <div className="ForecastHour">
                {dayData.hour.map(hr => (
                    <ForecastHour key={hr.time_epoch} hourData={hr} />
                ))}
            </div>
        </>
    )
}