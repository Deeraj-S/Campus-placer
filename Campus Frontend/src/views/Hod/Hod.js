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
  const [hod, setHod] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/hod/get")
      .then((res) => {
        console.log(res)
        setHod(res.data.hod);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const Edit = ({ item }) => {
    const [visible, setVisible] = useState(false);
    const [newHod, setnewHod] = useState(item);

    const handleChange = (e) => {
      setnewHod({ ...newHod, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
      axios.put(`http://localhost:5000/api/hod/update/${newHod._id}`, newHod)
        .then((res) => {
          if (res.data.success) {
            alert(" updated successfully");
            setVisible(false);
            setHod((prevHod) => prevHod.map((hod) =>
              hod._id === newHod._id ? newHod : hod
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
            <CModalTitle>Edit Hod</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="h_name">Hod Name</CFormLabel>
                <CFormInput
                  value={newHod.h_name}
                  type="text"
                  name='h_name'
                  id="h_name"
                  placeholder="Edit  name"
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
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`http://localhost:5000/api/hod/delete/${id}`)
        .then((res) => {
          if (res.data.success) {
            alert("Deleted successfully");
            setHod((prevHod) => prevHod.filter((hod) => hod._id !== id));
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
            <strong>HOD</strong>
            <CButton color="info" onClick={() => navigate('/hod/insert')}>Add new </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">SI.NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col">HOD Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {hod.map((item, index) => (
                  <CTableRow key={item._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.h_name}</CTableDataCell>
                    <CTableDataCell>{item.h_email}</CTableDataCell>
                    <CTableDataCell>{item.h_phone}</CTableDataCell>
                    <CTableDataCell>{item.h_address}</CTableDataCell>
                    <CTableDataCell>{item.branch_id.branch_name}</CTableDataCell>
                    <CTableDataCell><img style={{height:"100px",width:"100px"}} alt='' src={`http://localhost:5000/api/upload/${item.h_photo}`}/></CTableDataCell>
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
