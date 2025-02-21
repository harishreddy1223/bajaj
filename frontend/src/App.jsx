import { useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponseData(null);

    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!Array.isArray(parsedInput.data)) {
        throw new Error("Invalid input format: 'data' should be an array");
      }

      const res = await axios.post("http://localhost:5000/bfhl", parsedInput);
      setResponseData(res.data);
    } catch (err) {
      setError("Invalid JSON input or API request failed");
    }
  };

  const filterResponse = () => {
    if (!responseData) return null;

    const filteredData = {};
    selectedOptions.forEach(({ value }) => {
      if (responseData[value]) {
        filteredData[value] = responseData[value];
      }
    });

    return filteredData;
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Backend API Test</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='Enter JSON (e.g. { "data": ["A","C","z"] })'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          style={{ width: "60%", height: "100px", padding: "10px" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px", marginTop: "10px" }}>
          Send
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {responseData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Select Data to Display:</h3>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            value={selectedOptions}
          />
        </div>
      )}

      {selectedOptions.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Filtered Response:</h3>
          <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
