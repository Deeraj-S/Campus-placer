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
  CFormSelect,
  CFormLabel
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';

const Tables = () => {
  const [student, setStudent] = useState([]);
  const [change, setChange] = useState(false);
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
    if (hasPermission('view-students')) {
      axios.get("http://localhost:5000/api/student/get")
        .then((res) => {
          setStudent(res.data.student);
        })
        .catch((err) => {
          console.error("Error fetching students:", err);
        });
    }
  }, [permission]);

  const hasPermission = (permissionId) => {
    return permission.includes(permissionId);
  };


  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false);
    const [newStudent, setNewStudent] = useState(item);

    const handleChange = (e) => {
      setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    };

    const handleChangeImage = (e) => {
      setNewStudent({ ...newStudent, [e.target.name]: e.target.files[0] });
    };

    const handleEdit = () => {
      setChange(true);
      const formData = new FormData();
      formData.append("s_name", newStudent.s_name);
      formData.append("s_email", newStudent.s_email);
      formData.append("s_phone", newStudent.s_phone);
      formData.append("role_id", newStudent.role_id);
      formData.append("register_no", newStudent.register_no);
      formData.append("branch_id", newStudent.branch_id);
      formData.append("s_photo", newStudent.s_photo);
      formData.append("s_resume", newStudent.s_resume);

      axios.put(`http://localhost:5000/api/student/update/${newStudent._id}`, formData)
        .then((res) => {
          if (res.data.success) {
            alert("Student updated successfully");
            setVisible(false);
            setStudent(prevStudent => prevStudent.map(student =>
              student._id === newStudent._id ? newStudent : student
            ));
            setChange(false);
          } else {
            alert(res.data.message);
            setChange(false);
          }
        })
        .catch((err) => {
          alert(err.message);
          setChange(false);
        });
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

    const [branch, setBranch] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:5000/api/branch/get")
        .then((res) => {
          setBranch(res.data.branch);
        })
        .catch((err) => {
          console.error(err);
        });
    }, [change]);


    return (
      <>{hasPermission('edit-students') &&
        <CButton color="primary" onClick={() => setVisible(!visible)}>
          Edit
        </CButton>
      }
        <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Edit Student</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="s_name">Student Name</CFormLabel>
                <CFormInput
                  value={newStudent.s_name}
                  type="text"
                  name="s_name"
                  id="s_name"
                  placeholder="Edit name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="s_phone">Phone</CFormLabel>
                <CFormInput
                  value={newStudent.s_phone}
                  type="text"
                  name="s_phone"
                  id="s_phone"
                  placeholder="Edit phone"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="s_email">Email</CFormLabel>
                <CFormInput
                  value={newStudent.s_email}
                  type="email"
                  name="s_email"
                  id="s_email"
                  placeholder="Edit email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="role_id">Role</CFormLabel>
                <CFormSelect name='role_id' id="role_id" onChange={handleChange} >
                  <option value="">Select Role</option>
                  {roles.map((item) => {
                    return (
                      <option value={item._id}>{item.role_name}</option>
                    )
                  })}
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="register_no">Register No</CFormLabel>
                <CFormInput
                  value={newStudent.register_no}
                  type="text"
                  name="register_no"
                  id="register_no"
                  placeholder="Edit Reg No"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="branch_id">Branch</CFormLabel>
                <CFormSelect name='branch_id' id="branch_id" onChange={handleChange}>
                  <option value="">Select branch</option>
                  {branch.map((item) => (
                    <option key={item._id} value={item._id}>{item.branch_name}</option>
                  ))}
                </CFormSelect>
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="s_photo">Profile Photo</CFormLabel>
                <CFormInput
                  type="file"
                  name='s_photo'
                  id="s_photo"
                  placeholder="Edit Photo"
                  onChange={handleChangeImage}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="s_resume">Resume</CFormLabel>
                <CFormInput
                  type="file"
                  name='s_resume'
                  id="s_resume"
                  placeholder="Edit Resume"
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
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios.delete(`http://localhost:5000/api/student/delete/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("Deleted successfully");
            setStudent(prevStudent => prevStudent.filter(student => student._id !== id));
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
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Students</strong>
            {hasPermission('add-students') && (
              <CButton color="info" onClick={() => navigate('/student/insert')}>Add new Student</CButton>
            )}
          </CCardHeader>
          <CCardBody>
            {hasPermission('view-students') ? (
              <CTable responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">SI.NO</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Student Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Reg No</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Resume</CTableHeaderCell>

                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {student.map((item, index) => (
                    <CTableRow key={item._id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.s_name}</CTableDataCell>
                      <CTableDataCell>{item.s_phone}</CTableDataCell>
                      <CTableDataCell>{item.s_email}</CTableDataCell>
                      <CTableDataCell>{item.role_id.role_name}</CTableDataCell>
                      <CTableDataCell>{item.register_no}</CTableDataCell>
                      <CTableDataCell>{item.branch_id.branch_name}</CTableDataCell>
                      <CTableDataCell><img style={{ height: "50px", width: "50px", objectFit: "cover" }} src={`http://localhost:5000/api/upload/photo/${item.s_photo}`} alt="Student" /></CTableDataCell>
                      <CTableDataCell><a href={`http://localhost:5000/api/upload/resume/${item.s_resume}`} target="_blank" rel="noopener noreferrer">Resume</a></CTableDataCell>
                      <CTableDataCell>
                        {hasPermission('edit-students') && (
                          <Edit item={item} />
                        )}
                        {hasPermission('delete-students') && (
                          <CButton color="danger" onClick={() => handleDelete(item._id)}>Delete</CButton>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            ) : (
              <p>You do not have permission to view students.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Tables;
