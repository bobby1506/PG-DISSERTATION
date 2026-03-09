import React, { useEffect, useState } from 'react';
import './EditGuide.css'
import axios from 'axios';
import { useAuth } from '../../AuthContext';

const EditGuide = () => {
    const { useremail } = useAuth();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
   
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8080/api/auth/guide/guideEmail/${useremail}`);
                if (response.data && response.data.length > 0) {
                    setGuide(response.data[0]);
                } else {
                    setError('Guide not found');
                }
            } catch (error) {
                console.log(error);
                setError('Failed to load guide data');
            }
            setLoading(false);
        };
        if (useremail) {
            fetchData();
        }
    }, [useremail]);
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGuide(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await axios.put(`http://localhost:8080/api/auth/guide/${guide.id}`, guide);
            console.log('Update successful:', response.data);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Update failed:', error);
            setError('Failed to update guide information');
        }
        setLoading(false);
    };
    
    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p>Loading...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
                <p>{error}</p>
            </div>
        );
    }
    
    if (!guide) {
        return <div>No guide data available</div>;
    }
    
    return (
        <div>
            <div className='guide_dashboard'>  
                <div className='guide_main'>
                    <div id="New_request">
                        <div className="guidereq_head">
                            <div className="guidereq_img">
                                <img src={guide.image || "https://tse1.mm.bing.net/th?id=OIP.6h97cyJOLha0BuEZSM6RgwHaE8&pid=Api&rs=1&c=1&qlt=105&w=145&h=97"} alt="Guide" />
                            </div>
                            <div>
                                <h2>{guide.name}</h2>
                                <p>{guide.academicQualification}</p>
                            </div>
                        </div>
                        
                        {success && (
                            <div className="alert alert-success" role="alert">
                                Profile updated successfully!
                            </div>
                        )}
                        
                        <h2>Edit Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="guide_edit">
                                <p>Guide Id: <input type="text" name="guideId" value={guide.guideId || ''} onChange={handleInputChange} /></p>
                                <p>Email: <input type="email" name="email" value={guide.email || ''} onChange={handleInputChange} /></p>
                                <p>Phone: <input type="text" name="phoneNumber" value={guide.phoneNumber || ''} onChange={handleInputChange} /></p>
                                <p>Gender: <input type="text" name="gender" value={guide.gender || ''} onChange={handleInputChange} /></p>
                                <p>Academic Qualifications: <input type="text" name="academicQualification" value={guide.academicQualification || ''} onChange={handleInputChange} /></p>
                                <p>Years of Experience: <input type="number" name="yearOfExperience" value={guide.yearOfExperience || 0} onChange={handleInputChange} /></p>
                                <p>Area of Specialization: <input type="text" name="areaOfSpecialization" value={guide.areaOfSpecialization || ''} onChange={handleInputChange} /></p>
                            </div>
                            <div className='guide_editButton'>
                                <button type='submit' disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditGuide;
