import { ReactNode } from "react";

type CardProps = {
    children: ReactNode
}

const Card = ({children}: CardProps) => {
    return (
        <div className="border border-[#F26B0F] rounded-md p-4">
            {children}
        </div>
    )
}

export default Card;