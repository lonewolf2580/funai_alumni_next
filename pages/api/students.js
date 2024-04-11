// pages/api/students.js

export default function handler(req, res) {
  
    const students = [
      { id: 1, fullName: 'John Doe', regNumber: '12345', faculty: 'Engineering', department: 'Computer Science' },
      { id: 2, fullName: 'Jane Smith', regNumber: '54321', faculty: 'Science', department: 'Biology' },
      { id: 3, fullName: 'Alice Johnson', regNumber: '67890', faculty: 'Arts', department: 'History' },
      { id: 4, fullName: 'Bob Williams', regNumber: '13579', faculty: 'Medicine', department: 'Anatomy' },
      { id: 5, fullName: 'Eva Davis', regNumber: '24680', faculty: 'Business', department: 'Marketing' },
      { id: 6, fullName: 'Michael Brown', regNumber: '35791', faculty: 'Law', department: 'Criminal Justice' },
      { id: 7, fullName: 'Sarah Miller', regNumber: '46802', faculty: 'Social Sciences', department: 'Psychology' },
      { id: 8, fullName: 'David Anderson', regNumber: '57913', faculty: 'Education', department: 'English' },
      { id: 9, fullName: 'Laura Garcia', regNumber: '68024', faculty: 'Architecture', department: 'Urban Planning' },
      { id: 10, fullName: 'James Wilson', regNumber: '79135', faculty: 'Design', department: 'Graphic Design' },
    ];
  
    res.status(200).json(students);
  }
  