import React, { useEffect, useState } from "react";
import { getStudentsWithResults } from "../../services/dataService";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await getStudentsWithResults();
        setStudents(studentData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch student data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Student Details</h2>
      {students.length > 0 ? (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              <h3>Email: {student.email}</h3>
              <ul>
                {student.results.map((result, i) => (
                  <li key={i}>
                    {result.subject.toUpperCase()}: {result.score}/{result.total}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default StudentDetails;
