import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import './AboutPage.css';

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courses = [
    {
      title: 'AI & Machine Learning',
      desc: 'Advanced algorithms with TensorFlow and PyTorch.',
      icon: 'https://cdn-icons-png.freepik.com/512/8055/8055576.png',
    },
    {
      title: 'Web3 Development',
      desc: 'Blockchain and decentralized application design.',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
    },
    {
      title: 'Cloud Architecture',
      desc: 'Scalable solutions using AWS, Azure, and GCP.',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968696.png',
    },
    {
      title: 'Cybersecurity Essentials',
      desc: 'Secure systems with ethical hacking techniques.',
      icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921188.png',
    },
    {
      title: 'Data Science & Analytics',
      desc: 'Data-driven insights with Python, R, and SQL.',
      icon: 'https://cdn-icons-png.flaticon.com/512/2921/2921195.png',
    },
    {
      title: 'UI/UX Design Mastery',
      desc: 'User-centric design with Figma and Adobe XD.',
      icon: 'https://cdn-icons-png.flaticon.com/512/8092/8092976.png',
    },
    {
      title: 'DevOps Engineering',
      desc: 'Automation with Docker, Kubernetes, and CI/CD.',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968700.png',
    },
    {
      title: 'Full-Stack Development',
      desc: 'End-to-end applications with React and Node.js.',
      icon: 'https://thumbs.dreamstime.com/b/html-css-js-icon-set-web-development-logo-icon-set-html-css-javascript-programming-symbol-html-css-js-icon-set-web-178080904.jpg',
    },
    {
      title: 'Business Intelligence',
      desc: 'Strategic analytics with Power BI and Tableau.',
      icon: faBusinessTime,
    },
    {
      title: 'Internet of Things (IoT)',
      desc: 'Connected devices with Arduino and Raspberry Pi.',
      icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968754.png',
    },
    {
      title: 'Mobile App Development',
      desc: 'Native apps with Swift and Kotlin.',
      icon: 'https://cdn-icons-png.flaticon.com/512/6213/6213889.png',
    },
    {
      title: 'Digital Marketing',
      desc: 'SEO, SEM, and social media strategies.',
      icon: 'https://cdn-icons-png.flaticon.com/512/10828/10828182.png',
    },
    {
      title: 'Game Development',
      desc: 'Interactive experiences with Unity and Unreal.',
      icon: 'https://cdn-icons-png.flaticon.com/512/10081/10081739.png'
    },
    {
      title: 'Robotics Engineering',
      desc: 'Building intelligent machines with robotic systems.',
      icon: 'https://i.pinimg.com/236x/f2/80/90/f28090f7cf473f19c97008601b99dbae.jpg',
    },
  ];

  return (
    <div className="about-page">
      <Container fluid className="py-5 text-center" style={{ background: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }}>
        <h1 className="fw-bold mb-3" style={{ fontSize: '3.25rem', color: '#1f2937', letterSpacing: '-0.025em' }}>
          About Us
        </h1>
        <p className="lead" style={{ color: '#6b7280', maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem', lineHeight: '1.6' }}>
          Empowering the next generation of innovators with cutting-edge skills and knowledge.
        </p>
        <div className="mt-4">
          <img src="https://cdn-icons-png.flaticon.com/512/1087/1087840.png" alt="Learning Icon" style={{ width: '60px', marginRight: '20px' }} />
          <img src="https://cdn-icons-png.flaticon.com/512/2921/2921190.png" alt="Innovation Icon" style={{ width: '60px' }} />
        </div>
      </Container>

      <Container className="py-5">
        <Row className="align-items-center gx-5">
          <Col md={6} className="mb-4">
            <h2 className="fw-bold mb-4" style={{ fontSize: '2.25rem', color: '#1f2937' }}>
              Aims of SkillHub
            </h2>
            <p style={{ color: '#6b7280', lineHeight: '1.75', fontSize: '1.125rem' }}>
              Welcome to SkillHub, your trusted platform for purchasing high-quality courses designed to enhance your skills.
            </p>
            <p style={{ color: '#6b7280', lineHeight: '1.75', fontSize: '1.125rem' }}>
              Our mission is to bridge the gap between emerging technologies and practical expertise. We aim to:
            </p>
            <ul style={{ color: '#6b7280', paddingLeft: '25px', lineHeight: '2', fontSize: '1.125rem' }}>
              <li>Equip learners with in-demand skills for the future of work.</li>
              <li>Foster innovation through hands-on, real-world projects.</li>
              <li>Provide accessible, high-quality education to a global audience.</li>
              <li>Build a community of forward-thinking professionals.</li>
            </ul>
          </Col>
          <Col md={6} className="mb-4 text-center">
            <img src="https://www.pngarts.com/files/7/Online-Education-PNG-Transparent-Image.png" alt="Students learning in a tech classroom" className="img-fluid rounded" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </Col>
        </Row>
      </Container>

      <Container fluid className="py-5" style={{ background: '#e2e8f0' }}>
        <h2 className="text-center fw-bold mb-4" style={{ fontSize: '2.25rem', color: '#1f2937' }}>
          What Our Learners Say
        </h2>
        <div className="marquee">
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {[
                "SkillHub transformed my career with their practical courses!",
                "The offline classes and materials are top-notch.",
                "Learning Web3 here was a game-changer for me.",
                "The instructors are experts in their fields!",
              ].map((quote, idx) => (
                <div key={idx} className="testimonial-item px-4">
                  <p style={{ color: '#6b7280', fontStyle: 'italic', fontSize: '1.125rem', lineHeight: '1.5' }}>
                    "{quote}"
                  </p>
                </div>
              ))}
            </div>
            {/* Duplicate content for seamless looping */}
            <div className="marquee-content" aria-hidden="true">
              {[
                "SkillHub transformed my career with their practical courses!",
                "The offline classes and materials are top-notch.",
                "Learning Web3 here was a game-changer for me.",
                "The instructors are experts in their fields!",
              ].map((quote, idx) => (
                <div key={idx} className="testimonial-item px-4">
                  <p style={{ color: '#6b7280', fontStyle: 'italic', fontSize: '1.125rem', lineHeight: '1.5' }}>
                    "{quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container fluid className="py-5" style={{ background: '#f8fafc' }}>
        <h2 className="text-center fw-bold mb-5" style={{ fontSize: '2.25rem', color: '#1f2937' }}>
          Explore Future Courses
        </h2>
        <div className="marquee">
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {courses.map((course, idx) => (
                <div key={idx} className="course-item px-4 text-center">
                  {typeof course.icon === 'string' ? (
                    <img src={course.icon} alt={`${course.title} icon`} style={{ width: '60px', marginBottom: '12px' }} />
                  ) : (
                    <FontAwesomeIcon icon={course.icon} style={{ fontSize: '60px', marginBottom: '12px', color: '#1f2937' }} />
                  )}
                  <strong style={{ color: '#1f2937', fontSize: '1.25rem', display: 'block' }}>
                    {course.title}
                  </strong>
                  <p style={{ color: '#6b7280', margin: '0', fontSize: '1rem', lineHeight: '1.5' }}>
                    {course.desc}
                  </p>
                </div>
              ))}
            </div>
            {/* Duplicate content for seamless looping */}
            <div className="marquee-content" aria-hidden="true">
              {courses.map((course, idx) => (
                <div key={idx} className="course-item px-4 text-center">
                  {typeof course.icon === 'string' ? (
                    <img src={course.icon} alt={`${course.title} icon`} style={{ width: '60px', marginBottom: '12px' }} />
                  ) : (
                    <FontAwesomeIcon icon={course.icon} style={{ fontSize: '60px', marginBottom: '12px', color: '#1f2937' }} />
                  )}
                  <strong style={{ color: '#1f2937', fontSize: '1.25rem', display: 'block' }}>
                    {course.title}
                  </strong>
                  <p style={{ color: '#6b7280', margin: '0', fontSize: '1rem', lineHeight: '1.5' }}>
                    {course.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Container className="py-5">
        <h2 className="text-center fw-bold mb-5" style={{ fontSize: '2.25rem', color: '#1f2937' }}>
          Why Choose SkillHub?
        </h2>
        <Row className="text-center gx-5">
          <Col md={4} className="mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921198.png" alt="Expert Icon" style={{ width: '70px', marginBottom: '20px' }} />
            <h4 style={{ color: '#1f2937', fontSize: '1.5rem' }}>Expert-Led Courses</h4>
            <p style={{ color: '#6b7280', fontSize: '1.125rem', lineHeight: '1.6' }}>
              Learn from industry professionals with years of experience.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921185.png" alt="Practical Icon" style={{ width: '70px', marginBottom: '20px' }} />
            <h4 style={{ color: '#1f2937', fontSize: '1.5rem' }}>Hands-On Learning</h4>
            <p style={{ color: '#6b7280', fontSize: '1.125rem', lineHeight: '1.6' }}>
              Apply your skills through real-world projects and exercises.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921220.png" alt="Support Icon" style={{ width: '70px', marginBottom: '20px' }} />
            <h4 style={{ color: '#1f2937', fontSize: '1.5rem' }}>Community Support</h4>
            <p style={{ color: '#6b7280', fontSize: '1.125rem', lineHeight: '1.6' }}>
              Join a network of learners and mentors for ongoing support.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AboutPage;