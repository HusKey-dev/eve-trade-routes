import React from "react";
import "./main.scss";
import DownloadUpdatedIds from "../dev/DownloadUpdatedIds";

function Main() {
    return (
        <div className="Main">
            <header>
                Welcome to the brand new project, which allows you to find best
                trade routes in New Eden!
            </header>
            <div className="divide-line"></div>
            <p>
                Eve Trade Routes uses the latest esi api and takes data directly
                from ccp. So it is completely safe and secure.
            </p>
            <p>
                You can choose different options to customise your preferences
                such as jump radius or system security filter.
            </p>
            <p>Notice, that routes only include stations, not citadels</p>
            <div className="divide-line"></div>
            <p className="warning">
                <span className="warning__hero">Warning:</span> Due to techical
                limits of CCP services, all provided price data has some update
                period (about 10 minutes) and therefore may be outdated. Also,
                CCP services are a little bit buggy, and sometimes may provide
                incorrect results. Use it at your own risk.
            </p>
            <DownloadUpdatedIds />
        </div>
    );
}

export default Main;
