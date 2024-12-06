import React from 'react';
import { Link } from 'react-router-dom';

const AddButton = ({text,path}) => {
    console.log(`${text} ${path}`)
    return (
        <div className="col-lg-2 text-md-end text-center">
          <Link to={`/${path}/add`} className="btn btn-primary w-100" >
            Add {text}
          </Link>
        </div>
    );
};

export default AddButton;
