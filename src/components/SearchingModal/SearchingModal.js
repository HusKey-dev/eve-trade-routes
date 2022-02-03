import React from "react";
import { connect } from "react-redux";
import "./SearchingModal.scss";
import preloader from "./Spinner2.svg";

export const SearchingModal = (props) => {
    return (
        <div className="SearchingModal">
            <img src={preloader} alt="" />
            <p>Loading...</p>
        </div>
    );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SearchingModal);
