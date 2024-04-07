import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const Landing = () => {
    const [name, setname] = useState('');
    const [loading, setLoading] = useState(true);
    const [number, setnumber] = useState('');
    const [address, setAddress] = useState('');
    const [newData, setNewData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [originalData, setOriginalData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://vargatraya-pattika.vercel.app/users');
                setNewData(response.data.users);
                setOriginalData(response.data.users);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        console.log(newData);
        fetchData();
    }, []);

    const addNew = () => {
        setShowForm(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://vargatraya-pattika.vercel.app/users/adduser', {
                name: name,
                number: number,
                address: address
            });
            console.log('User added successfully:', response.data);
            setNewData(prevData => [...prevData, response.data]);
            setOriginalData(prevData => [...prevData, response.data]);
            setname('');
            setnumber('');
            setAddress('');
            setShowForm(false);
        } catch (error) {
            alert(`Error adding user: ${error.response.data.message}`);
        }
    };

    const handleViewDetails = (userid) => {
        navigate(`/print/${userid}`);
    }
    const handleSearch = (q) => {
        if (q === '') {
            setNewData(originalData);
        } else {
            const filteredData = originalData.filter(data =>
                data.number.toString().includes(q)
            );
            setNewData(filteredData);
        }
        setSearchQuery(q);
    };
    const handleAddressKeyPress = async (e) => {
        if (e.key === ' ' && address.trim() !== '') {
            try {
                const response = await axios.get(
                    `https://inputtools.google.com/request?text=${address}&itc=te-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
                );
                const firstTeluguWord =
                    response.data[1][0][1].length > 0 ? response.data[1][0][1][0] : '';
                setAddress(firstTeluguWord + " ");
            } catch (error) {
                console.error('Error fetching Telugu word:', error);
            }
        }
    };
    const handleNameKeyPress = async (e) => {
        if (e.key === ' ' && name.trim() !== '') {
            try {
                const response = await axios.get(
                    `https://inputtools.google.com/request?text=${name}&itc=te-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
                );
                const firstTeluguWord =
                    response.data[1][0][1].length > 0 ? response.data[1][0][1][0] : '';
                setname(firstTeluguWord + " ");
            } catch (error) {
                console.error('Error fetching Telugu word:', error);
            }
        }
    };
    const handleFillDetails = (data) => {
        navigate(`/addform/${data._id}`);
    };
    return (
        <div className="bg-white rounded-md min-h-screen p-2">
            <div className="flex justify-between">
                <img src='/namaste.jpg' className="rounded-md h-40 w-24" alt="Namaste" />
                <img src='/nanna.jpg' className="mr-2 mt-10 h-20" alt="Nanna" />
            </div>
            <Divider>
                <img src='/Omm.ico' className="w-20 h-auto" alt="Om" />
            </Divider>
            <div className="text-4xl text-center text-orange-800 p-4">
                యజమానుల వివరాలు
            </div>
            <div className="flex justify-end mb-4">
                <TextField
                    label="Search by Phone Number"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    variant="outlined"
                    className="mr-2"
                />
            </div>
            {loading ? ( // Conditionally rendering loading animation
                <div className="flex justify-center mt-8">
                    <CircularProgress color="primary" />
                </div>
            ) : (
                // Your existing JSX
            <div className="bg-white rounded-md border border-gray-300 p-4 mt-4 flex flex-row items-center justify-between">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider rounded-l-lg">#</th>
                            <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider">యజమాని పేరు</th>
                            <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider">ఫోన్ నెంబర్</th>
                            <th className="px-6 py-3 bg-gray-200 text-left text-lg font-semibold text-gray-800 uppercase tracking-wider uppercase tracking-wider">అడ్రస్</th>
                            <th className="px-6 py-3 bg-gray-200 rounded-r-lg"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {newData.map((data, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-lg">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-lg">{data.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-lg">{data.number}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-lg">{data.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-lg">
                                    {data.data.length !== 0 ? (
                                        <button
                                            className="bg-blue-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
                                            onClick={() => handleViewDetails(data._id)}
                                        >
                                            View Details
                                        </button>
                                    ) : (
                                        <button
                                            className="bg-orange-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-orange-600"
                                            onClick={() => handleFillDetails(data)}
                                        >
                                            Fill Details
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
            <div>
                {
                    showForm && (
                        <div className="bg-white rounded-md border border-gray-300 p-4 mt-4">
                            <TextField
                                label="యజమాని పేరు"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                onKeyPress={handleNameKeyPress}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                className="mb-2"
                            />
                            <TextField
                                label="ఫోన్ నెంబర్"
                                value={number}
                                onChange={(e) => setnumber(e.target.value)}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                className="mb-2"
                            />
                            <TextField
                                label="అడ్రస్"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                onKeyPress={handleAddressKeyPress}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                className="mb-2"
                            />
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    )}
                <div className="mt-4 flex justify-center">
                    <Button variant="contained" onClick={addNew}>
                        Add New
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Landing;
