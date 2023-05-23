import React from "react";


function AlertNotification({ type = "danger", messages = [] }) {
  // console.debug("Alert", "type=", type, "messages=", messages);

  return (
    <div className={`alert alert-${type}`} role="alert">
      {messages.map(error => (
        <p className="mb-0 small" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
};

export default AlertNotification;