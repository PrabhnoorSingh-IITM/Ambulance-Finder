import React from 'react';

const Button = ({ children, onClick, className = '', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 text-lg shadow-lg ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
