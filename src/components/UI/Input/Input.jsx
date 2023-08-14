import { forwardRef } from "react"

export default forwardRef(function Input({ type, ...props }, ref) {
    return (
        <>
            <input ref={ref} type={type} {...props} />
        </>
    )
})