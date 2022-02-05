import React from "react";
import { connect } from "react-redux";
import "./SearchingModal.scss";
import preloader from "./Spinner2.svg";
import gifloader from "./Spinner3.gif";

export const SearchingModal = (props) => {
    return (
        <div className="SearchingModal">
            {/* <img src={preloader} alt="" /> */}
            <img src={gifloader} alt="" />
            <p>Loading...</p>
        </div>
    );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SearchingModal);
