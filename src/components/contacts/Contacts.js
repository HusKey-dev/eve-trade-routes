import React from "react";
import "./Contacts.scss";
import avatar from "./Izen.jpg";

function Contacts() {
    return (
        <div className="Contacts">
            <div className="container animate-appear">
                <section className="ingame">
                    <h2>Ingame</h2>
                    <div className="character-card">
                        <p className="character-card__name">Izen Marr</p>
                        <img
                            className="character-card__avatar"
                            src={avatar}
                            alt="Izen Marr's avatar"
                        />
                    </div>
                    <p>
                        If u want to support the project, awaiting for more
                        features in the future, or just want to thank the
                        author, send some isk to Izen Marr ingame. Constructive
                        feedback is also appreciated.
                    </p>
                </section>
                <section className="others">
                    <h2>Others</h2>
                    <p>
                        email:{" "}
                        <span className="email">vitiate728@gmail.com</span>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Contacts;
