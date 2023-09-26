import React from 'react';

function FormButtons({
  handleAddOne,
  handleSave,
  handleEdit,
  handleCancel,
  handleBack,
  handleDelete,
  
}) {

  return (
    <div>
      <button onClick={handleAddOne} >
        Add One
      </button>
      <button onClick={handleSave}>
       save
      </button>
      <button onClick={handleEdit}>
        Edit
      </button>
      <button onClick={handleCancel}>
        Cancel
      </button>
      <button onClick={handleBack} >
        Back
      </button>
      <button onClick={handleDelete}>
        Delete
      </button>

      <div style={{"float":"right"}}>
{/* 
      <button
        onClick={handleFirst}
        disabled={""}
      >
        &lt;&lt; First
      </button>
      <button
        onClick={handlePrevious}
        disabled={""}
      >
        &lt; Previous
      </button>
      <button
        onClick={handleNext}
        disabled={""}
      >
        Next &gt;
      </button>
      <button
        onClick={handleLast}
        disabled={""}
      >
        &gt;&gt; Last
      </button> */}
      </div>
    </div>
  );
}

export default FormButtons;


