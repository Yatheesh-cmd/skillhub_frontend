import { Container, Row, Col } from 'react-bootstrap';

function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <Container fluid className="py-5 text-center" style={{ background: 'linear-gradient(to bottom, #f7f8fa, #ffffff)' }}>
        <h1 className="fw-bold mb-3" style={{ fontSize: '3rem', color: '#1a202c' }}>About Us</h1>
        <p className="lead" style={{ color: '#4a5568', maxWidth: '800px', margin: '0 auto' }}>
          Empowering the next generation of innovators with cutting-edge skills and knowledge.
        </p>
      </Container>

      {/* Aims Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6} className="mb-4">
            <h2 className="fw-bold mb-4" style={{ fontSize: '2.2rem', color: '#1a202c' }}> Aims of SkillHub</h2>
            <p style={{ color: '#4a5568', lineHeight: '1.7' }}>
            Welcome to SkillHub, your trusted platform for purchasing high-quality courses designed to enhance your skills. Our professional and widely experienced team is dedicated to curating the best learning materials for you. Please note that SkillHub is solely a course purchasing site related to institute learning—classes are conducted offline, and all materials are provided to support your in-person education.
              At this mission is to bridge the gap between emerging technologies and practical expertise. We aim to:
            </p>
            <ul style={{ color: '#4a5568', paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Equip learners with in-demand skills for the future of work.</li>
              <li>Foster innovation through hands-on, real-world projects.</li>
              <li>Provide accessible, high-quality education to a global audience.</li>
              <li>Build a community of forward-thinking professionals and problem-solvers.</li>
            </ul>
          </Col>
          <Col md={6} className="mb-4">
            <img
              src="https://www.pngarts.com/files/7/Online-Education-PNG-Transparent-Image.png"
              alt="Students learning in a tech classroom"
              className="img-fluid rounded "
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
          </Col>
        </Row>
      </Container>

      {/* Courses Section - Text List */}
      <Container fluid className="py-5" style={{ background: '#f7f8fa' }}>
        <h2 className="text-center fw-bold mb-5" style={{ fontSize: '2.2rem', color: '#1a202c' }}>Providing Courses </h2>
        <Container>
          <ul style={{ color: '#4a5568', paddingLeft: '0', listStyle: 'none', maxWidth: '700px', margin: '0 auto' }}>
            {[
              { 
                title: 'AI & Machine Learning', 
                desc: 'Master the art of building intelligent systems using TensorFlow, PyTorch, and advanced algorithms.' 
              },
              { 
                title: 'Web3 Development', 
                desc: 'Dive into blockchain technology, smart contracts, and decentralized app development.' 
              },
              { 
                title: 'Cloud Architecture', 
                desc: 'Learn to design scalable, secure solutions with AWS, Azure, and modern cloud practices.' 
              },
              { 
                title: 'Cybersecurity', 
                desc: 'Develop ethical hacking skills to protect systems and data in an interconnected world.' 
              },
              { 
                title: 'Python Programming', 
                desc: 'Gain expertise in Python for data analysis, automation, and software development.' 
              },
              { 
                title: 'MERN Stack Development', 
                desc: 'Build full-stack web applications using MongoDB, Express.js, React, and Node.js.' 
              },
              { 
                title: 'Digital Marketing', 
                desc: 'Master SEO, social media, and content strategies to drive online success.' 
              },
              { 
                title: 'Flutter Development', 
                desc: 'Create cross-platform mobile apps with Flutter and Dart for iOS and Android.' 
              },
              { 
                title: 'Django Web Development', 
                desc: 'Develop robust, scalable web applications using the Django framework and Python.' 
              },
              { 
                title: 'Data Science', 
                desc: 'Analyze and interpret complex data using Python, R, and machine learning techniques.' 
              },
            ].map((course, idx) => (
              <li key={idx} style={{ marginBottom: '1.5rem' }}>
                <strong style={{ color: '#1a202c', fontSize: '1.2rem' }}>{course.title}:</strong>
                <span style={{ marginLeft: '0.5rem', color: '#4a5568' }}>{course.desc}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Container>
    </div>
  );
}

export default AboutPage;