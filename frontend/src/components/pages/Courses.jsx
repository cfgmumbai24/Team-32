
import CourseCard from '../CourseCard';

// import CourseForm from './AddCourses';
const Courses = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      {/* <h1 className="text-2xl font-bold mb-4">Add Course</h1>
      <CourseForm/> */}
      <CourseCard />
    </div>
  );
};

export default Courses;