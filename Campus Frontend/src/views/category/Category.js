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
  const [category, setCategory] = useState([]);
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
    if (hasPermission('view-job-category')) {
      axios.get("http://localhost:5000/api/category/get")
        .then((res) => {
          setCategory(res.data.category);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [permission]);

  const hasPermission = (permissionId) => {
    return permission.includes(permissionId);
  };

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false);
    const [newCategory, setNewCategory] = useState(item);

    const handleChange = (e) => {
      setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
      axios.put(`http://localhost:5000/api/category/update/${newCategory._id}`, newCategory)
        .then((res) => {
          if (res.data.success) {
            alert("Job category updated successfully");
            setVisible(false);
            setCategory((prevCategory) => prevCategory.map((category) =>
              category._id === newCategory._id ? newCategory : category
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
      <>{hasPermission('edit-job-category') &&
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
      }
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Edit Category</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="j_category">Category Name</CFormLabel>
                <CFormInput
                  value={newCategory.j_category}
                  type="text"
                  name='j_category'
                  id="j_category"
                  placeholder="Edit category name"
                  onChange={handleChange}
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
    if (window.confirm("Are you sure you want to delete this job category?")) {
      axios.delete(`http://localhost:5000/api/category/delete/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("Job category deleted successfully");
            setCategory((prevCategory) => prevCategory.filter((category) => category._id !== id));
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
            <strong>Job Category</strong>
            {hasPermission('add-job-category') && (
              <CButton color="info" onClick={() => navigate('/category/insert')}>Add new job category</CButton>
            )}
          </CCardHeader>
          <CCardBody>
            {hasPermission('view-job-category') ? (
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">SI.NO</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Job Category Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {category.map((item, index) => (
                    <CTableRow key={item._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.j_category}</CTableDataCell>
                      <CTableDataCell>{item.j_date}</CTableDataCell>
                      <CTableDataCell>{item.j_status}</CTableDataCell>
                      <CTableDataCell>
                        {hasPermission('edit-job-category') && (
                          <Edit item={item} />)}
                        {hasPermission('delete-job-category') && (
                          <CButton color="danger" onClick={() => handleDelete(item._id)}>Delete</CButton>)}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <p>You do not have permission to view job category.</p>
            )}
          </CCardBody>

        </CCard>
      </CCol>
    </CRow>
  );
};

export default Tables;
