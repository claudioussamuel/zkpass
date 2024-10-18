import React from "react"
import { Boxes } from "./ui/background-box"


const BackgroundContainer = ({children}:{children : React.ReactNode}) => {
return (
    <div className=" relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
            <Boxes />
            {children}
        

    </div>
);
}
export default BackgroundContainer;