import React, { useContext, createContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Footer.css';



const Footer = () =>
{
    return(
        <footer className="page-footer font-small blue pt-4 sticky-bottom">
            <div className="footer-copyright text-center py-3">© 2022 Copyright:
                <strong> AlgoVis</strong>
            </div>
        </footer>
    );
};
export default Footer;