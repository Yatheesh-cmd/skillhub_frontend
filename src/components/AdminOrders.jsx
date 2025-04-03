import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Spinner, 
  Alert, 
  Table,
  Badge,
  OverlayTrigger,
  Tooltip,
  Card,
  ProgressBar
} from 'react-bootstrap';
import { getAllOrdersApi } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaBook, FaChartLine } from 'react-icons/fa';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await getAllOrdersApi();
        if (response.status === 200) {
          setOrders(response.data || []);
          setError(null);
        } else {
          throw new Error('Failed to load orders');
        }
      } catch (error) {
        console.error('Fetch orders error:', error);
        setError(error.message || 'Network error occurred');
        toast.error(error.message || 'Failed to fetch orders');
        if (error.message === 'No authentication token found. Please log in.' || 
            error.message === 'Invalid token') {
          sessionStorage.clear();
          navigate('/auth');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  const getStatusVariant = (status) => {
    const statusMap = {
      'completed': 'success',
      'pending': 'warning',
      'failed': 'danger'
    };
    return statusMap[status.toLowerCase()] || 'secondary';
  };

  const renderCoursesTooltip = (courses) => (
    <Tooltip id="courses-tooltip">
      <div className="text-start">
        {courses.map((item, index) => (
          <div key={index} className="py-1 d-flex align-items-center">
            <FaBook className="me-2 text-primary" />
            <span>{item.courseId?.title || `Course ID: ${item.courseId || 'N/A'}`}</span>
          </div>
        ))}
      </div>
    </Tooltip>
  );

  const getStatusProgress = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 100;
      case 'pending': return 50;
      case 'failed': return 0;
      default: return 25;
    }
  };

  // Only sum totals for completed orders
  const totalRevenue = orders
    .filter(order => order.status.toLowerCase() === 'completed')
    .reduce((sum, order) => sum + order.total, 0);

  return (
    <Container fluid className="py-5" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <Card className="shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
        <Card.Header className="bg-gradient-primary text-white py-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              <FaChartLine className="me-2" />
              Order Management Dashboard
            </h4>
            <Badge bg="light" text="dark" className="px-3 py-2">
              Completed Orders Revenue: ₹{totalRevenue.toFixed(2)}
            </Badge>
          </div>
        </Card.Header>
        <Card.Body className="p-4">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="grow" variant="primary" />
              <p className="mt-3 text-muted fw-medium">Fetching order data...</p>
            </div>
          ) : error ? (
            <Alert variant="danger" className="m-3 rounded-3 shadow-sm">
              <Alert.Heading className="h5">System Alert</Alert.Heading>
              <p className="mb-0">{error}</p>
            </Alert>
          ) : orders.length > 0 ? (
            <>
              <div className="mb-4 d-flex justify-content-between align-items-center">
                <Badge bg="info" className="px-3 py-2 shadow-sm">
                  Active Orders: {orders.length}
                </Badge>
                <small className="text-muted">
                  Last updated: {new Date().toLocaleTimeString()}
                </small>
              </div>
              <Table 
                hover 
                responsive 
                className="align-middle shadow-sm" 
                style={{ 
                  borderRadius: '10px', 
                  overflow: 'hidden', 
                  border: '1px solid #e9ecef',
                  backgroundColor: '#fff'
                }}
              >
                <thead style={{ 
                  backgroundColor: '#f8f9fa', 
                  color: '#495057',
                  borderBottom: '2px solid #dee2e6'
                }}>
                  <tr>
                    <th className="py-3 px-4 fw-semibold">Order ID</th>
                    <th className="py-3 px-4 fw-semibold">Student</th>
                    <th className="py-3 px-4 fw-semibold">Date</th>
                    <th className="py-3 px-4 fw-semibold">Courses</th>
                    <th className="py-3 px-4 fw-semibold">Total</th>
                    <th className="py-3 px-4 fw-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr
                      key={order._id}
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                      style={{ 
                        cursor: 'pointer', 
                        transition: 'background-color 0.3s ease',
                        borderBottom: '1px solid #e9ecef'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f3f5'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td className="text-muted fw-medium px-4 py-3">
                        #{order._id.substring(0, 8)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <FaUser className="me-2 text-primary" />
                          {order.userId?.username || 'Unknown User'}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <FaCalendarAlt className="me-2 text-primary" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <OverlayTrigger
                          placement="top"
                          overlay={renderCoursesTooltip(order.courses)}
                        >
                          <Badge bg="info" className="px-3 py-2 shadow-sm">
                            {order.courses.length} Course{order.courses.length !== 1 ? 's' : ''}
                          </Badge>
                        </OverlayTrigger>
                      </td>
                      <td className="fw-semibold text-success px-4 py-3">
                        ₹{order.total.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="d-flex flex-column gap-1">
                          <Badge 
                            bg={getStatusVariant(order.status)} 
                            className="px-3 py-2 text-capitalize shadow-sm"
                          >
                            {order.status}
                          </Badge>
                          <ProgressBar
                            now={getStatusProgress(order.status)}
                            variant={getStatusVariant(order.status)}
                            style={{ height: '0px' }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <Alert variant="info" className="m-3 text-center rounded-3 shadow-sm">
              <p className="mb-0 fw-medium">No orders currently in the system</p>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminOrders;