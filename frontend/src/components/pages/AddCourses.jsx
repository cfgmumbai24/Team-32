import  { useState } from 'react';

function CourseForm() {
    const [course, setCourse] = useState({
        name: '',
        description: '',
        duration: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent the form from refreshing the page
        const token = await localStorage.getItem('auth-token'); // Retrieve the token from localStorage

        try {
            const response = await fetch('http://localhost:3010/api/insertCourse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`  // Set the auth token in the header
                },
                body: JSON.stringify(course)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Course added:', data);
            // Handle success (e.g., show a success message or clear the form)
        } catch (error) {
            console.error('Failed to add course:', error);
            // Handle errors (e.g., show an error message)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Course Name:
                <input type="text"
                    name="title"
                    value={course.name}
                    onChange={handleChange}className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        
             
            </label>
            <label>
                Description:
                <textarea type="text"
                   name="description"
                   value={course.description}
                   onChange={handleChange} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        
                
            </label>
            <label>
                Links:
                <input
                    name="links"
                    value={course.links}
                    onChange={handleChange}  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        
                
            </label>
            <button type="submit" className='bg-green-50  '>Confirm</button>
        </form>
    );
}

export default CourseForm;
