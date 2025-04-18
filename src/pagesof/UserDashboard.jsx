import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Alert, Navbar, Nav, Button, Accordion, Spinner, ListGroup, Badge } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt, FaBook, FaTruck, FaChartLine, FaInfoCircle, FaGraduationCap, FaListAlt, FaPython, FaAngular, FaChartBar, FaLaptopCode, FaLaptop } from 'react-icons/fa';
import { SiReact, SiMongodb, SiExpress, SiNodedotjs, SiDotnet, SiFlutter } from 'react-icons/si';
import { MdSecurity, MdCampaign } from 'react-icons/md';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProgressTracker from '../components/ProgressTracker';
import Cart from '../components/Cart';
import Wishlist from '../components/Wishlist';
import CourseCard from '../components/CourseCard';
import { getUserCourses, getCart, allCoursesApi, getOrderStatusApi } from '../services/api';
import { cartContext, wishlistContext, authContext } from '../context/ContextApi';
import { toast } from 'react-toastify';
import styles from './UserDashboard.module.css';

function UserDashboard() {
  const [username, setUsername] = useState('');
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [section, setSection] = useState('status');
  const [showUsername, setShowUsername] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const { cart, setCart } = useContext(cartContext);
  const { wishlist } = useContext(wishlistContext);
  const { setAuth, setContextRole } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const newOrder = location.state?.order;

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

  useEffect(() => {
    if (section === 'courses') {
      fetchAllCourses();
    } else if (section === 'trackOrder') {
      fetchOrders();
    }
  }, [section]);

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

  const fetchAllCourses = async () => {
    if (!sessionStorage.getItem('token')) {
      toast.warning("Please login first");
      setSection('status');
      return;
    }
    setLoadingCourses(true);
    try {
      const result = await allCoursesApi('');
      if (result.status === 200) {
        setAllCourses(result.data);
      } else {
        toast.error("Failed to load courses");
        setAllCourses([]);
      }
    } catch (error) {
      console.error('Fetch all courses error:', error.message);
      toast.error("Network error occurred");
      setAllCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    setError(null);
    try {
      const response = await getOrderStatusApi();
      if (response.status === 200) {
        const fetchedOrders = response.data || [];
        if (newOrder && !fetchedOrders.some(order => order._id === newOrder._id)) {
          setOrders([newOrder, ...fetchedOrders]);
          toast.success('New order added to tracking');
        } else {
          setOrders(fetchedOrders);
        }
        if (fetchedOrders.length === 0 && !newOrder) {
          setError('No orders found in your account.');
        }
      } else {
        setError('Failed to load orders. Status: ' + response.status);
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Fetch orders error:', error.response || error.message);
      const errorMsg = error.response?.data?.message || error.message || 'Network error occurred';
      setError(errorMsg);
      if (errorMsg === 'No authentication token found. Please log in.' || errorMsg === 'Invalid token') {
        toast.error('Session expired. Please log in again.');
        sessionStorage.clear();
        navigate('/auth');
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setLoadingOrders(false);
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
  const userInitial = capitalizedUsername.charAt(0);

  const syllabuses = [
    {
      title: 'Python Programming',
      icon: <FaPython className="me-2" style={{ color: '#3776AB' }} />,
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
      icon: <SiReact className="me-2" style={{ color: '#61DAFB' }} />,
      sections: [
        {
          section: 'MongoDB',
          topics: [
            { name: 'Introduction to MongoDB', description: 'Understanding NoSQL databases and MongoDB setup.', icon: <SiMongodb className="me-1" style={{ color: '#47A248' }} /> },
            { name: 'CRUD Operations', description: 'Performing create, read, update, and delete operations.' },
          ],
        },
        {
          section: 'Express.js',
          topics: [
            { name: 'Setting Up Express', description: 'Creating a server and handling routes with Express.', icon: <SiExpress className="me-1" style={{ color: '#000000' }} /> },
            { name: 'Middleware', description: 'Using middleware for authentication and error handling.' },
          ],
        },
        {
          section: 'React',
          topics: [
            { name: 'React Components', description: 'Building functional and class components.', icon: <SiReact className="me-1" style={{ color: '#61DAFB' }} /> },
            { name: 'State and Props', description: 'Managing state and passing props in React applications.' },
          ],
        },
        {
          section: 'Node.js',
          topics: [
            { name: 'Node.js Basics', description: 'Setting up Node.js and understanding event-driven architecture.', icon: <SiNodedotjs className="me-1" style={{ color: '#339933' }} /> },
            { name: 'RESTful APIs', description: 'Building and consuming RESTful APIs with Node.js.' },
          ],
        },
      ],
    },
    {
      title: 'MEAN Stack Development',
      icon: <FaAngular className="me-2" style={{ color: '#DD0031' }} />,
      sections: [
        {
          section: 'MongoDB',
          topics: [
            { name: 'MongoDB Fundamentals', description: 'Introduction to MongoDB and schema design.', icon: <SiMongodb className="me-1" style={{ color: '#47A248' }} /> },
            { name: 'Data Modeling', description: 'Modeling relationships in MongoDB.' },
          ],
        },
        {
          section: 'Express.js',
          topics: [
            { name: 'Express Routing', description: 'Creating routes and handling HTTP methods.', icon: <SiExpress className="me-1" style={{ color: '#000000' }} /> },
            { name: 'API Development', description: 'Building secure APIs with Express.' },
          ],
        },
        {
          section: 'Angular',
          topics: [
            { name: 'Angular Components', description: 'Creating components and modules in Angular.', icon: <FaAngular className="me-1" style={{ color: '#DD0031' }} /> },
            { name: 'Services and Dependency Injection', description: 'Using services for data sharing.' },
          ],
        },
        {
          section: 'Node.js',
          topics: [
            { name: 'Node.js Environment', description: 'Setting up Node.js for MEAN stack.', icon: <SiNodedotjs className="me-1" style={{ color: '#339933' }} /> },
            { name: 'Asynchronous Programming', description: 'Using callbacks, promises, and async/await.' },
          ],
        },
      ],
    },
    {
      title: 'Data Science',
      icon: <FaChartBar className="me-2" style={{ color: '#FF5733' }} />,
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
    {
      title: 'ASP.NET Development',
      icon: <SiDotnet className="me-2" style={{ color: '#512BD4' }} />,
      sections: [
        {
          section: 'Introduction to ASP.NET',
          topics: [
            { name: 'ASP.NET Basics', description: 'Overview of ASP.NET, setup, and project structure.' },
            { name: 'MVC Architecture', description: 'Understanding Model-View-Controller pattern in ASP.NET.' },
          ],
        },
        {
          section: 'Building Web Applications',
          topics: [
            { name: 'Razor Pages', description: 'Creating dynamic web pages with Razor syntax.' },
            { name: 'Entity Framework', description: 'Using EF Core for database operations.' },
          ],
        },
        {
          section: 'APIs and Services',
          topics: [
            { name: 'Web APIs', description: 'Building RESTful APIs with ASP.NET Core.' },
            { name: 'Authentication', description: 'Implementing JWT and OAuth for secure APIs.' },
          ],
        },
        {
          section: 'Advanced ASP.NET',
          topics: [
            { name: 'SignalR', description: 'Real-time web functionality with SignalR.' },
            { name: 'Deployment', description: 'Deploying ASP.NET apps to Azure or IIS.' },
          ],
        },
      ],
    },
    {
      title: 'Cybersecurity',
      icon: <MdSecurity className="me-2" style={{ color: '#FF4500' }} />,
      sections: [
        {
          section: 'Cybersecurity Fundamentals',
          topics: [
            { name: 'Introduction to Cybersecurity', description: 'Understanding threats, vulnerabilities, and risks.' },
            { name: 'Network Security', description: 'Securing networks with firewalls and VPNs.' },
          ],
        },
        {
          section: 'Ethical Hacking',
          topics: [
            { name: 'Penetration Testing', description: 'Performing ethical hacks to identify vulnerabilities.' },
            { name: 'Exploit Development', description: 'Writing and testing exploits safely.' },
          ],
        },
        {
          section: 'Security Tools',
          topics: [
            { name: 'Kali Linux', description: 'Using Kali Linux for security testing.' },
            { name: 'Wireshark', description: 'Analyzing network traffic with Wireshark.' },
          ],
        },
        {
          section: 'Advanced Cybersecurity',
          topics: [
            { name: 'Incident Response', description: 'Handling and mitigating security breaches.' },
            { name: 'Cryptography', description: 'Implementing encryption and secure communication.' },
          ],
        },
      ],
    },
    {
      title: 'Flutter Development',
      icon: <SiFlutter className="me-2" style={{ color: '#02569B' }} />,
      sections: [
        {
          section: 'Introduction to Flutter',
          topics: [
            { name: 'Flutter Basics', description: 'Setting up Flutter and understanding Dart.' },
            { name: 'Widgets', description: 'Building UI with Flutter widgets.' },
          ],
        },
        {
          section: 'Building Apps',
          topics: [
            { name: 'State Management', description: 'Managing app state with Provider or Riverpod.' },
            { name: 'Navigation', description: 'Implementing navigation and routing in Flutter.' },
          ],
        },
        {
          section: 'Backend Integration',
          topics: [
            { name: 'REST APIs', description: 'Connecting Flutter apps to RESTful services.' },
            { name: 'Firebase', description: 'Using Firebase for authentication and storage.' },
          ],
        },
        {
          section: 'Advanced Flutter',
          topics: [
            { name: 'Animations', description: 'Creating custom animations in Flutter.' },
            { name: 'Cross-Platform Deployment', description: 'Deploying apps to iOS and Android.' },
          ],
        },
      ],
    },
    {
      title: 'Digital Marketing',
      icon: <MdCampaign className="me-2" style={{ color: '#00C4B4' }} />,
      sections: [
        {
          section: 'Introduction to Digital Marketing',
          topics: [
            { name: 'Marketing Fundamentals', description: 'Understanding digital marketing channels and strategies.' },
            { name: 'SEO Basics', description: 'Optimizing websites for search engines.' },
          ],
        },
        {
          section: 'Content Marketing',
          topics: [
            { name: 'Content Creation', description: 'Crafting engaging blogs, videos, and social media posts.' },
            { name: 'Content Strategy', description: 'Planning and distributing content effectively.' },
          ],
        },
        {
          section: 'Advertising',
          topics: [
            { name: 'Google Ads', description: 'Running PPC campaigns with Google Ads.' },
            { name: 'Social Media Ads', description: 'Advertising on Facebook, Instagram, and LinkedIn.' },
          ],
        },
        {
          section: 'Analytics and Optimization',
          topics: [
            { name: 'Google Analytics', description: 'Tracking and analyzing website performance.' },
            { name: 'A/B Testing', description: 'Optimizing campaigns with A/B testing.' },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6f5' }}>
      <Col xs={12} md={3} lg={2} className={styles.sidebar} style={{ background: 'linear-gradient(180deg, #2c3e50 0%, #1a2634 100%)', padding: '20px 10px' }}>
        <div
          style={{
            position: 'relative',
            margin: '20px auto 20px',
            textAlign: 'center',
          }}
          onMouseEnter={() => setShowUsername(true)}
          onMouseLeave={() => setShowUsername(false)}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgb(88, 42, 182) 0%, rgb(145, 61, 219) 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(74, 0, 224, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
            }}
          >
            {userInitial}
          </div>
          {showUsername && (
            <div
              style={{
                position: 'absolute',
                top: '90px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.9)',
                color: '#d1d8e0',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '1rem',
                whiteSpace: 'nowrap',
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              {capitalizedUsername}
            </div>
          )}
        </div>
        <h3
          className={styles.logo}
          style={{
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: '700',
            letterSpacing: '1px',
            marginBottom: '20px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          SkillHub
        </h3>
        <Nav className="flex-column">
          <Nav.Link
            onClick={() => setSection('status')}
            className={`${styles.navLink} ${section === 'status' ? styles.navLinkActive : ''}`}
            style={{
              color: section === 'status' ? '#4a00e0' : '#d1d8e0',
              padding: '10px 15px',
              borderRadius: '8px',
              margin: '5px 0',
              transition: 'background 0.3s, color 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (section !== 'status') {
                e.currentTarget.style.background = 'rgba(74, 0, 224, 0.1)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (section !== 'status') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }
            }}
          >
            <FaChartLine className={styles.navIcon} style={{ marginRight: '10px' }} /> Status
          </Nav.Link>
          <Nav.Link
            onClick={() => setSection('courses')}
            className={`${styles.navLink} ${section === 'courses' ? styles.navLinkActive : ''}`}
            style={{
              color: section === 'courses' ? '#4a00e0' : '#d1d8e0',
              padding: '10px 15px',
              borderRadius: '8px',
              margin: '5px 0',
              transition: 'background 0.3s, color 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (section !== 'courses') {
                e.currentTarget.style.background = 'rgba(74, 0, 224, 0.1)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (section !== 'courses') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }
            }}
          >
            <FaLaptop className={styles.navIcon} style={{ marginRight: '10px' }} /> Courses
          </Nav.Link>
          <Nav.Link
            onClick={() => setSection('syllabus')}
            className={`${styles.navLink} ${section === 'syllabus' ? styles.navLinkActive : ''}`}
            style={{
              color: section === 'syllabus' ? '#4a00e0' : '#d1d8e0',
              padding: '10px 15px',
              borderRadius: '8px',
              margin: '5px 0',
              transition: 'background 0.3s, color 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (section !== 'syllabus') {
                e.currentTarget.style.background = 'rgba(74, 0, 224, 0.1)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (section !== 'syllabus') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }
            }}
          >
            <FaListAlt className={styles.navIcon} style={{ marginRight: '10px' }} /> Syllabus
          </Nav.Link>
          <Nav.Link
            onClick={() => setSection('trackOrder')}
            className={`${styles.navLink} ${section === 'trackOrder' ? styles.navLinkActive : ''}`}
            style={{
              color: section === 'trackOrder' ? '#4a00e0' : '#d1d8e0',
              padding: '10px 15px',
              borderRadius: '8px',
              margin: '5px 0',
              transition: 'background 0.3s, color 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (section !== 'trackOrder') {
                e.currentTarget.style.background = 'rgba(74, 0, 224, 0.1)';
                e.currentTarget.style.transform = 'translateX(5px)';
              }
            }}
            onMouseLeave={(e) => {
              if (section !== 'trackOrder') {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
              }
            }}
          >
            <FaTruck className={styles.navIcon} style={{ marginRight: '10px' }} /> Track Orders
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/about"
            className={styles.navLink}
            style={{
              color: '#d1d8e0',
              padding: '10px 15px',
              borderRadius: '8px',
              margin: '5px 0',
              transition: 'background 0.3s, color 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(74, 0, 224, 0.1)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <FaInfoCircle className={styles.navIcon} style={{ marginRight: '10px' }} /> About
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/learn"
            className={styles.navLink}
            style={{
              color: '#d1d8e0',
              padding: '10px 15px',
              borderRadius: '8px',
              margin: '5px 0',
              transition: 'background 0.3s, color 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(74, 0, 224, 0.1)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            <FaGraduationCap className={styles.navIcon} style={{ marginRight: '10px' }} /> Learn Us
          </Nav.Link>
        </Nav>
        <hr
          style={{
            border: 'none',
            height: '2px',
            background: 'linear-gradient(90deg, #4a00e0, #8e2de2)',
            margin: '20px 0',
            borderRadius: '2px',
          }}
        />
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '15px',
            color: '#d1d8e0',
            textAlign: 'center',
            marginBottom: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 50% 50%, rgba(74, 0, 224, 0.1), transparent)',
              animation: 'pulse 4s infinite',
            }}
          />
          <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic' }}>
            "The only way to learn a new skill is to practice it." — SkillHub
          </p>
        </div>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '8px',
            padding: '15px',
            color: '#d1d8e0',
            marginBottom: '20px',
          }}
        >
          <h6 style={{ fontSize: '1rem', marginBottom: '10px', color: '#ffffff' }}>Quick Stats</h6>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <div style={{ textAlign: 'center' }}>
              <FaLaptop style={{ color: '#4a00e0', marginBottom: '5px' }} />
              <p style={{ margin: 0 }}>5 Courses</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaChartLine style={{ color: '#00c4b4', marginBottom: '5px' }} />
              <p style={{ margin: 0 }}>20 Hours</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <FaGraduationCap style={{ color: '#ff8c00', marginBottom: '5px' }} />
              <p style={{ margin: 0 }}>3 Badges</p>
            </div>
          </div> */}
        </div>
        <div
          style={{
            textAlign: 'center',
            color: '#d1d8e0',
            fontSize: '0.85rem',
            marginTop: 'auto',
            paddingTop: '10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* <p style={{ margin: 0, opacity: 0.7 }}>Connect with us</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
            <FaUserCircle style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4a00e0')} onMouseLeave={(e) => (e.currentTarget.style.color = '#d1d8e0')} />
            <FaChartLine style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4a00e0')} onMouseLeave={(e) => (e.currentTarget.style.color = '#d1d8e0')} />
            <FaLaptop style={{ cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4a00e0')} onMouseLeave={(e) => (e.currentTarget.style.color = '#d1d8e0')} />
          </div> */}
        </div>
        <style>
          {`
            @keyframes pulse {
              0% { opacity: 0.3; }
              50% { opacity: 0.6; }
              100% { opacity: 0.3; }
            }
          `}
        </style>
      </Col>

      <Col xs={12} md={9} lg={10} className="p-0">
        <Navbar bg="white" className="shadow-sm px-4 py-3" style={{ borderBottom: '1px solid #e9ecef' }}>
          <Navbar.Brand className="fw-bold" style={{ fontSize: '1.25rem', color: '#2c3e50' }}>
            {section === 'status' ? 'Status' : section === 'syllabus' ? 'Syllabus' : section === 'courses' ? 'Courses' : section === 'trackOrder' ? 'Track Orders' : 'Dashboard'}
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            <span className="me-3 d-flex align-items-center" style={{ fontSize: '1.1rem', color: '#4a00e0' }}>
              <FaUserCircle className="me-1" /> {capitalizedUsername}
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

        <Container fluid className="p-4">
          {section === 'status' && (
            <>
              <Row className="mb-4">
                <Col>
                  <Card className="border-0 shadow-sm p-4 position-relative" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h2 className="fw-bold mb-2" style={{ color: '#2c3e50' }}>
                          Welcome back, <span style={{ color: '#4a00e0' }}>{capitalizedUsername} </span> 👨🏻‍💻
                        </h2>
                        <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                          Embark on your learning adventure with <strong>SkillHub</strong>. Master new skills, track your progress, and soar to new heights!
                        </p>
                      </div>
                      <Button
                        as={Link}
                        to="/courses"
                        variant部分
                        variant="primary"
                        className="rounded-pill px-4 py-2"
                        style={{ background: 'linear-gradient(90deg, #4a00e0, #8e2de2)', border: 'none' }}
                      >
                        Discover Courses
                      </Button>
                    </div>
                    <Row className="mt-4">
                      <Col md={4} className="mb-3">
                        <Card className="border-0 shadow-sm p-3" style={{ borderRadius: '10px', background: '#e6f3ff' }}>
                          <Card.Body className="d-flex align-items-center">
                            <FaGraduationCap size={40} className="me-3" style={{ color: '#4a00e0' }} />
                            <div>
                              <h5 className="fw-semibold mb-1">Expert Instructors</h5>
                              <p className="text-muted small mb-0">Learn from industry leaders with real-world expertise.</p>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Card className="border-0 shadow-sm p-3" style={{ borderRadius: '10px', background: '#e6fff7' }}>
                          <Card.Body className="d-flex align-items-center">
                            <FaChartLine size={40} className="me-3" style={{ color: '#00c4b4' }} />
                            <div>
                              <h5 className="fw-semibold mb-1">Flexible Learning</h5>
                              <p className="text-muted small mb-0">Study at your own pace, anytime, anywhere.</p>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} className="mb-3">
                        <Card className="border-0 shadow-sm p-3" style={{ borderRadius: '10px', background: '#fff5e6' }}>
                          <Card.Body className="d-flex align-items-center">
                            <FaInfoCircle size={40} className="me-3" style={{ color: '#ff8c00' }} />
                            <div>
                              <h5 className="fw-semibold mb-1">Community Support</h5>
                              <p className="text-muted small mb-0">Join a vibrant community of learners and mentors.</p>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1, transform: 'rotate(45deg)' }}>
                      <FaLaptop size={100} style={{ color: '#4a00e0' }} />
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row className="g-4">
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
                        <Alert className="rounded-3">
                          No enrolled courses yet. <Link to="/courses">Explore courses</Link>.
                        </Alert>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6}>
                  <div className="d-flex flex-column gap-4">
                    <Cart />
                    <Wishlist />
                  </div>
                </Col>
              </Row>
            </>
          )}
          {section === 'syllabus' && (
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
                            <h5 className="fw-medium mb-0 d-flex align-items-center">
                              {course.icon}
                              {course.title}
                            </h5>
                          </Accordion.Header>
                          <Accordion.Body>
                            {course.sections.map((section, secIndex) => (
                              <div key={secIndex} className="mb-3">
                                <h6 className="fw-semibold">{section.section}</h6>
                                <ul className="list-group list-group-flush">
                                  {section.topics.map((topic, topicIndex) => (
                                    <li
                                      key={topicIndex}
                                      className="list-group-item border-0 ps-0 d-flex align-items-center"
                                      style={{ background: 'transparent' }}
                                    >
                                      {topic.icon && <span className="me-2">{topic.icon}</span>}
                                      <div>
                                        <strong>{topic.name}:</strong> {topic.description}
                                      </div>
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
          )}
          {section === 'courses' && (
            <Row>
              <Col>
                <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                  <Card.Header className="bg-white p-3">
                    <h4 className="fw-semibold mb-0">Explore All Courses</h4>
                  </Card.Header>
                  <Card.Body className="p-4">
                    {loadingCourses ? (
                      <div className="d-flex justify-content-center my-4">
                        <Spinner animation="border" />
                      </div>
                    ) : allCourses.length > 0 ? (
                      <Row xs={1} md={2} lg={3} className="g-4">
                        {allCourses.map((course) => (
                          <Col key={course._id}>
                            <CourseCard course={course} />
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <Alert variant="warning" className="rounded-3">
                        No courses available at the moment. Please check back later!
                      </Alert>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          {section === 'trackOrder' && (
            <Row>
              <Col>
                <Card className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                  <Card.Header className="bg-white p-3">
                    <h4 className="fw-semibold mb-0">Track Your Orders</h4>
                  </Card.Header>
                  <Card.Body className="p-4">
                    {loadingOrders ? (
                      <div className="text-center my-5">
                        <Spinner animation="border" variant="primary" role="status" />
                        <p className="mt-2 text-muted">Loading your orders...</p>
                      </div>
                    ) : error ? (
                      <Alert variant="danger" className="rounded-3 text-center">
                        {error}
                      </Alert>
                    ) : orders.length > 0 ? (
                      orders.map(order => (
                        <Card key={order._id} className="mb-4 shadow-sm" style={{ borderRadius: '12px' }}>
                          <Card.Header className="bg-light py-3">
                            <h4 className="mb-1">
                              Order #{order._id} -{' '}
                              <Badge bg={order.status === 'Completed' ? 'success' : 'warning'}>
                                {order.status}
                              </Badge>
                            </h4>
                            <p className="text-muted mb-0">Placed by: {order.username || 'Unknown'}</p>
                            <p className="text-muted mb-0">Date: {new Date(order.createdAt).toLocaleString()}</p>
                          </Card.Header>
                          <Card.Body className="p-4">
                            <ListGroup variant="flush">
                              {order.courses && order.courses.length > 0 ? (
                                order.courses.map((item, index) => (
                                  <ListGroup.Item key={index} className="border-0 py-2">
                                    {item.courseId?.title || 'Unknown Course'} - ₹{item.price?.toFixed(2) || 'N/A'} x{' '}
                                    {item.quantity || 1}
                                  </ListGroup.Item>
                                ))
                              ) : (
                                <ListGroup.Item>No courses found in this order.</ListGroup.Item>
                              )}
                            </ListGroup>
                            <Card.Text className="mt-3 fw-semibold">
                              <strong>Total:</strong> ₹{order.total?.toFixed(2) || 'N/A'}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      ))
                    ) : (
                      <Alert variant="info" className="rounded-3 text-center">
                        No orders found. Start by enrolling in a course!
                      </Alert>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </Col>
    </div>
  );
}

export default UserDashboard;