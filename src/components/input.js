import React from 'react';

const input = (props) => {
    const { label, error, name, onChange} = props
    const className = error ? 'from-control is-invalid ': 'form-control';
    return (
     <div className = "form-group">
        <label>{label}</label>
        <input className={className} name={name} onChange={onChange} />
        <div className="invalid-feedback">{props.error} </div>
     </div>
    );
}
export default input ;