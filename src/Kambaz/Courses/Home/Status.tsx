export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <h2>Course Status</h2>

      {/* Horizontal group for Unpublish and Publish */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button>Unpublish</button>
        <button>Publish</button>
      </div>

      {/* Vertical buttons */}
      <button>Import Existing Content</button>
      <button>Import from Commons</button>
      <button>Choose Home Page</button>
      <button>View Course Stream</button>
      <button>New Announcement</button>
      <button>New Analytics</button>
      <button>View Course Notifications</button>
    </div>
  );
}
