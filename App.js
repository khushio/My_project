import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [input, setInput] = useState(''); // State to store the JSON input
    const [response, setResponse] = useState(null); // State to store the API response
    const [selectedOptions, setSelectedOptions] = useState([]); // State to store selected options in dropdown

    useEffect(() => {
        document.title = "ABCD123"; // Set the page title to your roll number
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://your-backend-url.com/bfhl', JSON.parse(input)); // Replace with your backend URL
            setResponse(res.data);
        } catch (error) {
            console.error("Invalid JSON or server error", error);
            alert("Invalid JSON or server error"); // Display an error message
        }
    };

    const handleOptionChange = (e) => {
        const options = [...e.target.selectedOptions].map(option => option.value);
        setSelectedOptions(options);
    };

    return (
        <div className="App">
            <h1>BFHL Challenge</h1>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter JSON data'
                rows="4"
                cols="50"
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>

            <br /><br />
            <label>Select data to display:</label>
            <br />
            <select multiple onChange={handleOptionChange}>
                <option value="numbers">Numbers</option>
                <option value="alphabets">Alphabets</option>
                <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
            </select>

            {response && (
                <div>
                    <h2>Response</h2>
                    {selectedOptions.includes("numbers") && (
                        <p>Numbers: {response.numbers.join(', ')}</p>
                    )}
                    {selectedOptions.includes("alphabets") && (
                        <p>Alphabets: {response.alphabets.join(', ')}</p>
                    )}
                    {selectedOptions.includes("highest_lowercase_alphabet") && (
                        <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
