import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { dd1, dd2, dd3, dd4 } from './dds';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Addform = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { userid } = useParams();
    const [rowCount, setRowCount] = useState(1);
    const [user, setUser] = useState({});
    const [rowData, setRowData] = useState([{ vargatrayam: 'd', gothram: '  d', name: '  d', rupam: 'd' }]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://vargatraya-pattika.vercel.app/users/getuser/${userid}`);
                setUser(response.data);
                console.log(response.data.data.length);
                if (response.data.data.length >= 1) {
                    setRowData(response.data.data);
                    setRowCount(response.data.data.length);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
    }, []);

    const addRow = (index) => {
        setRowCount(rowCount + 1);
        setRowData(prevData => [
            ...prevData.slice(0, index + 1),
            { vargatrayam: 'd', gothram: '  d', name: '  d', rupam: 'd' },
            ...prevData.slice(index + 1)
        ]);
    };

    const OnSubmit = async () => {
        setShowModal(false);
        try {
            const res = await axios.put(`https://vargatraya-pattika.vercel.app/users/addform/${userid}`, {
                data: rowData
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
        navigate(`/print/${userid}`);
    };

    const handleKeyPress = async (e, rowIndex, fieldName) => {
        if (e.key === ' ' && rowData[rowIndex][fieldName].trim() !== '') {
            try {
                const response = await axios.get(
                    `https://inputtools.google.com/request?text=${rowData[rowIndex][fieldName].split(' ').slice(0, -1).join(' ')}&itc=te-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
                );
                const firstTeluguWord = response.data[1][0][1].length > 0 ? response.data[1][0][1][0] : '';
                const updatedData = [...rowData];
                updatedData[rowIndex][fieldName] = firstTeluguWord + ' ' + ' ' + rowData[rowIndex][fieldName].split(' ').slice(-1);
                setRowData(updatedData);
            } catch (error) {
                console.error('Error fetching Telugu word:', error);
            }
        }
    };

    const handleSelectChange = (event, rowIndex, dropdownIndex) => {
        const updatedData = [...rowData];
        const updatedValue = updatedData[rowIndex][dropdownIndex].split(' ').slice(0, -1).join(' ') + ' ' + event.target.value;
        console.log(dropdownIndex);
        if (dropdownIndex === 'vargatrayam' || dropdownIndex === 'rupam') { 
            updatedData[rowIndex][dropdownIndex] = event.target.value; 
        }
        else { 
            updatedData[rowIndex][dropdownIndex] = updatedValue; 
        }
        setRowData(updatedData);
    };

    const handleTextFieldChange = (event, rowIndex, fieldName) => {
        const updatedData = [...rowData];
        const updatedValue = event.target.value + ' ' + updatedData[rowIndex][fieldName].split('').slice(-1);
        updatedData[rowIndex][fieldName] = updatedValue;
        setRowData(updatedData);
    };

    return (
        <div className="bg-white rounded-md min-h-screen p-2">
            {showModal && (
                <ConfirmationModal
                    message="Are you sure you want to submit the details?"
                    onConfirm={OnSubmit}
                    setShowModal={setShowModal}
                />
            )}
            <div className="flex justify-between">
                <div className="flex ">
                    <img src='/namaste.jpg' className="rounded-md h-40 w-24" alt="Namaste" />
                    <div className="flex flex-col pt-8 pl-4">
                        <p className="text-2xl font-semibold text-orange-800 font-roboto">{user.name}</p>
                        <p className="text-lg text-gray-500">{user.number}</p>
                        <p className="text-lg text-gray-500">{user.address}</p>
                    </div>
                </div>

                <img src='/nanna.jpg' className="mr-2 mt-10 h-20" alt="Nanna" />
            </div>
            <Divider>
                <img src='/Omm.ico' className="w-20 h-auto" alt="Om" />
            </Divider>
            <div className="text-4xl text-center text-orange-800 p-4">
                వర్గత్రయ పట్టిక
            </div>
            <div className="bg-white rounded-md border border-gray-300 p-4">
                {Array.from({ length: rowCount }).map((_, rowIndex) => (
                    <div key={rowIndex} className="w-full flex items-center justify-between gap-4 mb-4">
                        <span>{rowIndex + 1}</span>
                        <Select
                            value={rowData[rowIndex].vargatrayam}
                            onChange={(event) => handleSelectChange(event, rowIndex, 'vargatrayam')}
                            className="w-1/6"
                        >
                            <MenuItem value='d'>Select One</MenuItem>
                            {dd1.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            label="గోత్రం"
                            variant="outlined"
                            className="w-1/6"
                            value={rowData[rowIndex].gothram.split(' ').slice(0, -1).join(' ')}
                            onKeyPress={(e) => handleKeyPress(e, rowIndex, 'gothram')}
                            onChange={(event) => handleTextFieldChange(event, rowIndex, 'gothram')}
                        />
                        <Select
                            value={rowData[rowIndex].gothram.split(' ').slice(-1)}
                            onChange={(event) => handleSelectChange(event, rowIndex, 'gothram')}
                            className="w-1/6"
                        >
                            <MenuItem value='d'>Select One</MenuItem>
                            {dd2.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            label="పేరు"
                            variant="outlined"
                            className="w-1/6"
                            value={rowData[rowIndex].name.split(' ').slice(0, -1).join(' ')}
                            onKeyPress={(e) => handleKeyPress(e, rowIndex, 'name')}
                            onChange={(event) => handleTextFieldChange(event, rowIndex, 'name')}
                        />
                        <Select
                            value={rowData[rowIndex].name.split(' ').slice(-1)}
                            onChange={(event) => handleSelectChange(event, rowIndex, 'name')}
                            className="w-1/6"
                        >
                            <MenuItem value='d'>Select One</MenuItem>
                            {dd3.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={rowData[rowIndex].rupam}
                            onChange={(event) => handleSelectChange(event, rowIndex, 'rupam')}
                            className="w-1/6"
                        >
                            <MenuItem value={rowData[rowIndex].rupam}>Select One</MenuItem>
                            {dd4.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                        <FontAwesomeIcon icon={faPlus} style={{ color: '#9e9e9e', cursor: 'pointer' }}  onClick={() => addRow(rowIndex)} />
                    </div>
                ))}

                <div className="mt-4 flex justify-center">
                    <Button variant="contained" onClick={() => addRow(rowCount)} style={{ backgroundColor: '#4caf50', color: 'white', marginRight: '8px' }}>
                        Add Row
                    </Button>
                    <Button variant="contained" onClick={() => setShowModal(true)} style={{ backgroundColor: '#f44336', color: 'white' }}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Addform;
