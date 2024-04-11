// pages/api/user/[id].js

export default function handler(req, res) {
    const { id } = req.query;
  
    // Fetch user data based on the ID (replace this with your actual data fetching logic)
    const user = {
      id: id,
      fullName: 'John Doe',
      regNumber: '12345',
      faculty: 'Engineering',
      department: 'Computer Science',
      occupation: 'Software Engineer',
      memberOfProfessionalBody: 'IEEE',
      hobbies: ['Reading', 'Traveling', 'Cooking'],
      passportImage: 'https://media.istockphoto.com/id/916523912/photo/portrait-of-young-african-woman-against-white-background.jpg?s=1024x1024&w=is&k=20&c=GBTpngQxvxXLgr0l8JGwPb_BXMBVgpM668eFN9bnAIk=', // Passport image link
      // Add more user data as needed
    };
  
    res.status(200).json(user);
  }
  