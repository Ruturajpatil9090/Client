import React from 'react';

function FormButtons({
  isAdding,
  isEditing,
  isEditSaveMode,
  handleAddOne,
  handleSaveOrUpdate,
  handleEdit,
  handleCancel,
  handleBack,
  handleDelete,
  handleFirst,
  handlePrevious,
  handleNext,
  handleLast,
  
}) {
//   const disableNavButtons = recordData.length < 2;

  return (
    <div>
      <button onClick={handleAddOne} disabled={isAdding || isEditing}>
        Add One
      </button>
      <button onClick={handleSaveOrUpdate} disabled={!isAdding && !isEditing}>
        {!isEditing || !isEditSaveMode ? 'Save' : 'Update'}
      </button>
      <button onClick={handleEdit} disabled={isAdding || isEditing}>
        Edit
      </button>
      <button onClick={handleCancel} disabled={!isAdding && !isEditing}>
        Cancel
      </button>
      <button onClick={handleBack} disabled={isAdding || isEditing}>
        Back
      </button>
      <button onClick={handleDelete} disabled={isAdding || isEditing}>
        Delete
      </button>

      <div style={{"float":"right"}}>

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
      </button>
      </div>
    </div>
  );
}

export default FormButtons;


