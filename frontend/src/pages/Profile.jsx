import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        newPassword: "",
        referral: "",
        mentalCondition: "",
        ageGroup: "",
        country: "",
        goals: "",
        preferences: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to view this page.");
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = response.data.user;
                setProfile(user);
                setFormData({
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    referral: user.referral,
                    mentalCondition: user.mentalCondition,
                    ageGroup: user.ageGroup,
                    country: user.country,
                    goals: user.goals,
                    preferences: user.preferences,
                    password: "",
                    newPassword: "",
                });
                console.log(user);
                console.log(formData);
                setError(null);
            } catch (err) {
                setError("Failed to load profile. Please log in again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put("http://localhost:5000/profile", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(response.data.user);
            setIsEditing(false);
            setError(null);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Invalid data. Please check your inputs.");
            } else {
                setError("Failed to update profile. Please try again.");
            }
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white/90 rounded-xl shadow-sm">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    {error}
                </div>
            )}
            <div className="text-center">
                {/* <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-sage-100"
                /> */}
                {!isEditing ? (
                    <>
                        <h3 className="text-xl font-semibold text-slate-700">{profile.name}</h3>
                        <p className="text-slate-500 mt-2">Email: {profile.email}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-6 px-8 py-3 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-all duration-300 ease-in-out"
                        >
                            Edit Profile
                        </button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        />
                        <select
                            name="referral"
                            value={formData.referral}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        >
                            <option value="">How did you find us?</option>
                            <option value="social">Social Media</option>
                            <option value="friend">Friend</option>
                            <option value="search">Search Engine</option>
                            <option value="other">Other</option>
                        </select>

                        <select
                            name="mentalCondition"
                            value={formData.mentalCondition}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        >
                            <option value="">Select your condition</option>
                            <option value="Anxiety">Anxiety</option>
                            <option value="Depression">Depression</option>
                            <option value="PTSD">PTSD</option>
                            <option value="Bipolar">Bipolar</option>
                            <option value="Other">Other</option>
                        </select>

                        <select
                            name="ageGroup"
                            value={formData.ageGroup}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        >
                            <option value="">Select age group</option>
                            <option value="Under 18">Under 18</option>
                            <option value="18-24">18-24</option>
                            <option value="25-34">25-34</option>
                            <option value="35-44">35-44</option>
                            <option value="45-54">45-54</option>
                            <option value="55+">55+</option>
                        </select>

                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        />
                        <textarea
                            name="goals"
                            value={formData.goals}
                            onChange={handleChange}
                            placeholder="What are your goals?"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        />
                        <textarea
                            name="preferences"
                            value={formData.preferences}
                            onChange={handleChange}
                            placeholder="Your preferences"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Current Password"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        />
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="New Password (optional)"
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
                        />
                        <button
                            type="submit"
                            className="w-full bg-sage-500 text-white py-3 rounded-lg hover:bg-sage-600 transition-all duration-300 ease-in-out"
                        >
                            Save Changes
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;
