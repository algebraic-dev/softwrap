import React from 'react';
import Button from 'react-bootstrap/Button';

function GridHeader() {
  return (
    <div className="d-flex bd-highlight m-5">
      <h2 className="p-2 flex-grow-1 ">Users</h2>
      <div className="p-2">
        <Button>Add New User</Button>
      </div>
    </div>
  );
}

export default GridHeader;
