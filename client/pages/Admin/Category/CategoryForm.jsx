import React, { useState } from "react";

const CategoryForm = (props) => {
    const intialName = props.name;
    const [name,setName] = useState(intialName);

    const handleSubmit = (e) => {
        // console.log("Submitted....");
        e.preventDefault();
        props.onSave(name);
    };

    return <>
        <form onSubmit={handleSubmit}>
            <div className="row g-3">
                <div className="col">
                    <input type="text" name="name" value={name} className="form-control" placeholder="Category Name like Mobiles,Laptops etc." aria-label="Category Name" onChange={(e)=>(setName(e.target.value))} />
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-outline-success">Save</button>
                </div>
            </div>
        </form>
    </>;
};

export default CategoryForm;