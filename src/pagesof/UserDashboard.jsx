import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Alert, Navbar, Nav, Button, Accordion } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';
import Cart from '../components/Cart';
import Wishlist from '../components/Wishlist';
import { getUserCourses, getCart } from '../services/api';
import { cartContext, wishlistContext, authContext } from '../context/ContextApi'; // Added authContext
import { toast } from 'react-toastify';
import {
  FaSignOutAlt,
  FaBook,
  FaTruck,
  FaChartLine,
  FaInfoCircle,
  FaGraduationCap,
  FaListAlt,
} from 'react-icons/fa';
import styles from './UserDashboard.module.css'; // Import CSS module

function UserDashboard() {
  const [username, setUsername] = useState('');
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [section, setSection] = useState('status');
  const { cart, setCart } = useContext(cartContext);
  const { wishlist } = useContext(wishlistContext);
  const { setAuth, setContextRole } = useContext(authContext); // Added context for auth
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialCart = async () => {
      try {
        const result = await getCart();
        if (result.status === 200) {
          const serverCart = result.data.cart.courses.map((item) => ({
            ...item.courseId,
            quantity: item.quantity,
          }));
          setCart(serverCart);
        }
      } catch (error) {
        console.error('Failed to fetch initial cart:', error);
        toast.error('Failed to load cart');
      }
    };
    fetchInitialCart();
    getData();
    setUsername(sessionStorage.getItem('user') || 'User');
  }, []);

  useEffect(() => {
    getData();
  }, [cart, wishlist]);

  const getData = async () => {
    try {
      const result = await getUserCourses();
      if (result.status === 200) {
        const enrolledCourses = result.data || [];
        const enrolledCoursesWithSource = enrolledCourses.map((course) => ({
          ...course,
          source: 'enrolled',
        }));
        const cartCourses = cart.map((cartItem) => ({
          _id: cartItem._id,
          title: cartItem.title,
          instructor: cartItem.instructor || 'Instructor Not Available',
          image: cartItem.image || 'https://via.placeholder.com/150',
          progress: cartItem.progress || 0,
          source: 'cart',
          isFromCart: true,
        }));
        setCourses([...enrolledCoursesWithSource, ...cartCourses]);
        setError(null);
      } else {
        setCourses([]);
        setError('Failed to load courses');
        toast.error('Failed to load courses');
      }
    } catch (error) {
      console.error('Fetch user courses error:', error.message);
      setCourses([]);
      setError(error.message || 'Network error occurred');
      toast.error(error.message || 'Failed to fetch courses');
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      toast.info("User logged out!");
      setAuth(false);
      setContextRole(null);
      navigate('/');
    }
  };

  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

  // Syllabus data for Python, MERN, MEAN, and Data Science
  const syllabuses = [
    {
      title: 'Python Programming',
      sections: [
        {
          section: 'Introduction to Python',
          topics: [
            { name: 'Python Basics', description: 'Overview of Python, installation, and setting up the environment.' },
            { name: 'Variables and Data Types', description: 'Understanding variables, numbers, strings, lists, tuples, and dictionaries.' },
          ],
        },
        {
          section: 'Control Flow and Functions',
          topics: [
            { name: 'Conditionals and Loops', description: 'Using if-else, for, and while loops for control flow.' },
            { name: 'Functions', description: 'Defining functions, arguments, return statements, and lambda functions.' },
          ],
        },
        {
          section: 'Object-Oriented Programming',
          topics: [
            { name: 'Classes and Objects', description: 'Creating classes, objects, and understanding inheritance.' },
            { name: 'Modules and Packages', description: 'Importing and creating reusable modules and packages.' },
          ],
        },
        {
          section: 'Advanced Python',
          topics: [
            { name: 'File Handling', description: 'Reading from and writing to files, handling CSV and JSON.' },
            { name: 'Error Handling', description: 'Using try-except blocks for exception handling.' },
          ],
        },
      ],
    },
    {
      title: 'MERN Stack Development',
      sections: [
        {
          section: 'MongoDB',
          topics: [
            { name: 'Introduction to MongoDB', description: 'Understanding NoSQL databases and MongoDB setup.' },
            { name: 'CRUD Operations', description: 'Performing create, read, update, and delete operations.' },
          ],
        },
        {
          section: 'Express.js',
          topics: [
            { name: 'Setting Up Express', description: 'Creating a server and handling routes with Express.' },
            { name: 'Middleware', description: 'Using middleware for authentication and error handling.' },
          ],
        },
        {
          section: 'React',
          topics: [
            { name: 'React Components', description: 'Building functional and class components.' },
            { name: 'State and Props', description: 'Managing state and passing props in React applications.' },
          ],
        },
        {
          section: 'Node.js',
          topics: [
            { name: 'Node.js Basics', description: 'Setting up Node.js and understanding event-driven architecture.' },
            { name: 'RESTful APIs', description: 'Building and consuming RESTful APIs with Node.js.' },
          ],
        },
      ],
    },
    {
      title: 'MEAN Stack Development',
      sections: [
        {
          section: 'MongoDB',
          topics: [
            { name: 'MongoDB Fundamentals', description: 'Introduction to MongoDB and schema design.' },
            { name: 'Data Modeling', description: 'Modeling relationships in MongoDB.' },
          ],
        },
        {
          section: 'Express.js',
          topics: [
            { name: 'Express Routing', description: 'Creating routes and handling HTTP methods.' },
            { name: 'API Development', description: 'Building secure APIs with Express.' },
          ],
        },
        {
          section: 'Angular',
          topics: [
            { name: 'Angular Components', description: 'Creating components and modules in Angular.' },
            { name: 'Services and Dependency Injection', description: 'Using services for data sharing.' },
          ],
        },
        {
          section: 'Node.js',
          topics: [
            { name: 'Node.js Environment', description: 'Setting up Node.js for MEAN stack.' },
            { name: 'Asynchronous Programming', description: 'Using callbacks, promises, and async/await.' },
          ],
        },
      ],
    },
    {
      title: 'Data Science',
      sections: [
        {
          section: 'Introduction to Data Science',
          topics: [
            { name: 'Data Science Overview', description: 'Understanding the data science workflow and tools.' },
            { name: 'Statistics Basics', description: 'Mean, median, variance, and probability distributions.' },
          ],
        },
        {
          section: 'Python for Data Science',
          topics: [
            { name: 'NumPy and Pandas', description: 'Data manipulation with NumPy arrays and Pandas DataFrames.' },
            { name: 'Data Visualization', description: 'Using Matplotlib and Seaborn for plotting.' },
          ],
        },
        {
          section: 'Machine Learning',
          topics: [
            { name: 'Supervised Learning', description: 'Linear regression, logistic regression, and decision trees.' },
            { name: 'Unsupervised Learning', description: 'Clustering and dimensionality reduction techniques.' },
          ],
        },
        {
          section: 'Advanced Topics',
          topics: [
            { name: 'Deep Learning', description: 'Introduction to neural networks and TensorFlow.' },
            { name: 'Big Data', description: 'Working with Hadoop and Spark for large datasets.' },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6f5' }}>
      {/* Sidebar */}
      <Col xs={12} md={3} lg={2} className={styles.sidebar}>
        <h4 className={styles.logo}>SkillHub</h4>
        <Nav className="flex-column">
          <Nav.Link
            onClick={() => setSection('status')}
            className={`${styles.navLink} ${section === 'status' ? styles.navLinkActive : ''}`}
          >
            <FaChartLine className={styles.navIcon} /> Status
          </Nav.Link>
          <Nav.Link as={Link} to="/courses" className={styles.navLink}>
            <FaBook className={styles.navIcon} /> Courses
          </Nav.Link>
          <Nav.Link
            onClick={() => setSection('syllabus')}
            className={`${styles.navLink} ${section === 'syllabus' ? styles.navLinkActive : ''}`}
          >
            <FaListAlt className={styles.navIcon} /> Syllabus
          </Nav.Link>
          <Nav.Link as={Link} to="/track-order" className={styles.navLink}>
            <FaTruck className={styles.navIcon} /> Track Orders
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className={styles.navLink}>
            <FaInfoCircle className={styles.navIcon} /> About
          </Nav.Link>
          <Nav.Link as={Link} to="/learn" className={styles.navLink}>
            <FaGraduationCap className={styles.navIcon} /> Learn Us
          </Nav.Link>
        </Nav>
      </Col>

      {/* Main Content */}
      <Col xs={12} md={9} lg={10} className="p-0">
        {/* Header */}
        <Navbar bg="white" className="shadow-sm px-4 py-3" style={{ borderBottom: '1px solid #e9ecef' }}>
  <Navbar.Brand className="fw-bold" style={{ fontSize: '1.25rem' }}>
    {section === 'status' ? 'Status' : section === 'syllabus' ? 'Syllabus' : 'Dashboard'}
  </Navbar.Brand>
  <Nav className="ms-auto align-items-center">
    <span className="me-3 d-flex align-items-center" style={{ fontSize: '1.1rem' }}>
      <FaUser className="me-1" /> {/* User icon */}
      {capitalizedUsername}
    </span>
    <Button
      variant="outline-danger"
      size="sm"
      onClick={handleLogout}
      style={{ padding: '0.5rem 1rem' }}
    >
      <FaSignOutAlt className="me-1" /> Logout
    </Button>
  </Nav>
</Navbar>

        {/* Main Area */}
        <Container fluid className="p-4">
          {section === 'status' ? (
            <>
              <Row className="mb-4">
                <Col>
                  <Card className="border-0 shadow-sm p-4" style={{ borderRadius: '12px' }}>
                    <h2 className="fw-bold mb-3">
                      Welcome back, <span style={{ color: '#4a00e0' }}>{capitalizedUsername} 👨🏻‍💻</span>!
                    </h2>
                    <p className="text-muted mb-4">
                      Your learning journey with <strong>SkillHub</strong> is just getting started. Explore new skills,
                      track your progress, and achieve your goals!
                    </p>
                    <div className="mb-4">
                     
                      <p className="text-muted">
                        At SkillHub, we empower learners worldwide to master new skills and advance their careers. Our
                        platform offers a curated selection of courses taught by industry experts, designed to fit your
                        schedule and learning style. 
                      </p>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <strong>Expert Instructors:</strong> Learn from the best in the field.
                        </li>
                        <li className="mb-2">
                          <strong>Flexible Learning:</strong> Study at your own pace, anytime, anywhere.
                        </li>
                        <li className="mb-2">
                          <strong>Community Support:</strong> Connect with fellow learners and mentors.
                        </li>
                      </ul>
                    </div>
                    <Button as={Link} to="/courses" variant="outline-info" className="rounded-pill px-4">
                      Explore Courses
                    </Button>
                  </Card>
                </Col>
              </Row>
              <Row className="g-4">
                {/* Enrolled Courses */}
                <Col lg={6}>
                  <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                    <Card.Header className="bg-white p-3">
                      <h4 className="fw-semibold mb-0">Enrolled Courses 🕮</h4>
                    </Card.Header>
                    <Card.Body className="p-4">
                      {error ? (
                        <Alert variant="danger" className="rounded-3">
                          {error}
                        </Alert>
                      ) : courses.length > 0 ? (
                        courses.map((course) => (
                          <Card
                            key={`${course._id}-${course.source}`}
                            className="mb-3 border-0 shadow-sm"
                            style={{ borderRadius: '10px', transition: 'transform 0.2s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          >
                            <Card.Body className="d-flex align-items-center">
                              <div className="flex-grow-1">
                                <h5 className="fw-medium mb-1">{course.title}</h5>
                                <p className="text-muted mb-2">
                                  Instructor: {course.instructor} {course.isFromCart && '(In Cart)'}
                                </p>
                                <ProgressTracker courseId={course._id} initialProgress={course.progress || 0} />
                              </div>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <Alert variant="primary" className="rounded-3">
                          No enrolled courses yet. <Link to="/courses">Explore courses</Link>.
                        </Alert>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                {/* Cart and Wishlist */}
                <Col lg={6}>
                  <div className="d-flex flex-column gap-4">
                    <Cart />
                    <Wishlist />
                  </div>
                </Col>
              </Row>
            </>
          ) : section === 'syllabus' ? (
            <Row>
              <Col>
                <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                  <Card.Header className="bg-white p-3">
                    <h4 className="fw-semibold mb-0">Course Syllabuses</h4>
                  </Card.Header>
                  <Card.Body className="p-4">
                    {syllabuses.map((course, index) => (
                      <Accordion key={index} defaultActiveKey="0" className="mb-3">
                        <Accordion.Item eventKey={index.toString()}>
                          <Accordion.Header>
                            <h5 className="fw-medium mb-0">{course.title}</h5>
                          </Accordion.Header>
                          <Accordion.Body>
                            {course.sections.map((section, secIndex) => (
                              <div key={secIndex} className="mb-3">
                                <h6 className="fw-semibold">{section.section}</h6>
                                <ul className="list-group list-group-flush">
                                  {section.topics.map((topic, topicIndex) => (
                                    <li
                                      key={topicIndex}
                                      className="list-group-item border-0 ps-0"
                                      style={{ background: 'transparent' }}
                                    >
                                      <strong>{topic.name}:</strong> {topic.description}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : null}
        </Container>
      </Col>
    </div>
  );
}

export default UserDashboard;