// components/EditCourse.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Row, Col, Spinner } from 'react-bootstrap';
import base_url from '../services/base_url';
import { updateCourseApi } from '../services/api';
import { toast } from 'react-toastify';
import { courseResponseContext } from '../context/ContextApi';

function EditCourse({ course }) {
  const [show, setShow] = useState(false);
  const [courseData, setCourseData] = useState({ title: "", description: "", instructor: "", instructorPhone: "", date: "", price: "", image: "" });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCourseResponse } = useContext(courseResponseContext);

  useEffect(() => {
    setCourseData({
      ...course,
      image: "",
      date: course.date ? new Date(course.date).toISOString().split('T')[0] : "" // Format date for input
    });
    setPreview(course.image ? `${base_url}/uploads/${course.image}` : "");
    return () => {
      if (preview && courseData.image?.type) URL.revokeObjectURL(preview);
    };
  }, [course]);

  useEffect(() => {
    if (courseData.image && courseData.image.type) {
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(courseData.image.type)) {
        toast.warning("Only JPG, JPEG, or PNG images allowed");
        setCourseData({ ...courseData, image: "" });
        setPreview("");
      } else if (courseData.image.size > 5 * 1024 * 1024) {
        toast.warning("Image size must be under 5MB");
        setCourseData({ ...courseData, image: "" });
        setPreview("");
      } else {
        const url = URL.createObjectURL(courseData.image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [courseData.image]);

  const handleEdit = async () => {
    const { title, description, instructor, instructorPhone, date, price, image } = courseData;
    if (!title || !description || !instructor || !instructorPhone || !date || !price) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      toast.warning("Price must be a positive number");
      return;
    }
    if (!/^\d{10}$/.test(instructorPhone)) {
      toast.warning("Instructor phone must be a 10-digit number");
      return;
    }
    if (JSON.stringify(courseData) === JSON.stringify({ ...course, image: "", date: course.date ? new Date(course.date).toISOString().split('T')[0] : "" })) {
      toast.info("No changes detected");
      return;
    }
    if (window.confirm("Are you sure you want to update this course?")) {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("instructor", instructor);
      formData.append("instructorPhone", instructorPhone);
      formData.append("date", date); // Added date
      formData.append("price", price);
      if (image && image.type) formData.append("image", image);

      try {
        const result = await updateCourseApi(course._id, formData);
        if (result.status === 200) {
          toast.success("Course updated successfully");
          setCourseResponse(result);
          handleClose();
        } else {
          toast.error(result.data?.message || "Update failed");
        }
      } catch (error) {
        toast.error(!error.response ? "Network error occurred" : error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setPreview(course.image ? `${base_url}/uploads/${course.image}` : "");
  };

  return (
    <>
      <button className="btn" onClick={() => setShow(true)} aria-label="Edit course">
        <i className="fa-solid fa-pen-to-square fa-lg text-warning"></i>
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <Row>
            <Col>
              <label htmlFor="imageInput">
                <input
                  type="file"
                  onChange={(e) => setCourseData({ ...courseData, image: e.target.files[0] })}
                  className="form-control"
                  id="imageInput"
                  style={{ display: 'none' }}
                  accept="image/jpeg,image/png,image/jpg"
                  aria-label="Upload new course image"
                />
                <img
                  src={preview || `${base_url}/uploads/${course.image}`}
                  alt="Course preview"
                  className="img-fluid my-3"
                />
              </label>
            </Col>
            <Col>
              <input
                type="text"
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                className="form-control mb-3"
                placeholder="Title"
                aria-label="Course title"
                required
              />
              <input
                type="text"
                value={courseData.description}
                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                className="form-control mb-3"
                placeholder="Description"
                aria-label="Course description"
                required
              />
              <input
                type="text"
                value={courseData.instructor}
                onChange={(e) => setCourseData({ ...courseData, instructor: e.target.value })}
                className="form-control mb-3"
                placeholder="Instructor"
                aria-label="Course instructor"
                required
              />
              <input
                type="text"
                value={courseData.instructorPhone}
                onChange={(e) => setCourseData({ ...courseData, instructorPhone: e.target.value })}
                className="form-control mb-3"
                placeholder="Instructor Phone (10 digits)"
                aria-label="Instructor phone number"
                required
              />
              <input
                type="date" // Added date input
                value={courseData.date}
                onChange={(e) => setCourseData({ ...courseData, date: e.target.value })}
                className="form-control mb-3"
                aria-label="Course date"
                required
              />
              <input
                type="number"
                value={courseData.price}
                onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                className="form-control mb-3"
                placeholder="Price"
                min="0"
                aria-label="Course price"
                required
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="danger" onClick={handleClose} disabled={loading} aria-label="Close modal">
            Close
          </Button>
          <Button variant="info" onClick={handleEdit} disabled={loading} aria-label="Update course">
            {loading ? <Spinner animation="border" size="sm" /> : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCourse;