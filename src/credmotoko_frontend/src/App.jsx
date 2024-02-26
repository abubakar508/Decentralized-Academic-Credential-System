import React, { useState } from "react";
import { credmotoko_backend } from "declarations/credmotoko_backend";

const IdInput = () => {
  const [credentialInfo, setCredentialInfo] = useState({
    name: "",
    issuedAt: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);
  
    try {
      const id = document.getElementById("id").value;
  
      const response = await credmotoko_backend.read(parseInt(id, 10));
  
      if (response) {
        const { name, issuedAt } = response;
        console.log(response)
  
        setCredentialInfo({
          name,
          issuedAt,
        });
  
        setErrorMessage("");
      } else {
        setErrorMessage("Credential Identification number not found");
        setCredentialInfo({
          name: "",
          issuedAt: "",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error fetching data. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="code">Credential Idenfitication Number (CID):</label>
        <input
          type="text"
          id="id"
          required
          placeholder="Input credential ID"
          style={{
            width: 200,
            padding: 8,
            margin: 10,
            border: "1px solid #ccc",
            borderRadius: 4,
            fontSize: 14,
          }}
        />

        <button
          type="submit"
          disabled={isButtonDisabled}
          style={{
            backgroundColor: "skyblue",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            border: "none",
            borderRadius: 5,
            fontWeight: "bold",
          }}
        >
          Submit
        </button>
      </form>

      <div className="services-item">
        <h1>Result output</h1>
        <h4 style={{ color: errorMessage ? "red" : "green" }}>
          {errorMessage}
        </h4>
        <h3>{credentialInfo.name}</h3>
        <h3>{credentialInfo.issuedAt}</h3>
      </div>
    </div>
  );
};

export default IdInput;
