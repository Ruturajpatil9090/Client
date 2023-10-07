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
            <a href="#">
              Company <i className="fas fa-caret-down"></i>
            </a>

            <div className="dropdown-menu">
              <ul>
                <li>
                  <a href="#">Create Company</a><p style={{background:"white"}}></p>
                </li>
                <li>
                  <a href="#">Select Company</a>
                </li>
                <li>
                  <a href="#">Create Accounting Year</a>
                </li>
                <li>
                  <a href="#">Select Accounting Year</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">
              Master <i className="fas fa-caret-down"></i>
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
                        <a href="#">Account Master</a>
                      </li>
                      <li>
                        <a href="#">Customer Limits</a>
                      </li>
                      <li>
                        <a href="#">Finincial Groups</a>
                      </li>
                      <li>
                        <a href="#">City Master</a>
                      </li>
                      <li>
                        <a href="#">
                          Carporate Customer Unit/Godown Declaration
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#">Other Master <i className="fas fa-caret-right"></i></a>
                  <div className="dropdown-menu-1">
                    <ul>
                      <li>
                        <a href="#">Mobile/Narration/Item/Gread Masters</a>
                      </li>
                      <li>
                        <a href="#">Brand Master</a>
                      </li>
                      <li>
                        <a href="#">GST Rate Master</a>
                      </li>
                      <li>
                        <a href="#">GST State Master</a>
                      </li>
                      <li>
                        <a href="#">
                        HSN or ACS Code Master
                        </a>
                      </li>
                      <li>
                        <a href="#">
                        Company Related Accounting Parameters
                        </a>
                      </li>
                      <li>
                        <a href="#">
                        Jaggary SystemMaster
                        </a>
                      </li>
                      <li>
                        <a href="#">
                        Jaggary Brand Master
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#">E-Way Bill Setting</a>
                </li>
                <li>
                  <a href="#">Company Parameter</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Inword<i className="fas fa-caret-down"></i></a>
            <div className="dropdown-menu">
              <ul>
                <li>
                  <a href="#">Purchase Bill</a>
                </li>
                <li>
                  <a href="#">Other GST Input</a>
                </li>
                <li>
                  <a href="#">Reverse Charge</a>
                </li>
                <li>
                  <a href="#">Cold Storage Inword</a>
                </li>
                <li>
                  <a href="#">Sugar Sale Return Purchase</a>
                </li>
                <li>
                  <a href="#">Rawanagi Book</a>
                </li>
                <li>
                  <a href="#">Retail Purchase</a>
                </li>
                <li>
                  <a href="#">Grain Purchase Bill</a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a href="#">Transactions<i className="fas fa-caret-down"></i></a>
            <div className="dropdown-menu">
              <ul>
                <li>
                  <a href="#">Receipt/Payment</a>
                </li>
                <li>
                  <a href="#">Journal Voucher</a>
                </li>
                <li>
                  <a href="#">Debit/Credit Note</a>
                </li>
                <li>
                  <a href="#">Multiple Sale Bill Receipts</a>
                </li>
                <li>
                  <a href="#">Other Purchase</a>
                </li>
                <li>
                  <a href="#">GST3B</a>
                </li>
                <li>
                  <a href="#">General Transaction</a>
                </li>
                <li>
                  <a href="#">Payment Note</a>
                </li>
                <li>
                  <a href="#">Group Setting</a>
                </li>
                <li>
                  <a href="#">Check Printing</a>
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
                  <a href="#">Sauda Book Utility</a>
                </li>
                <li>
                  <a href="#">Delivery Order</a>
                </li>
                <li>
                  <a href="#">Delivery Order for Multiple Item</a>
                </li>
                <li>
                  <a href="#">DO Information</a>
                </li>
                <li>
                  <a href="#">Motor Memo</a>
                </li>
                <li>
                  <a href="#">Carporate Sale</a>
                </li>
                <li>
                  <a href="#">Carporate Register</a>
                </li>
                <li>
                  <a href="#">
                  Stok Report<i className="fas fa-caret-right"></i>
                  </a>

                  <div className="dropdown-menu-1">
                    <ul>
                      <li>
                        <a href="#">Balance Stock (Millwise/Partywise)</a>
                      </li>
                      <li>
                        <a href="#">Register</a>
                      </li>
                      <li>
                        <a href="#">Balance Reminder</a>
                      </li>
                      <li>
                        <a href="#">Transport SMS</a>
                      </li>
                      <li>
                        <a href="#">Multiple DO Print</a>
                      </li>
                      <li>
                        <a href="#">Profit Loss</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#">Latter</a>
                </li>
                <li>
                  <a href="#">GoodsTransport</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="#">Outword<i className="fas fa-caret-down"></i></a>
            <div className="dropdown-menu">
              <ul>
                <li>
                  <a href="#">Sale Bill</a>
                </li>
                <li>
                  <a href="#">Commission Bill</a>
                </li>
                <li>
                  <a href="#">Retail Sale Bill</a>
                </li>
                <li>
                  <a href="#">Sugar Sale Return Sale</a>
                </li>
                <li>
                  <a href="#">Service Bill</a>
                </li>
                <li>
                  <a href="#">Cold Storage Outword</a>
                </li>
                <li>
                  <a href="#">Unregister Bill</a>
                </li>
                <li>
                  <a href="#">Grain Sale Bill</a>
                </li> 
              </ul>
            </div>
          </li>


          <li>
            <a href="#">
              Reports <i className="fas fa-caret-down"></i>
            </a>

            <div className="dropdown-menu">
              <ul>
              <li>
                  <a href="#">
                  Ledger<i className="fas fa-caret-right"></i>
                  </a>

                  <div className="dropdown-menu-1">
                    <ul>
                      <li>
                        <a href="#">Ledger</a>
                      </li>
                      <li>
                        <a href="#">Bank Book</a>
                      </li>
                      <li>
                        <a href="#">Account Master Print</a>
                      </li>
                      <li>
                        <a href="#">Group Ledger</a>
                      </li>
                      <li>
                        <a href="#">Broker Report</a>
                      </li>
                      <li>
                        <a href="#">Interest Statement</a>
                      </li>
                      <li>
                        <a href="#">Interest Calculate</a>
                      </li>
                      <li>
                        <a href="#">Day Book (Kird)</a>
                      </li>
                      <li>
                        <a href="#">Cold Storage Register</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="/business/tender_utility">Trial Balance</a>
                </li>
                <li>
                  <a href="#">Profit and Loss/Balance Sheet</a>
                </li>
                <li>
                  <a href="#">Stock Book</a>
                </li>
                <li>
                  <a href="#">Trial Balance Screen</a>
                </li>
                <li>
                  <a href="#">Pending Reports</a>
                </li>
                <li>
                  <a href="#">Retail Sale Register Report</a>
                </li>
                <li>
                  <a href="#">FreightRegister Reports</a>
                </li>
                <li>
                  <a href="#">PartyWise Sale Bill Detail Reports</a>
                </li> 
                <li>
                  <a href="#">RetailSelfBalance Reports</a>
                </li>
                <li>
                  <a href="#">Purchase Sale Registers</a>
                </li>
                <li>
                  <a href="#">Retail Sale Reports</a>
                </li>
                <li>
                  <a href="#">Retail sale Stok Book</a>
                </li>
                <li>
                  <a href="#">Multiple Sale Bill Print</a>
                </li>
                <li>
                  <a href="#">Parywise Sale Bill Print</a>
                </li>
                <li>
                  <a href="#">Grain StockBook</a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a href="#">Utilities<i className="fas fa-caret-down"></i></a>
            <div className="dropdown-menu">
              <ul>
                <li>
                  <a href="#">Department Wise Form Selection</a>
                </li>
                <li>
                  <a href="#">General Info Throught SMS</a>
                </li>
                <li>
                  <a href="#">User Creation</a>
                </li>
                <li>
                  <a href="#">Gropu User Creation</a>
                </li>
                <li>
                  <a href="#">Generate Customer Login</a>
                </li>
                <li>
                  <a href="#">Club Account</a>
                </li>
                <li>
                  <a href="#">Upload Signature</a>
                </li>
                <li>
                  <a href="#">Upload Logo</a>
                </li> 
                <li>
                  <a href="#">Our Office Address</a>
                </li> 
                <li>
                  <a href="#">Post Date</a>
                </li> 
                <li>
                  <a href="#">Other Utility</a>
                </li> 
                <li>
                  <a href="#">USer Security</a>
                </li> 
              </ul>
            </div>
          </li>

          <li>
            <a href="#">GSt Utilities</a>
          </li>

          <li>
            <a href="#">
            Share <i className="fas fa-caret-down"></i>
            </a>

            <div className="dropdown-menu">
              <ul>
              <li>
                  <a href="#">
                  Master<i className="fas fa-caret-right"></i>
                  </a>

                  <div className="dropdown-menu-1">
                    <ul>
                      <li>
                        <a href="#">Script Master</a>
                      </li>
                      <li>
                        <a href="#">Expiry Master</a>
                      </li> 
                    </ul>
                  </div>
                </li>
                <li>
                  <a href="#">Equity Purchase/Sale</a>
                </li>
                <li>
                  <a href="#">Equity Register</a>
                </li>
                <li>
                  <a href="#">FNO Purchase/Sale</a>
                </li>  
                <li>
                  <a href="#">FNO Register</a>
                </li>  
                <li>
                  <a href="#">Company Parameter</a>
                </li>            
              </ul>
            </div>
          </li>

          <li>
            <a href="#">
            Jaggary <i className="fas fa-caret-down"></i>
            </a>

            <div className="dropdown-menu">
              <ul> 
                <li>
                  <a href="#">Awak</a>
                </li>
                <li>
                  <a href="#">Jawak</a>
                </li>
                <li>
                  <a href="#">Sale Bill</a>
                </li>  
                <li>
                  <a href="#">Jaggary Reports</a>
                </li>              
              </ul>
            </div>
          </li>

          <li>
            <a href="#">Log Out</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Menu;
