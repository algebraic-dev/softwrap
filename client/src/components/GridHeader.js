import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import UserAddModal from './UserAddModal';

function GridHeader() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="d-flex bd-highlight m-5">
        <h2 className="p-2 flex-grow-1">Users</h2>
        <div className="p-2">
          <Button onClick={() => setShow(true)}>Add New User</Button>
        </div>
      </div>
      <UserAddModal state={show} setState={setShow} />
    </>
  );
}

export default GridHeader;
