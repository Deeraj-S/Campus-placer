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
  CFormSelect,
} from '@coreui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormControl = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([])
  const navigate = useNavigate();

  const availablePermissions = [
    { id: 'manage-users', name: 'Manage Users' },
    { id: 'view-dashboard', name: 'View Dashboard' },
    { id: 'view-students', name: 'View Students' },
    { id: 'add-students', name: 'Add Students' },
    { id: 'edit-students', name: 'Edit Students' },
    { id: 'delete-students', name: 'Delete Students' },
    { id: 'view-branch', name: 'View Branch' },
    { id: 'add-branch', name: 'Add Branch' },
    { id: 'edit-branch', name: 'Edit Branch' },
    { id: 'delete-branch', name: 'Delete Branch' },
    { id: 'view-placement-officer', name: 'View Placement Officer' },
    { id: 'add-placement-officer', name: 'Add Placement Officer' },
    { id: 'edit-placement-officer', name: 'Edit Placement Officer' },
    { id: 'delete-placement-officer', name: 'Placement Officer' },
    { id: 'view-job-category', name: 'View Job Category' },
    { id: 'add-job-category', name: 'Add Job Category' },
    { id: 'edit-job-category', name: 'Edit Job Category' },
    { id: 'delete-job-category', name: 'Delete Job Category' },
    { id: 'view-jobs', name: 'View Job' },
    { id: 'add-jobs', name: 'Add Job' },
    { id: 'edit-jobs', name: 'Edit Job' },
    { id: 'delete-jobs', name: 'Delete Job' },
    { id: 'apply-jobs', name: 'Apply Job' },

  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Always send the selected permissions, no need for superuser logic
    const finalPermissions = permissions;
    console.log(finalPermissions)
    axios
      .post('http://localhost:5000/api/roles/insert', {
        role_name: roleName,
        permissions: finalPermissions,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert('Role added successfully');
          navigate('/role');
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePermissionChange = (e) => {
    const value = e.target.value;

    // Debug: Log the current value being toggled
    console.log('Toggling permission:', value);

    setPermissions((prevPermissions) => {
      if (prevPermissions.includes(value)) {
        return prevPermissions.filter((permission) => permission !== value); // Remove if already selected
      } else {
        return [...prevPermissions, value]; // Add if not selected
      }
    });
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
                <CFormSelect
                  id="role_name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="placement_officer">Placement Officer</option>
                  <option value="student">Student</option>
                  <option value="other">Other</option>
                </CFormSelect>
              </div>

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
