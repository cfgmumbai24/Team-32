import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CourseCards = () => {
  const [courses, setCourses] = useState([]); // State to hold course data

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3010/api/getAllCourse');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []); 
  
  
  // Empty dependency array means this effect runs only once after the initial render

  return (
    <div className="flex flex-wrap justify-center mt-10">
      {courses.map(course => (
        <div key={course.id} className="p-4 max-w-sm">
          <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
            <div className="flex items-center mb-3">
              <div
                className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0"
              >
                {/* Icon Placeholder */}
              </div>
              <h2 className="text-white text-lg font-medium">{course.title}</h2>
            </div>
            <div className="flex flex-col justify-between flex-grow">
              <p className="leading-relaxed text-base text-white">
                <strong>Instructor:</strong> {course.instructor} {/* Adjusted from company to instructor */}
              </p>
              <p className="leading-relaxed text-base text-white">
                <strong>Description:</strong> {course.description}
              </p>
              <p className="leading-relaxed text-base text-white">
                <strong>Contact:</strong> {course.contact} {/* Adjust if necessary */}
              </p>
              <Link to={`/course/${course.id}`} className="mt-3 text-black hover:text-blue-600 inline-flex items-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseCards;
