import React from 'react';

const Loader = ({ size }) => {
    const classType = `loader ${size}`
    return <div className={classType}> </div>;
}

export default Loader;