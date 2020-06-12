import React from "react"

import LeftPanel from "./LeftPanel"
import MidPanel from "./MidPanel"

function MainPage() {
    return (
        <body>
            <div className="left-panel">
                <LeftPanel />
            </div>
            <div className="mid-panel">
                <MidPanel />
            </div>
        </body>
    )
}

export default MainPage