import React from "react"

import LeftPanel from "./LeftPanel"
import MidPanel from "./MidPanel"
import RightPanel from "./RightPanel"

function MainPage() {
    return (
        <body>
            <div className="left-panel">
                <LeftPanel />
            </div>
            <div className="mid-panel">
                <MidPanel />
            </div>
            <div className="right-panel">
                <RightPanel />
            </div>
        </body>
    )
}

export default MainPage