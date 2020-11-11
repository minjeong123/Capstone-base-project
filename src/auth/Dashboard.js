// import React, { useState } from "react";
// // import { Card, Button, Alert } from "react-bootstrap";
// import { Link, useHistory } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import { Card, Button } from "@material-ui/core";
// import Alert from "@material-ui/lab/Alert";
// import AlertTitle from "@material-ui/lab/AlertTitle";

// export default function Dashboard() {
//   const [error, setError] = useState("");
//   const { currentUser, logout } = useAuth();
//   const history = useHistory();

//   async function handleLogout() {
//     setError("");

//     try {
//       await logout();
//       history.push("/");
//     } catch {
//       setError("Failed to log out");
//     }
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Profile</h2>
//           {error && (
//             <Alert severity="error">
//               <AlertTitle>Error</AlertTitle>
//               This is an error alert — <strong>{error}</strong>
//             </Alert>
//           )}
//           <strong>Email:</strong>
//           {currentUser.email}
//           <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
//             Update Profile
//           </Link>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         <Button
//           variant="contained"
//           color="secondary"
//           variant="link"
//           onClick={handleLogout}
//         >
//           Log Out
//         </Button>
//       </div>
//     </>
//   );
// }
