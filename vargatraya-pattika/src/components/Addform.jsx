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
const Addform = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { userid } = useParams();
    const [rowCount, setRowCount] = useState(1);
    const [user, setUser] = useState({});
    const [selectedValues, setSelectedValues] = useState([['d', 'd', 'd', 'd']]);
    const [textFieldsData, setTextFieldsData] = useState([{ gothram: '', name: '' }]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://vargatraya-pattika.vercel.app/users/getuser/${userid}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchUser();
    }, []);
    const addRow = () => {
        setRowCount(rowCount + 1);
        setSelectedValues([...selectedValues, ['d', 'd', 'd', 'd']]);
        setTextFieldsData([...textFieldsData, { gothram: '', name: '' }]);
    };
    console.log(user);
    const OnSubmit = async () => {
        setShowModal(false);
        const data = [];
        selectedValues.forEach((row, index) => {
            const rowData = {};
            rowData.vargatrayam = selectedValues[index][0];
            rowData.gothram = textFieldsData[index].gothram + " " + selectedValues[index][1];
            rowData.name = textFieldsData[index].name + " " + selectedValues[index][2];
            rowData.rupam = selectedValues[index][3];
            data.push(rowData);
        });
        try {
            const res = await axios.put(`https://vargatraya-pattika.vercel.app/users/addform/${userid}`, {
                data: data
            });
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
        navigate(`/print/${userid}`);
    };

    const handleNameKeyPress = async (e,rowIndex,fieldName)=>{
        if (e.key === ' ' && textFieldsData[rowIndex].name.trim() !== '') {
            try {
                const response = await axios.get(
                    `https://inputtools.google.com/request?text=${textFieldsData[rowIndex].name}&itc=te-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
                );
                const firstTeluguWord =
                    response.data[1][0][1].length > 0 ? response.data[1][0][1][0] : '';
                const updatedData = [...textFieldsData];
                updatedData[rowIndex][fieldName] = firstTeluguWord+" ";
                setTextFieldsData(updatedData);
            } catch (error) {
                console.error('Error fetching Telugu word:', error);
            }
        }
    };
    const handleGothramKeyPress = async (e, rowIndex, fieldName) => {
        if (e.key === ' ' && textFieldsData[rowIndex].gothram.trim() !== '') {
            try {
                const response = await axios.get(
                    `https://inputtools.google.com/request?text=${textFieldsData[rowIndex].gothram}&itc=te-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`
                );
                const firstTeluguWord =
                    response.data[1][0][1].length > 0 ? response.data[1][0][1][0] : '';
                const updatedData = [...textFieldsData];
                updatedData[rowIndex][fieldName] = firstTeluguWord+" ";
                setTextFieldsData(updatedData);
            } catch (error) {
                console.error('Error fetching Telugu word:', error);
            }
        }
    };
    const handleSelectChange = (event, rowIndex, dropdownIndex) => {
        const updatedValues = [...selectedValues];
        updatedValues[rowIndex][dropdownIndex] = event.target.value;
        setSelectedValues(updatedValues);
    };

    const handleTextFieldChange = (event, rowIndex, fieldName) => {
        const updatedData = [...textFieldsData];
        updatedData[rowIndex][fieldName] = event.target.value;
        setTextFieldsData(updatedData);
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
                            value={selectedValues[rowIndex][0]}
                            onChange={(event) => handleSelectChange(event, rowIndex, 0)}
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
                            value={textFieldsData[rowIndex].gothram}
                            onKeyPress={(e) => handleGothramKeyPress(e, rowIndex, 'gothram')}
                            onChange={(event) => handleTextFieldChange(event, rowIndex, 'gothram')}
                        />
                        <Select
                            value={selectedValues[rowIndex][1]}
                            onChange={(event) => handleSelectChange(event, rowIndex, 1)}
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
                            value={textFieldsData[rowIndex].name}
                            onKeyPress={(e) => handleNameKeyPress(e, rowIndex, 'name')}
                            onChange={(event) => handleTextFieldChange(event, rowIndex, 'name')}
                        />
                        <Select
                            value={selectedValues[rowIndex][2]}
                            onChange={(event) => handleSelectChange(event, rowIndex, 2)}
                            className="w-1/6"
                        >
                            <MenuItem value='d'>Select One</MenuItem>
                            {dd3.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={selectedValues[rowIndex][3]}
                            onChange={(event) => handleSelectChange(event, rowIndex, 3)}
                            className="w-1/6"
                        >
                            <MenuItem value='d'>Select One</MenuItem>
                            {dd4.map(item => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </div>
                ))}


                <div className="mt-4 flex justify-center">
                    <Button variant="contained" onClick={addRow} style={{ backgroundColor: '#4caf50', color: 'white', marginRight: '8px' }}>
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
