import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormControl = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  const availablePermissions = [
    { id: 'manage-users', name: 'Manage Users' },
    { id: 'view-dashboard', name: 'View Dashboard' },
    { id: 'add-roles', name: 'Add Roles' },
    { id: 'edit-roles', name: 'Edit Roles' },
    { id: 'view-reports', name: 'View Reports' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalPermissions =
      roleName.toLowerCase() === 'superuser'
        ? availablePermissions.map((perm) => perm.id) // Assign all permissions
        : permissions;

    axios
      .post('http://localhost:5000/api/roles/insert', {
        role_name: roleName,
        permissions: finalPermissions,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert('Role added successfully');
          navigate('/roles');
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setPermissions((prevPermissions) =>
      checked
        ? [...prevPermissions, value]
        : prevPermissions.filter((perm) => perm !== value)
    );
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Role with Permissions</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="role_name">Role Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="role_name"
                  placeholder="Enter Role Name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                />
              </div>
              {roleName.toLowerCase() !== 'superuser' && (
                <div className="mb-3">
                  <CFormLabel htmlFor="permissions">Permissions</CFormLabel>
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`permission_${permission.id}`}
                        value={permission.id}
                        onChange={handlePermissionChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`permission_${permission.id}`}
                      >
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {roleName.toLowerCase() === 'superuser' && (
                <div className="mb-3">
                  <p className="text-muted">
                    Superuser will have all permissions by default.
                  </p>
                </div>
              )}
              <div className="mb-3">
                <CButton type="submit" color="primary">
                  Submit
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default FormControl;
