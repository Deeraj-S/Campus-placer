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
} from '@coreui/react'
import { useNavigate } from 'react-router-dom';
//import { DocsExample } from 'src/components'

const Tables = () => {

    const [category,setCategory] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000/api/category/get",{category})
        .then((res)=>{
            console.log(res)
            setCategory(res.data.category)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    let nav = useNavigate()
    const Edit = ({item}) => {
        const [visible, setVisible] = useState(false)
        const [newCategory,setNewCategory] = useState(item)
        const handleChange=(e)=> setNewCategory({...newCategory,[e.target.name]:e.target.value})

        const handleEdit=()=>{
            axios.put("http://localhost:5000/api/category/update")
            .then((res)=>{
                if(res.data.success){
                    alert("category added successfully")
                    setVisible(false)
                }else{
                    alert(res.data.message)
                    
                }
                setVisible(false)
            })
            .catch((err)=>{
                alert(err.message)
                setVisible(false)
            })
        }
        return (
          <>
            <CButton color="primary" onClick={() => setVisible(!visible)}>
              Edit
            </CButton>
            <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
              <CModalHeader>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <CForm >
                <div className="mb-3">
                  <CFormLabel htmlFor="title">Category Title</CFormLabel>
                  <CFormInput
                    value={newCategory.ctitle}
                    type="text"
                    name='name'
                    id="ctitle"
                    placeholder="Enter Category Title"
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
        )
      }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Category</strong> 
            <strong>
            <CButton color='info' onClick={()=>nav('/category/insert')}>Insert</CButton>
            </strong>          
          </CCardHeader>
          <CCardBody>
            
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">SI.NO</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                {category.map((item,index)=>{
                    return(
                        <CTableRow>
                        <CTableHeaderCell scope="row">{++index}</CTableHeaderCell>
                        <CTableDataCell>{item.ctitle}</CTableDataCell>
                        <CTableDataCell>{item.date}</CTableDataCell>
                        <CTableDataCell>{item.status}</CTableDataCell>

                        <CTableDataCell>
                            <Edit item={item}/>
                        </CTableDataCell>
                        <CTableDataCell>  
                            <CButton  onClick color='danger'>Delete</CButton>
                        </CTableDataCell>

                        </CTableRow>
                    )
                })}
                  
                </CTableBody>
              </CTable>
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables

