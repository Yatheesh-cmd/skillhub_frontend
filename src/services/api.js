import axios from 'axios';
import BASE_URL from './base_url';

const commonApi = async (url, method, headers = {}, data = {}, isMultipart = false, onUploadProgress) => {
  const config = {
    method,
    url: `${BASE_URL}${url}`,
    headers: isMultipart ? headers : { 'Content-Type': 'application/json', ...headers },
    data,
    onUploadProgress,
    timeout: 1000000,
  };
  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.response?.data || error.message || "An unexpected error occurred";
    throw new Error(errorMessage);
  }
};

const getAuthHeaders = () => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  return { 'Authorization': `Bearer ${token}` };
};

export const signupApi = (data) => commonApi('/auth/userreg', 'POST', {}, data);
export const loginApi = (data) => commonApi('/auth/userlog', 'POST', {}, data);
export const addCourseApi = (formData, onUploadProgress) =>
  commonApi('/courses/addcourse', 'POST', { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' }, formData, true, onUploadProgress);
export const getAdminCourses = () => commonApi('/courses/admincourses', 'GET', getAuthHeaders());
export const updateCourseApi = (id, formData) =>
  commonApi(`/courses/updatecourse/${id}`, 'PUT', { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' }, formData, true);
export const deleteCourseApi = (id) => commonApi(`/courses/deletecourse/${id}`, 'DELETE', getAuthHeaders());
export const getUserCourses = () => commonApi('/user/usercourses', 'GET', getAuthHeaders());
export const sampleCoursesApi = () => commonApi('/courses/samplecourses', 'GET', {});
export const allCoursesApi = (search) =>
  commonApi(`/courses/allcourses?search=${encodeURIComponent(search || '')}`, 'GET', getAuthHeaders());
export const updateProfileApi = (formData) =>
  commonApi('/user/updateprofile', 'PUT', { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' }, formData, true);
export const getProfileApi = () => commonApi('/user/profile', 'GET', getAuthHeaders());
export const updateProgressApi = (courseId, progress) =>
  commonApi(`/user/update-progress/${courseId}`, 'PUT', getAuthHeaders(), { progress });
export const initiatePaymentApi = (cart) =>
  commonApi('/payment/initiate-payment', 'POST', getAuthHeaders(), cart);
export const verifyPaymentApi = (paymentData) =>
  commonApi('/payment/verify-payment', 'POST', getAuthHeaders(), paymentData);
export const getOrderStatusApi = () => commonApi('/payment/order-status', 'GET', getAuthHeaders());
export const createReviewApi = (data) =>
  commonApi('/review/create', 'POST', getAuthHeaders(), data);
export const getCourseReviewsApi = (courseId) =>
  commonApi(`/review/course/${courseId}`, 'GET', {});
export const deleteReviewApi = (reviewId) =>
  commonApi(`/review/${reviewId}`, 'DELETE', getAuthHeaders());
export const updateCartApi = (cartData) =>
  commonApi('/user/update-cart', 'PUT', getAuthHeaders(), cartData);
export const getCart = () => commonApi('/user/update-cart', 'GET', getAuthHeaders());
export const updateWishlistApi = (wishlistData) =>
  commonApi('/user/update-wishlist', 'PUT', getAuthHeaders(), wishlistData);
export const getAllOrdersApi = () => commonApi('/payment/all-orders', 'GET', getAuthHeaders());

export default commonApi;