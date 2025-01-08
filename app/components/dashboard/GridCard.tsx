import { ReactNode } from "react";


type GridCardProps = {
    children: ReactNode
}

const GridCard = ({children}: GridCardProps) => {
    return (
        <div className="grid grid-cols-2 gap-8 mb-5">
            {children}
        </div>
    )
}

export default GridCard;