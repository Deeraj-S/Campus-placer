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

const FormControl = () => {
    const [category,setCategory]=useState("")
    let nav = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.put("http://localhost:5000/api/category/insert",{ctitle:category})
        .then((res)=>{
            console.log(res)
            if(res.data.success){
                alert("category added")
                nav("/category")
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
                  <CFormLabel htmlFor="ctitle">Category Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="ctitle"
                    placeholder="Enter Category Title"
                    onChange={(e)=>setCategory(e.target.value)}
                    required
                  />
                </div> 
                <div className="mb-3">
                    <CButton type='submit' color='primary'>submit</CButton>
                </div>
              </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
