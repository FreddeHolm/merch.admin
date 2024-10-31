import React, { useState } from "react";

// From the website https://blog.openreplay.com/creating-a-collapsible-component-for-react/

function Collapsible({ title, children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (

      <div className="content" onClick={handleToggle}>
        <h2 className={isExpanded === true ? "collapstop":""} >{title} <span className="floatright">{isExpanded ? "-" : "+"}</span></h2>
        <div className={isExpanded === true ? "content-show": "content-parent"} >

      {isExpanded && <div>{children}</div>}
       </div>
    </div>

  );
}

export default Collapsible;