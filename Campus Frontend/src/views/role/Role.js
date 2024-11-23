import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Adjust the endpoint for roles and permissions
    axios.get('http://localhost:5000/api/roles/get')
      .then((res) => {
        setRoles(res.data.roles);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false);
    const [newRole, setNewRole] = useState(item);

    const handleChange = (e) => {
      setNewRole({ ...newRole, [e.target.name]: e.target.value });
    };

    const handlePermissionChange = (e) => {
      const { value, checked } = e.target;
      setNewRole({
        ...newRole,
        permissions: checked
          ? [...newRole.permissions, value]
          : newRole.permissions.filter((perm) => perm !== value),
      });
    };

    const handleEdit = () => {
      axios.put(`http://localhost:5000/api/roles/update/${newRole._id}`, newRole)
        .then((res) => {
          if (res.data.success) {
            alert('Role updated successfully');
            setVisible(false);
            setRoles((prevRoles) => prevRoles.map((role) =>
              role._id === newRole._id ? newRole : role
            ));
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    return (
      <>
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Edit Role</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="role_name">Role Name</CFormLabel>
                <CFormInput
                  value={newRole.role_name}
                  type="text"
                  name="role_name"
                  id="role_name"
                  placeholder="Edit role name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Permissions</CFormLabel>
                {['manage-users', 'view-dashboard', 'add-roles', 'edit-roles', 'view-reports'].map((permission) => (
                  <div key={permission} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={permission}
                      checked={newRole.permissions.includes(permission)}
                      onChange={handlePermissionChange}
                    />
                    <label className="form-check-label">{permission}</label>
                  </div>
                ))}
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="primary" onClick={handleEdit}>Save changes</CButton>
          </CModalFooter>
        </CModal>
      </>
    );
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      axios.delete(`http://localhost:5000/api/roles/delete/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert('Role deleted successfully');
            setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Roles</strong>
            <CButton color="info" onClick={() => navigate('/role/insert')}>Add New Role</CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">SI.NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Role Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Permissions</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {roles.map((item, index) => (
                  <CTableRow key={item._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.role_name}</CTableDataCell>
                    <CTableDataCell>{item.permissions.join(', ')}</CTableDataCell>
                    <CTableDataCell>
                      <Edit item={item} />
                      <CButton color="danger" onClick={() => handleDelete(item._id)}>Delete</CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Tables;
