import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createReviewApi, getCourseReviewsApi, deleteReviewApi } from '../services/api';

function Review({ courseId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  const fetchReviews = async () => {
    try {
      const result = await getCourseReviewsApi(courseId);
      if (result.status === 200) setReviews(result.data);
    } catch (error) {
      toast.error('Failed to load reviews');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createReviewApi({ courseId, rating, comment });
      if (result.status === 201) {
        toast.success('Review submitted');
        setRating(0);
        setComment('');
        fetchReviews();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        const result = await deleteReviewApi(reviewId);
        if (result.status === 200) {
          toast.success('Review deleted');
          fetchReviews();
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="border p-3 mt-3">
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="border p-2 mb-2">
            <p><strong>{review.userId.username}</strong>: {review.rating}/5</p>
            <p>{review.comment}</p>
            {review.userId._id === sessionStorage.getItem('userId') && (
              <Button variant="danger" size="sm" onClick={() => handleDelete(review._id)}>
                Delete
              </Button>
            )}
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group>
          <Form.Label>Rating (1-5)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={loading} className="mt-2">
          {loading ? <Spinner animation="border" size="sm" /> : 'Submit Review'}
        </Button>
      </Form>
    </div>
  );
}

export default Review;