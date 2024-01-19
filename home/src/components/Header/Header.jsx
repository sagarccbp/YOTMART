import React from "react";
import NewDeskHeader from "./DesktopHeader/NewDeskHeader/NewDeskHeader";
// import NewHeader from "./DesktopHeader/NewHeader";
import MobileHeader from "./MobileHeader/MobileHeader";
import "./header.scss";


const Header = ({ onClickPadding }) => {
  return (
    <>
      <div className="show-desktop-header">
        {/* <NewHeader /> */}
        <NewDeskHeader onClickPadding={onClickPadding} />
      </div>
      <div className="show-mobile-header">
        <MobileHeader />
      </div>
    </>
  );
};

export default Header;
