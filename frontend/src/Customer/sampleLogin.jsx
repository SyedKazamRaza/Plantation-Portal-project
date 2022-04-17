import React, { useState } from "react";
import Chatpanel from "./chatpanel/chatpanel";

function SampleLogin(props) {
  const [userid, setUserid] = useState("");
  const [role, setUserRole] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);

  const changeuserid = (event) => {
    setUserid(event.target.value);
  };
  function setRole(event) {
    setUserRole(event.target.value);
  }

  function submitForm(event) {
    event.preventDefault();
    if (userid === "" && role === "") {
      return;
    }
    setSubmitted(true);
  }

  return (
    <div>
      {isSubmitted ? (
        <Chatpanel userId={userid} role={role} />
      ) : (
        <form onSubmit={submitForm}>
          <input
            type="text"
            name="id"
            id="User ID here"
            placeholder="Enter user ID here"
            onChange={changeuserid}
          />
          <br />
          <input
            type="text"
            name="id"
            id="Role"
            placeholder="User Role"
            onChange={setRole}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default SampleLogin;
