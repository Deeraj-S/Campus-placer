import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilPencil,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppHeaderDropdown = () => {
  const [admin, setAdmin] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    image: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newImage, setNewImage] = useState(null); // New state for the new image file
  const [change, setChange] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('id');
    console.log('Logged in user ID:', loggedInUserId);

    if (!loggedInUserId) {
      console.error('No user ID found in localStorage');
      return;
    }

    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/get/${loggedInUserId.replace(/"/g, '')}`);
        console.log('Admin details response:', response);

        if (response.data && response.data.admin) {
          const foundAdmin = response.data.admin;
          console.log('Found admin:', foundAdmin);
          setAdmin(foundAdmin);
          setFormData({
            name: foundAdmin.name,
            email: foundAdmin.email,
            phone: foundAdmin.phone,
            password: foundAdmin.password,
            image: foundAdmin.image,
          });
        } else {
          console.error('Admin details not found');
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminDetails();
  }, [change]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleEditClick = () => {
    setChange(true)
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewImage({ ...formData, [e.target.name]:e.target.files[0]});
  };

  const handleSaveChanges = () => {
    const updateAdmin = async () => {
      try {
        if (newImage) {
          setChange(true)
          const formData = new FormData();
          formData.append('image', newImage);

          // const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
          //   headers: {
          //     'Content-Type': 'multipart/form-data',
          //   },
          // });

          // setFormData({
          //   ...formData,
          //   image: uploadResponse.data.filename,
          // });
        }

        const response = await axios.put(`http://localhost:5000/api/admin/update/${admin._id}`, formData);
        console.log(response);
        setAdmin(response.data.admin);
        setModalVisible(false);
        setChange(false)
        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    };

    updateAdmin();
  };

  if (!admin) return null; // or a loading indicator

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          src={`http://localhost:5000/api/upload/${formData.image}`}
          alt="profile"
          style={{ borderRadius: '100%', objectFit: 'cover' }}
        />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={() => setModalVisible(true)}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CModal scrollable visible={modalVisible} onClose={() => { setModalVisible(false); setIsEditing(false); }}>
          <CModalHeader>
            <CModalTitle>Your Profile Information</CModalTitle>
            <CButton color="primary" className="ms-2" onClick={handleEditClick}>
              <CIcon icon={cilPencil} />
            </CButton>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="name">Admin Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="phone">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CFormInput
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="image">Profile Image</CFormLabel>
                <CFormInput
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Close
            </CButton>
            {isEditing && (
              <CButton color="primary" onClick={handleSaveChanges}>
                Save changes
              </CButton>
            )}
          </CModalFooter>
        </CModal>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
