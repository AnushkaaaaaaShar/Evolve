import React, { useEffect, useState } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PasswordManager = () => {
    const [form, setForm] = useState({ web: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [showPassword, setShowPassword] = useState({});

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copytext = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.info('Copied to clipboard!', {
                position: "top-right",
                autoClose: 2000,
                icon: "💖",
            });
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const delEverything = (web) => {
        let passwords = JSON.parse(localStorage.getItem("passwords"));
        let del = passwords.filter(item => item.web !== web);
        localStorage.setItem("passwords", JSON.stringify(del));
        setPasswordArray(del);
        toast.success('Item deleted!', {
            position: "top-right",
            autoClose: 2000,
            icon: "🗑️",
        });
    }

    const edit = (username) => {
        setForm(passwordArray.filter(item => item.username === username)[0]);
    }

    const togglePasswordVisibility = (id) => {
        setShowPassword(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    const savePassword = () => {
        // Check if this is an update or a new entry
        const existingIndex = passwordArray.findIndex(item =>
            item.web === form.web && item.username === form.username
        );

        let newPasswordArray;

        if (existingIndex !== -1) {
            // Update existing entry
            newPasswordArray = [...passwordArray];
            newPasswordArray[existingIndex] = form;
            toast.success('Password updated successfully!', {
                icon: "✨"
            });
        } else {
            // Add new entry
            newPasswordArray = [...passwordArray, form];
            toast.success('Password saved successfully!', {
                icon: "✨"
            });
        }

        setPasswordArray(newPasswordArray);
        localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
        setForm({ web: "", username: "", password: "" });
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <>
            <nav className="bg-[#472950] text-[#D46A79] shadow-md w-full z-10 overflow-hidden">
                <div className="container mx-auto px-4 py-2 flex flex-col items-center">
                    {/* EVOLVE in the center */}
                    <div className="relative group text-center w-full">
                        <h1 className="text-2xl md:text-3xl mt-4 md:mt-6 font-bold tracking-wider transition-all duration-300 relative py-2 flex items-center justify-center">
                            <span className="absolute group-hover:opacity-0 group-hover:scale-90 transition-all duration-300">
                                EVOLVE
                            </span>
                            <span className="absolute opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-300 whitespace-nowrap">
                                PASSWORD MANAGER
                            </span>
                        </h1>
                    </div>

                    {/* Secret Keeper and message - responsive layout */}
                    <div className="flex flex-col sm:flex-row justify-between items-center w-full px-2 md:px-4 mb-2 md:mb-0">
                        <h2 className="text-lg md:text-xl font-bold text-pink-300 mb-1 sm:mb-0">
                            <i className="fas fa-lock mr-2"></i>Secret Keeper
                        </h2>
                        <div className="text-sm md:text-base text-pink-200">

                            <button onClick={() => navigate("/generator")}>  <i className="fas fa-heart mr-1"></i> Made with Love </button>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="min-h-screen flex flex-col">

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                {/* Main Content */}
                <div className="flex-grow flex flex-col items-center py-8 px-4 w-full max-w-4xl mx-auto">
                    {/* Form Section */}
                    <div className="w-full bg-transparent bg-opacity-80 p-6 rounded-lg shadow-md mb-8 border-2 border-pink-200">
                        <h2 className="text-2xl font-bold mb-4 text-center text-white">
                            <i className="fas fa-key mr-2"></i>Add New Password
                        </h2>

                        {/* URL Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-purple-700">Website URL</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-400">
                                    <i className="fas fa-globe"></i>
                                </span>
                                <input
                                    type="text"
                                    value={form.web}
                                    onChange={handleChange}
                                    name="web"
                                    placeholder="Enter Website URL"
                                    className="w-full pl-10 p-3 bg-pink-50 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800"
                                />
                            </div>
                        </div>

                        {/* Username & Password Inputs */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="w-full sm:w-1/2">
                                <label className="block text-sm font-medium mb-1 text-purple-700">Username</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-400">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <input
                                        type="text"
                                        value={form.username}
                                        onChange={handleChange}
                                        name="username"
                                        placeholder="Enter Your Username"
                                        className="w-full pl-10 p-3 bg-pink-50 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800"
                                    />
                                </div>
                            </div>

                            <div className="w-full sm:w-1/2">
                                <label className="block text-sm font-medium mb-1 text-purple-700">Password</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-pink-400">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    <input
                                        type="text"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        name="password"
                                        className="w-full pl-10 p-3 bg-pink-50 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={savePassword}
                            className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white font-semibold rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition-all duration-300"
                        >
                            <i className={`fas ${form.web && passwordArray.some(p => p.web === form.web && p.username === form.username) ? 'fa-edit' : 'fa-plus'} mr-2`}></i>
                            {form.web && passwordArray.some(p => p.web === form.web && p.username === form.username) ? 'Update Password' : 'Save Password'}
                        </button>
                    </div>

                    {/* Password List Section */}
                    <div className="w-full bg-transparent p-6 rounded-lg shadow-md border-2 border-pink-200">
                        <h2 className="text-2xl font-bold mb-6 text-center text-white">
                            <i className="fas fa-list-alt mr-2"></i>Your Passwords
                        </h2>

                        {passwordArray.length === 0 &&
                            <div className="text-center py-10 text-gray-500">
                                <i className="fas fa-folder-open text-4xl mb-3 text-pink-300"></i>
                                <p>No passwords saved yet. Add your first one above!</p>
                            </div>
                        }

                        {passwordArray.length !== 0 &&
                            <div className="overflow-x-auto rounded-lg border border-pink-200">
                                <table className="min-w-full border-collapse">
                                    <thead>
                                        <tr className="bg-white text-[#051923] text-sm sm:text-base">
                                            <th className="p-3 border-r border-white-300">Actions</th>
                                            <th className="p-3 border-r border-white300">Website</th>
                                            <th className="p-3 border-r border-white-300">Username</th>
                                            <th className="p-3">Password</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center text-sm sm:text-base divide-y divide-pink-100">
                                        {passwordArray.map((item, index) => (
                                            <tr key={index} className="hover:bg-pink-50 transition-colors duration-150">
                                                <td className="p-3 whitespace-nowrap">
                                                    <div className="flex justify-center space-x-2">
                                                        <button
                                                            onClick={() => { edit(item.username) }}
                                                            className="text-purple-500 hover:text-purple-700 transition-colors"
                                                            title="Edit"
                                                        >
                                                            <i className="fa-solid fa-pen"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => { delEverything(item.web) }}
                                                            className="text-pink-500 hover:text-pink-700 transition-colors"
                                                            title="Delete"
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="p-3 break-all">
                                                    <a
                                                        href={item.web}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:text-blue-700 hover:underline transition-colors"
                                                    >
                                                        {item.web.length > 20 ? `${item.web.substring(0, 20)}...` : item.web}
                                                    </a>
                                                </td>
                                                <td className="p-3 whitespace-nowrap">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <span className="truncate max-w-24 sm:max-w-full text-gray-700">{item.username}</span>
                                                        <button
                                                            onClick={() => { copytext(item.username) }}
                                                            className="text-purple-500 hover:text-purple-700 transition-colors"
                                                            title="Copy username"
                                                        >
                                                            <i className="fa-solid fa-copy"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="p-3 whitespace-nowrap">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <span className="truncate max-w-16 sm:max-w-full text-gray-700">
                                                            {showPassword[index] ? item.password : '••••••••'}
                                                        </span>
                                                        <button
                                                            onClick={() => { copytext(item.password) }}
                                                            className="text-purple-500 hover:text-purple-700 transition-colors"
                                                            title="Copy password"
                                                        >
                                                            <i className="fa-solid fa-copy"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => { togglePasswordVisibility(index) }}
                                                            className="text-pink-500 hover:text-pink-700 transition-colors"
                                                            title={showPassword[index] ? "Hide password" : "Show password"}
                                                        >
                                                            <i className={`fa-solid ${showPassword[index] ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                </div>


            </div>

            {/* footerrrrrrrrrrrrrr  */}

            <footer className="bg-[#472950] text-white py-4 mt-8">
                <div className="container mx-auto text-center">
                    {/* <h2 className="text-xl font-semibold"> EVOLVE </h2> */}
                    <p className="text-white">

                        <i className="fas fa-shield-alt mr-2"></i>
                        Your passwords are stored securely in your browser
                    </p>
                    <a href="#" className="hover:text-pink-400 transition mr-2">
                        <i className="fab fa-twitter text-lg"></i>
                    </a>
                    <a href="#" className="hover:text-pink-400 transition mr-2">
                        <i className="fab fa-github text-lg"></i>
                    </a>
                    <a href="#" className="hover:text-pink-400 transition">
                        <i className="fab fa-linkedin text-lg"></i>
                    </a>
                    <p className="text-xs mt-2 text-gray-400">
                        Made with <i className="fas fa-heart text-pink-500"></i> for your security
                    </p>
                </div>
            </footer>
        </>
    );
};

export default PasswordManager;