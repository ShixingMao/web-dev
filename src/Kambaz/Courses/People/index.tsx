// Updated People component with proper TypeScript error handling

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import PeopleTable from "./Table";
import PeopleDetails from "./Details";
import * as client from "../client";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadCourseUsers = async () => {
      try {
        setLoading(true);
        console.log("Fetching users for course:", cid);
        
        if (cid) {
          const users = await client.findUsersForCourse(cid);
          console.log("Users returned from API:", users);
          setUsers(users || []);
        }
      } catch (error) {
        console.error("Error loading course users:", error);
        // Handle the unknown type properly
        setErrorMessage(
          error instanceof Error 
            ? error.message 
            : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    
    loadCourseUsers();
  }, [cid]);

  // Display loading state
  if (loading) {
    return <div>Loading course participants...</div>;
  }
  
  // Display error state
  if (errorMessage) {
    return <div className="alert alert-danger">Error loading users: {errorMessage}</div>;
  }

  // Display empty state
  if (users.length === 0) {
    return (
      <div>
        <h2>Course Participants</h2>
        <div className="alert alert-info">No users are enrolled in this course.</div>
      </div>
    );
  }

  // Display users table with routes
  return (
    <div>
      <Routes>
        <Route path="/" element={<PeopleTable users={users} />} />
        <Route path=":uid" element={<PeopleDetails />} />
      </Routes>
    </div>
  );
}