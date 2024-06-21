import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import axios from 'axios'
//import { DocsExample } from 'src/components'
import { useNavigate } from 'react-router-dom';

const FC = () => {
    const [hod,setHod]=useState("")
    let nav = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/api/hod/insert",hod)
        .then((res)=>{
            console.log(res)
            if(res.data.success){
                alert("HOD added")
                nav("/hod")
            }else{
                alert(res.data.message)
            }
        })
        .catch((err)=>{
            console.log(err,22222)
        })
    }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Insert Form</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="h_name">HOD Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="h_name"
                 
                  placeholder="Enter name"
                  onChange={(e)=>setHod(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_phone">HOD Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="h_phone"
                 
                  placeholder="Enter phone"
                  onChange={(e)=>setHod(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_email">HOD Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="h_email"
              
                  placeholder="Enter email"
                  onChange={(e)=>setHod(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_password">HOD Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="h_password"
                  
                  placeholder="Enter password"
                  onChange={(e)=>setHod(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_address">HOD Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="h_address"
                 
                  placeholder="Enter address"
                  onChange={(e)=>setHod(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="branch_id">Branch</CFormLabel>
                <CFormSelect id="branch_id"    onChange={(e)=>setHod(e.target.value)} >
                  <option value="">Select branch</option>
                  <option value="1">Computer Science</option>
                  <option value="2">Electrical Engineering</option>
                  <option value="3">Mechanical Engineering</option>
                  <option value="4">Civil Engineering</option>
                  <option value="5">Chemical Engineering</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="h_photo">HOD Photo</CFormLabel>
                <CFormInput
                  type="file"
                  id="h_photo"
                  onChange={(e)=>setHod(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <CButton type="submit" color="primary">Submit</CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FC
