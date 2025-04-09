import { Container, Navbar, Nav } from 'react-bootstrap';
import LearnMoreSection from '../pagesof/LearnMoreSection'

const LearnMorePage = () => {
  return (
    <>
      {/* Navigation Bar */}
    
      {/* Main Content */}
      <LearnMoreSection />

      {/* Footer */}
      <footer className="bg-dark text-center text-white py-4 mt-5">
        <Container>
          <p>&copy; {new Date().getFullYear()} SkillHub. All rights reserved.</p>
          <p>
            <a href="/terms" className="text-white text-decoration-none me-3">
              Terms
            </a>
            <a href="/privacy" className="text-white text-decoration-none">
              Privacy
            </a>
          </p>
        </Container>
      </footer>
    </>
  );
};

export default LearnMorePage;