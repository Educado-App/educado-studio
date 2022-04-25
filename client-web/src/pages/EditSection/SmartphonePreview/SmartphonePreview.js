import React from "react";
import SmartphoneContentView from "./SmartphoneContent";
import './SmartphonePreview.css'

const SmartphonePreview = () => {

    return (
      <div className="smartphoneEdge">
          <div className="smartphoneScreen">
              <SmartphoneContentView />
          </div>
      </div>
    )
};


export default SmartphonePreview;