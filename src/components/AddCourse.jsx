// components/AddCourse.js
import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Row, Col, Spinner, ProgressBar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addCourseApi } from '../services/api';
import { courseResponseContext } from '../context/ContextApi';

function AddCourse() {
  const [show, setShow] = useState(false);
  const [course, setCourse] = useState({ title: "", description: "", instructor: "", instructorPhone: "", date: "", price: "", image: "" });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setCourseResponse } = useContext(courseResponseContext);

  useEffect(() => {
    if (course.image) {
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(course.image.type)) {
        toast.warning("Only JPG, JPEG, or PNG images allowed");
        setCourse({ ...course, image: "" });
        setPreview("");
      } else if (course.image.size > 5 * 1024 * 1024) {
        toast.warning("Image size must be under 5MB");
        setCourse({ ...course, image: "" });
        setPreview("");
      } else {
        const url = URL.createObjectURL(course.image);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [course.image]);

  const handleSubmit = async () => {
    const { title, description, instructor, instructorPhone, date, price, image } = course;
    if (!title || !description || !instructor || !instructorPhone || !date || !price || !image) {
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
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("instructor", instructor);
    formData.append("instructorPhone", instructorPhone);
    formData.append("date", date); // Added date
    formData.append("price", price);
    formData.append("image", image);

    try {
      const result = await addCourseApi(formData, (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
      });

      if (result.status === 200) {
        toast.success("Course added successfully");
        setCourseResponse(result);
        handleClose();
      } else {
        toast.error(result.data?.message || "Failed to add course");
      }
    } catch (error) {
      toast.error(!error.response ? "Network error occurred" : error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleClose = () => {
    setShow(false);
    setCourse({ title: "", description: "", instructor: "", instructorPhone: "", date: "", price: "", image: "" });
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview("");
    }
  };

  const clearImage = () => {
    setCourse({ ...course, image: "" });
    if (preview) URL.revokeObjectURL(preview);
    setPreview("");
  };

  return (
    <>
      <Button variant="success" onClick={() => setShow(true)} aria-label="Add a new course">Add Course +</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label htmlFor="imageInput" className="d-block mb-2">
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: 'none' }}
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={(e) => setCourse({ ...course, image: e.target.files[0] })}
                  aria-label="Upload course image"
                />
                <img
                  src={preview || "https://via.placeholder.com/150"}
                  alt="Course preview"
                  className="img-fluid"
                  aria-describedby="imageHelp"
                />
                <small id="imageHelp" className="form-text text-muted">
                  Only JPG, JPEG, or PNG images under 5MB are allowed.
                </small>
              </label>
              {preview && (
                <Button variant="outline-secondary" size="sm" onClick={clearImage} className="mt-2" aria-label="Clear uploaded image">
                  Clear Image
                </Button>
              )}
            </Col>
            <Col>
              <input
                className="form-control mb-3"
                placeholder="Title"
                value={course.title}
                onChange={(e) => setCourse({ ...course, title: e.target.value })}
                aria-label="Course title"
                required
              />
              <input
                className="form-control mb-3"
                placeholder="Description"
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                aria-label="Course description"
                required
              />
              <input
                className="form-control mb-3"
                placeholder="Instructor"
                value={course.instructor}
                onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
                aria-label="Course instructor"
                required
              />
              <input
                className="form-control mb-3"
                placeholder="Instructor Phone (10 digits)"
                value={course.instructorPhone}
                onChange={(e) => setCourse({ ...course, instructorPhone: e.target.value })}
                aria-label="Instructor phone number"
                required
              />
              <input
                type="date" // Added date input
                className="form-control mb-3"
                value={course.date}
                onChange={(e) => setCourse({ ...course, date: e.target.value })}
                aria-label="Course date"
                required
              />
              <input
                className="form-control mb-3"
                placeholder="Price"
                type="number"
                min="0"
                value={course.price}
                onChange={(e) => setCourse({ ...course, price: e.target.value })}
                aria-label="Course price"
                required
              />
            </Col>
          </Row>
          {uploadProgress > 0 && (
            <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mt-3" aria-label="Upload progress" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} disabled={loading} aria-label="Close modal">
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading} aria-label="Upload course">
            {loading ? <Spinner animation="border" size="sm" /> : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCourse;