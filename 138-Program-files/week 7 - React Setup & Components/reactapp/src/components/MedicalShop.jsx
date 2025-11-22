import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Medicalshop = () => {
    const [inventory, setInventory] = useState([
        {id: 1, name: 'Paracetamol', quantity: 50, price: 2.5},
        {id: 2, name: 'Aspirin', quantity: 30, price: 3},
        {id: 3, name: 'Band-Aid', quantity: 100, price: 1},
    ]);

    const [newMedicine, setNewMedicine] = useState({
        name: '',
        quantity: '',
        price: '',
    });

    const handleNewMedicineChange = (e) => {
        const { name, value } = e.target;
        setNewMedicine({ ...newMedicine, [name]: value });
    };

    const handleAddMedicine = () => {
        if (!newMedicine.name || !newMedicine.quantity || !newMedicine.price) {
            alert('Please fill in all fields');
            return;
        }

        const medincineToAdd = {
            id: inventory.length > 0 ? Math.max(...inventory.map(med => med.id)) + 1: 1,
            name: newMedicine.name,
            quantity: parseInt(newMedicine.quantity, 10),
            price: parseFloat(newMedicine.price),
        };

        setInventory([...inventory, medincineToAdd]);

        setNewMedicine({
            name: '',
            quantity: '',
            price: '',
        });
    };

    return (
        <div className="container my-4">
            <h1 className="text-primary text-center">Medical Shop Inventory</h1>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((medicine) => (
                        <tr key={medicine.id}>
                            <td>{medicine.id}</td>
                            <td>{medicine.name}</td>
                            <td>{medicine.quantity}</td>
                            <td>{medicine.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-5">
                <h2 className="text-success text-center">Add New Medicine</h2>
                <div className="row g-3 mt-3">
                    <div className="col-md">
                        <input 
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            value={newMedicine.name}
                            onChange={handleNewMedicineChange} 
                        />
                    </div>
                    <div className="col-md">
                        <input 
                            type="number"
                            name="quantity"
                            className="form-control"
                            placeholder="Quantity"
                            value={newMedicine.quantity}
                            onChange={handleNewMedicineChange}
                            min="0" 
                        />
                    </div>
                    <div className="col-md">
                        <input 
                            type="number"
                            name="price"
                            className="form-control"
                            placeholder="Price"
                            value={newMedicine.price}
                            onChange={handleNewMedicineChange} 
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="col-md-auto">
                        <button className="btn btn-success w-100" onClick={handleAddMedicine}>Add Medicine</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Medicalshop;