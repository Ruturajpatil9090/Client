import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import "./Header.css";

function Menu() {
  return (
    <>
      <div className="menu-bar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#">Company</a>
          </li>
          <li>
            <a href="">
              Master<i className="fas fa-caret-down"></i>
            </a>

            <div className="dropdown-menu">
              <ul>
                
                <li>
                  <a href="#">
                  Account Information <i className="fas fa-caret-right"></i>
                  </a>

                  <div className="dropdown-menu-1">
                    <ul>
                      <li>
                        <a href="/master/account_information/account_master">Account Master</a>
                      </li>
                      <li>
                        <a href="#">Team-2</a>
                      </li>
                      <li>
                        <a href="#">Team-3</a>
                      </li>
                      <li>
                        <a href="#">Team-4</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">
              Business Releted <i className="fas fa-caret-down"></i>
            </a>

            <div className="dropdown-menu">
              <ul>
                <li>
                  <a href="/business/tender_utility">Tender Purchase</a>
                </li>
                <li>
                  <a href="#">Portfolio</a>
                </li>
                <li>
                  <a href="#">
                    Team <i className="fas fa-caret-right"></i>
                  </a>

                  <div className="dropdown-menu-1">
                    <ul>
                      <li>
                        <a href="#">Team-1</a>
                      </li>
                      <li>
                        <a href="#">Team-2</a>
                      </li>
                      <li>
                        <a href="#">Team-3</a>
                      </li>
                      <li>
                        <a href="#">Team-4</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact us</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
