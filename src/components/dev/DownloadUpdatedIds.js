import React from "react";
import { connect } from "react-redux";
import { downloadNewIds } from "../../actions/dowloadNewIds";
import exclamation from "../../images/exclamation_sign.svg";

export const DownloadUpdatedIds = (props) => {
    return (
        <div>
            <button onClick={props.downloadNewIds}>Update Ids</button>
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { downloadNewIds })(DownloadUpdatedIds);
