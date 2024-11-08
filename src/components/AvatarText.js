import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ name, inputSize, color }) => {
    const sizeStyles = {
        sm: {
            width: '25px',
            height: '25px',
            fontSize: '12px',
        },
        md: {
            width: '30px',
            height: '30px',
            fontSize: '15px',
        },
        lg: {
            width: '40px',
            height: '40px',
            fontSize: '20px',
        },
    };

    const appliedSize = sizeStyles[inputSize] || sizeStyles.sm;

    const styles = {
        ...appliedSize,
        borderRadius: '50%',
        backgroundColor: color,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '500',
        marginRight: '5px'
    };

    const getInitials = (fullName) => {
        if (!fullName) return '';
        const initials = fullName
            .split(' ')
            .map(word => word[0]?.toUpperCase())
            .join('');
        return initials.slice(0, 2);
    };

    return (
      <div style={styles}>
        {getInitials(name)}
      </div>
    );
};

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    inputSize: PropTypes.oneOf(['sm', 'md', 'lg']),
    color: PropTypes.string
};

Avatar.defaultProps = {
    inputSize: 'sm', 
    color: '#4CAF50'
};

export default Avatar;
