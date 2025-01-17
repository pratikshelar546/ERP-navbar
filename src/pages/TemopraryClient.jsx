import useCustomReactQuery from "./getForAllApi";
import { useState, useEffect } from "react"; 
import usePostData from "./postData";
import { Link } from "react-router-dom";
import { deleteProduct } from "./DeleteAPI";
function TemporaryClient() {
    const [product, setProduct] = useCustomReactQuery('temp-client');
    const [inputData, setInputData] = useState({ clientName: '' });
    const { postData, responseData, error, loading, message } = usePostData("temp-client/new");

    const handleData = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newClient = await postData(inputData);
        if (newClient) {
            setProduct((prevData) => [...prevData, newClient]);
            setInputData({ clientName: "" });
        }
    };

    useEffect(() => {
        if (responseData) {
            console.log("New client added:", responseData);
        }
    }, [responseData]);

    return (
        <div className="container">
            <div className="TemporaryClient">
                <h3>Temporary Client</h3>
                <label>Client Name</label>
                <input 
                    type="text" 
                    name="clientName" 
                    placeholder="Client Name" 
                    value={inputData.clientName} 
                    onChange={handleData}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
                <button className="submit" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
            <div className="TemporaryClient">
                <h3>CLIENT LIST</h3>
                <button id="exportButton">Export to Excel</button>
                <h2>The Number of Clients: {product.length}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Client Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((client, index) => (
                            <tr key={client.id}>
                                <td>{index + 1}</td>
                                <td>{client.clientName}</td>
                                <td>
                                    <Link className="edit" to={`/editTemporaryClient/${client.id}`}>Edit</Link>
                                    <button 
                                        className="delete" 
                                        onClick={() => deleteProduct("temp-client/delete", client.id, setProduct)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TemporaryClient;
