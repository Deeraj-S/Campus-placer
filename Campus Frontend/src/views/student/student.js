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

const Tables = (role) => {
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/student/get")
      .then((res) => {
        setStudent(res.data.student);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);





  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Students</strong>
            {role=="hod" && <CButton >Add Student </CButton>}
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">SI.NO</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Student Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Address</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Registe No</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Branch Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">HOD Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Photo</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Resume</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {student.map((item, index) => (
                  <CTableRow key={item._id}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.s_name}</CTableDataCell>
                    <CTableDataCell>{item.s_email}</CTableDataCell>
                    <CTableDataCell>{item.s_phone}</CTableDataCell>
                    <CTableDataCell>{item.s_address}</CTableDataCell>
                    <CTableDataCell>{item.register_no}</CTableDataCell>
                    <CTableDataCell>{item.branch_id.branch_name}</CTableDataCell>
                    <CTableDataCell>{item.hod_id.h_name}</CTableDataCell>
                    <CTableDataCell><img style={{ height: "100px", width: "100px" }} alt='' src={`http://localhost:5000/api/upload/photo/${item.s_photo}`} /></CTableDataCell>
                    <CTableDataCell>{item.s_resume}</CTableDataCell>
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
