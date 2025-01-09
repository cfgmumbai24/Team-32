# Team-32

# Margshala Web Application

## Overview

The web application is designed to seamlessly integrate the offerings of Khojhshala and Swarozgar Yojana, providing users with a scalable, easily navigable, and personalized learning experience. The platform aims to transition users smoothly from courses to mentorship opportunities, and ultimately connect them with job opportunities. 

## Key Features

### Without Login:
- **View Courses and Posts**: Access a wide range of courses and community posts.
- **View Jobs**: Browse job listings available on the platform.

### With Login:
- **Track Course Progress**: Monitor your learning journey and milestones.
- **Access More Courses**: Unlock additional courses tailored to your needs.
- **Personalized Recommendations**: Receive job and mentor recommendations based on your profile.
- **Apply for Jobs**: Directly apply for job listings.
- **Course Filtering**: Filter courses based on user interactions and preferences.
- **Progress Validation**: Validate your progress through quick questions mapped to course keywords.
- **Mentor Connections**: Connect with mentors based on personalized recommendations.
- **Forum Access**: Engage with posts by mentors and access curated content.

### Future Enhancements:
- **Job Extraction from Flyers**: Extract job information from photos of flyers uploaded by any common user.
- **Community-driven Content Creation**: Enable users to contribute tutorials, articles, and case studies.
- **Multilingual Support**: Offer content in multiple languages for broader accessibility.

## Technical Methodology

### System Architecture:
1. **Frontend**: Built with React.js for a responsive and dynamic user experience.
2. **Backend**: 
    - **Express Server**: Handles API requests and server-side logic.
    - **Databases**:
        - **PostgreSQL**: Stores user data.
        - **MongoDB**: Stores content, job listings, and courses uploaded by privileged users.
3. **Machine Learning**: 
    - **Keyword Extraction**: Utilizes GloVe and cosine similarity to extract keywords from MongoDB content descriptions.
    - **Personalized Recommendations**: Maps user keywords with MongoDB data to provide personalized feeds and suggestions.

### Data Flow:
1. **User Login**: Users log into the web app, which authenticates against the Express server.
2. **Data Storage**: 
    - User data is saved in PostgreSQL.
    - Content, job listings, and courses are stored in MongoDB.
3. **Content Management**: Privileged users upload content to MongoDB.
4. **Keyword Extraction**: ML models extract keywords from MongoDB content descriptions.
5. **Personalized Feed**: User interactions and keywords are mapped to MongoDB data for personalized recommendations.
 <br /> <br /> The code ("Code") in this repository was created solely by the student teams during a coding competition hosted by JPMorgan Chase Bank, N.A. ("JPMC"). JPMC did not create or contribute to the development of the Code. This Code is provided AS IS and JPMC makes no warranty of any kind, express or implied, as to the Code, including but not limited to, merchantability, satisfactory quality, non-infringement, title or fitness for a particular purpose or use.