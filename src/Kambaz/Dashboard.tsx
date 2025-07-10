// import { Link } from "react-router-dom";
// import { Row, Col, Card } from 'react-bootstrap';
// export default function Dashboard() {
//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
//       <div id="wd-dashboard-courses">
//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/1234/Home"
//             className="wd-dashboard-course-link" >
//             <img src="/images/reactjs.jpg" width={200} />
//             <div>
//               <h5> CS1234 React JS </h5>
//               <p className="wd-dashboard-course-title">
//                 Full Stack software developer  </p>
//               <button> Go </button>
//             </div>
//           </Link>
//         </div>
//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/2345/Home" className="wd-dashboard-course-link">
//             <img src="/images/reactjs.jpg" width={200} />
//             <div>
//               <h5>CS2345 Node JS</h5>
//               <p className="wd-dashboard-course-title">Backend Development</p>
//               <button>Go</button>
//             </div>
//           </Link>
//         </div>
//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/3456/Home" className="wd-dashboard-course-link">
//             <img src="/images/reactjs.jpg" width={200} />
//             <div>
//               <h5>CS3456 MongoDB</h5>
//               <p className="wd-dashboard-course-title">Database Management</p>
//               <button>Go</button>
//             </div>
//           </Link>
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/4567/Home" className="wd-dashboard-course-link">
//             <img src="/images/reactjs.jpg" width={200} />
//             <div>
//               <h5>CS4567 Python</h5>
//               <p className="wd-dashboard-course-title">Data Science Essentials</p>
//               <button>Go</button>
//             </div>
//           </Link>
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link">
//             <img src="/images/reactjs.jpg" width={200} />
//             <div>
//               <h5>CS5678 Angular</h5>
//               <p className="wd-dashboard-course-title">Frontend Engineering</p>
//               <button>Go</button>
//             </div>
//           </Link>
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/6789/Home" className="wd-dashboard-course-link">
//             <img src="/images/reactjs.jpg" width={200} />
//             <div>
//               <h5>CS6789 Java</h5>
//               <p className="wd-dashboard-course-title">Object-Oriented Programming</p>
//               <button>Go</button>
//             </div>
//           </Link>
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/7890/Home" className="wd-dashboard-course-link">
//             <img src="/images/reactjs.jpg" width={200} />
//             <div>
//               <h5>CS7890 HTML & CSS</h5>
//               <p className="wd-dashboard-course-title">Web Design Basics</p>
//               <button>Go</button>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS1234 React JS
                  </Card.Title>
                  <Card.Text
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    Full Stack software developer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link to="/Kambaz/Courses/2345/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS2345 Node JS
                  </Card.Title>
                  <Card.Text style={{ height: "100px" }} className="overflow-hidden">
                    Backend Development
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link to="/Kambaz/Courses/3456/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS3456 MongoDB
                  </Card.Title>
                  <Card.Text style={{ height: "100px" }} className="overflow-hidden">
                    Database Management
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link to="/Kambaz/Courses/4567/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS4567 Python
                  </Card.Title>
                  <Card.Text style={{ height: "100px" }} className="overflow-hidden">
                    Data Science Essentials
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS5678 Angular
                  </Card.Title>
                  <Card.Text style={{ height: "100px" }} className="overflow-hidden">
                    Frontend Engineering
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link to="/Kambaz/Courses/6789/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS6789 Java
                  </Card.Title>
                  <Card.Text style={{ height: "100px" }} className="overflow-hidden">
                    Object-Oriented Programming
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "260px" }}>
            <Card>
              <Link to="/Kambaz/Courses/7890/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    CS7890 HTML & CSS
                  </Card.Title>
                  <Card.Text style={{ height: "100px" }} className="overflow-hidden">
                    Web Design Basics
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

