import React, { useEffect, useState } from 'react'
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardImage,
    CCardText,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
    CCardTitle,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'


const JobsDescription = ({ role }) => {

    const EditJobModal = ({ item, setJobs }) => {
        const navigate = useNavigate();
        const [visible, setVisible] = useState(false);
        const [newJobs, setNewJobs] = useState(item);
        const [category, setCategory] = useState([]);
        const [change, setChange] = useState(false);

        useEffect(() => {
            axios.get("http://localhost:5000/api/category/get")
                .then((res) => {
                    setCategory(res.data.category);
                })
                .catch((err) => {
                    console.error(err);
                });
        }, []);

        const handleChange = (e) => {
            setNewJobs({ ...newJobs, [e.target.name]: e.target.value });
        };

        const handleChangeImage = (e) => {
            setNewJobs({ ...newJobs, [e.target.name]: e.target.files[0] });
        };

        const handleEdit = () => {
            setChange(true);
            const formData = new FormData();
            formData.append("company_name", newJobs.company_name);
            formData.append("job_title", newJobs.job_title);
            formData.append("job_role", newJobs.job_role);
            formData.append("category_id", newJobs.category_id);
            formData.append("job_discription", newJobs.job_discription);
            formData.append("salary", newJobs.salary);
            formData.append("shifts", newJobs.shifts);
            formData.append("experience", newJobs.experience);
            formData.append("last_date", newJobs.last_date);
            formData.append("cover_photo", newJobs.cover_photo);

            axios.put(`http://localhost:5000/api/job/update/${newJobs._id}`, formData)
                .then((res) => {
                    if (res.data.success) {
                        alert("Jobs updated successfully");
                        navigate("/jobs");

                        setVisible(false);
                        setJobs((prevJobs) => prevJobs.map((job) =>
                            job._id === newJobs._id ? newJobs : job
                        ));
                    } else {
                        alert(res.data.message);
                    }
                    setChange(false);
                })
                .catch((err) => {
                    alert(err.message);
                    setChange(false);
                });
        };

        return (
            <>
                <CButton color="primary" onClick={() => setVisible(!visible)}>
                    Edit
                </CButton>

                <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                        <CModalTitle>Edit Jobs</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <CForm encType='multipart/form-data'>
                            {/* Form fields */}
                            <div className="mb-3">
                                <CFormLabel htmlFor="company_name">Company Name</CFormLabel>
                                <CFormInput
                                    value={newJobs.company_name}
                                    type="text"
                                    name="company_name"
                                    id="company_name"
                                    placeholder="Edit Company Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="job_title">Job Title</CFormLabel>
                                <CFormInput
                                    value={newJobs.job_title}
                                    type="text"
                                    name="job_title"
                                    id="job_title"
                                    placeholder="Edit Job Title"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="job_role">Job Role</CFormLabel>
                                <CFormInput
                                    value={newJobs.job_role}
                                    type="text"
                                    name="job_role"
                                    id="job_role"
                                    placeholder="Edit Job Role"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="category_id">Job Category</CFormLabel>
                                <CFormSelect name='category_id' id="category_id" onChange={handleChange}>
                                    <option value="">Select category</option>
                                    {category.map((item) => (
                                        <option key={item._id} value={item._id}>{item.j_category}</option>
                                    ))}
                                </CFormSelect>
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="job_discription">Job Description</CFormLabel>
                                <CFormInput
                                    value={newJobs.job_discription}
                                    type="text"
                                    name="job_discription"
                                    id="job_discription"
                                    placeholder="Edit Job Description"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="salary">Salary</CFormLabel>
                                <CFormInput
                                    value={newJobs.salary}
                                    type="text"
                                    name="salary"
                                    id="salary"
                                    placeholder="Edit Salary"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="shifts">Working Time</CFormLabel>
                                <CFormInput
                                    value={newJobs.shifts}
                                    type="text"
                                    name="shifts"
                                    id="shifts"
                                    placeholder="Edit Working time (Shifts)"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="experience">Experience</CFormLabel>
                                <CFormInput
                                    value={newJobs.experience}
                                    type="text"
                                    name="experience"
                                    id="experience"
                                    placeholder="Edit Experience"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="last_date">Last Date</CFormLabel>
                                <CFormInput
                                    value={newJobs.last_date}
                                    type="text"
                                    name="last_date"
                                    id="last_date"
                                    placeholder="Edit Last Date"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="cover_photo">Cover Photo</CFormLabel>
                                <CFormInput
                                    type="file"
                                    name='cover_photo'
                                    id="cover_photo"
                                    placeholder="Edit photo"
                                    onChange={handleChangeImage}
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

    const DeleteJobModal = ({ item, setJobs }) => {
        const navigate = useNavigate();
        const handleDelete = (id) => {
            if (window.confirm("Are you sure you want to delete this?")) {
                axios.delete(`http://localhost:5000/api/job/delete/${id}`)
                    .then((res) => {
                        if (res.data.success) {
                            alert("Deleted successfully");
                            navigate("/jobs");
                            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
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
            <CButton style={{ marginLeft: "10px" }} color="danger" onClick={() => handleDelete(item._id)}>
                Delete
            </CButton>
        );
    };

    const { id } = useParams();
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/job/get/${id}`)
            .then((res) => {
                setJobs(res.data.jobList);
                console.log(res.data.jobList);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    if (!jobs) {
        return <h1>Loading...</h1>;
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Job Description</strong>
                    </CCardHeader>
                    <CCardBody>
                        <br />
                        <CCardImage orientation="top" style={{ height: "200px", width: "200px" }} src={`http://localhost:5000/api/upload/${jobs.cover_photo}`} />
                        <br />
                        <br />
                        <CCardText>
                            <strong>Company Name:</strong> {jobs.company_name}
                        </CCardText>
                        <CCardTitle>

                        </CCardTitle>
                        <CCardText>
                            <strong>Job Title:</strong> {jobs.job_title}
                        </CCardText>
                        <CCardText>
                            <strong>Job Role:</strong> {jobs.job_role}
                        </CCardText>
                        <CCardText>
                            <strong>Category:</strong> {jobs.category_id.j_category}
                        </CCardText>
                        <CCardText>
                            <strong>Job Description:</strong> {jobs.job_discription}
                        </CCardText>
                        <CCardText>
                            <strong>Salary:</strong> {jobs.salary}
                        </CCardText>
                        <CCardText>
                            <strong>Experience:</strong> {jobs.experience} Years
                        </CCardText>
                        <CCardText>
                            <strong>Last Date to Apply:</strong> {jobs.last_date}
                        </CCardText>
                        <CCardText>
                            <strong>Working Time (Shift):</strong> {jobs.shifts}
                        </CCardText>
                        <div>
                            {role == "placement_officer" && <EditJobModal item={jobs} setJobs={setJobs} />}
                            {role == "placement_officer" && <DeleteJobModal item={jobs} setJobs={setJobs} />}
                            {role == "" && <CButton className="custom-blue-button">Apply Now</CButton>}
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

export default JobsDescription;