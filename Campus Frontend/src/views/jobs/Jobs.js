import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCardImage,
  CCardTitle,
  CCardText,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import './style.css'

const Tables = ({ role }) => {
  const [jobs, setJobs] = useState([]);
  const [permission, setPermission] = useState([]);
  const [change, setChange] = useState(false)
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
    if (hasPermission('view-jobs')) {
      axios.get("http://localhost:5000/api/job/get")
        .then((res) => {
          console.log(res);
          setJobs(res.data.jobList);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [change, permission]);

  const hasPermission = (permissionId) => {
    return permission.includes(permissionId);
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Jobs</strong>
            {hasPermission('add-jobs') && <CButton color="info" onClick={() => navigate('/jobs/insert')}>Add new</CButton>}
          </CCardHeader>
          <CCardBody>
            {hasPermission('view-jobs') ? (

              <div className="card-grid">
                {jobs.map((item, index) => (
                  <CCard key={item._id} style={{ width: '18rem' }}>
                    <CCardImage orientation="top" style={{ height: "200px" }} src={`http://localhost:5000/api/upload/${item.cover_photo}`} />
                    <CCardBody>

                      <CCardTitle>{item.company_name}</CCardTitle>
                      <CCardText>
                        {item.job_title}
                      </CCardText>

                      <CCardText>
                        {item.salary}
                      </CCardText>

                      <CCardText>
                        {item.company_email}
                      </CCardText>

                      <CButton key={index + 1} color="primary" onClick={() => navigate(`/jobs/discription/${item._id}`)} >
                        Job Description
                      </CButton>
                    </CCardBody>
                  </CCard>
                ))}
              </div>
            ) : (
              <p>You do not have permission to view jobs.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Tables;



