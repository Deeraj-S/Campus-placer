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
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const [change, setChange] = useState(false)
  const [placement_officer, setPlacement_officer] = useState([]);
  const [permission, setPermission] = useState([]);
  const navigate = useNavigate();


  const roleId = localStorage.getItem('role_id').replace(/['"]+/g, '');

  useEffect(() => {

    axios.get(`http://localhost:5000/api/roles/get/${roleId}`)
      .then((res) => {
        const roleData = res.data.role;
        const rolePermissions = res.data.role.permissions

        if (roleData) {
          setPermission(rolePermissions);
        } else {
          console.warn('No role data found for the given role ID.');
        }
      })
      .catch((err) => {
        console.error('Error fetching role data:', err);
      });

  }, [roleId]);



  useEffect(() => {
    if (hasPermission('view-placement-officer')) {
      axios.get("http://localhost:5000/api/placement/get")
        .then((res) => {
          console.log(res)
          setPlacement_officer(res.data.placement_officer);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [change, permission]);

  const hasPermission = (permissionId) => {
    return permission.includes(permissionId);
  };

  const [roles, setRoles] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/roles/get")
      .then((res) => {
        setRoles(res.data.roles);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false);
    const [newPlacement_officer, setNewPlacement_officer] = useState(item);

    const handleChange = (e) => {
      setNewPlacement_officer({ ...newPlacement_officer, [e.target.name]: e.target.value });
    };

    const handleChangeImage = (e) => {
      setNewPlacement_officer({ ...newPlacement_officer, [e.target.name]: e.target.files[0] })
    }
    console.log(newPlacement_officer)



    const handleEdit = () => {
      setChange(true)
      const formData = new FormData()
      formData.append("p_name", newPlacement_officer.p_name)
      formData.append("p_phone", newPlacement_officer.p_phone)
      formData.append("p_email", newPlacement_officer.p_email)
      formData.append("role_id", newPlacement_officer.role_id)
      formData.append("p_photo", newPlacement_officer.p_photo)
      axios.put(`http://localhost:5000/api/placement/update/${newPlacement_officer._id}`, formData)
        .then((res) => {
          if (res.data.success) {
            alert(" updated successfully");
            setVisible(false);
            setPlacement_officer((prevOfficer) => prevOfficer.map((officer) =>
              officer._id === newPlacement_officer._id ? newPlacement_officer : officer
            ));
            setChange(false)
          } else {
            alert(res.data.message);
            setChange(false)
          }
        })
        .catch((err) => {
          alert(err.message);
          setChange(false)
        });
    };

    return (
      <>{hasPermission('edit-placement-officer') &&
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
      }
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Edit Placement Officer</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm encType='multipart/form-data'>




              <div className="mb-3">
                <CFormLabel htmlFor="p_name">Placement Officer Name</CFormLabel>
                <CFormInput
                  value={newPlacement_officer.p_name}
                  type="text"
                  name='p_name'
                  id="p_name"
                  placeholder="Edit  name"
                  onChange={handleChange}
                  required
                />
                <CFormLabel htmlFor="p_phone">Phone</CFormLabel>
                <CFormInput
                  value={newPlacement_officer.p_phone}
                  type="text"
                  name='p_phone'
                  id="p_phone"
                  placeholder="Edit  phone"
                  onChange={handleChange}
                  required
                />

                <CFormLabel htmlFor="p_email">Email</CFormLabel>
                <CFormInput
                  value={newPlacement_officer.p_email}
                  type="text"
                  name='p_email'
                  id="p_email"
                  placeholder="Edit  email"
                  onChange={handleChange}
                  required
                />



                <CFormLabel htmlFor="role_id">Role</CFormLabel>
                <CFormSelect name='role_id' id="role_id" onChange={handleChange} >
                  <option value="">Select Role</option>
                  {roles.map((item) => {
                    return (
                      <option value={item._id}>{item.role_name}</option>
                    )
                  })}
                </CFormSelect>


                <CFormLabel htmlFor="p_photo">Profile Photo</CFormLabel>
                <CFormInput

                  type="file"
                  name='p_photo'
                  id="p_photo"
                  placeholder="Edit photo"
                  onChange={handleChangeImage}
                  required
                />
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
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`http://localhost:5000/api/placement/delete/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("Deleted successfully");
            setPlacement_officer((prevOfficer) => prevOfficer.filter((officer) => officer._id !== id));
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
            <strong>Placement Officer</strong>
            {hasPermission('add-placement-officer') && (
              <CButton color="info" onClick={() => navigate('/placement/insert')}>Add new PO</CButton>
            )}
          </CCardHeader>
          <CCardBody>
            {hasPermission('view-placement-officer') ? (
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">SI.NO</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Officer Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {placement_officer.map((item, index) => (
                    <CTableRow key={item._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.p_name}</CTableDataCell>
                      <CTableDataCell>{item.p_email}</CTableDataCell>
                      <CTableDataCell>{item.p_phone}</CTableDataCell>
                      <CTableDataCell>{item.role_id.role_name}</CTableDataCell>
                      <CTableDataCell><img style={{ height: "100px", width: "100px" }} alt='' src={`http://localhost:5000/api/upload/${item.p_photo}`} /></CTableDataCell>
                      <CTableDataCell>
                        {hasPermission('edit-placement-officer') && (
                          <Edit item={item} />
                        )}
                        {hasPermission('delete-placement-officer') && (
                          <CButton color="danger" onClick={() => handleDelete(item._id)}>Delete</CButton>)}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <p>You do not have permission to view placement-officer.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Tables;
