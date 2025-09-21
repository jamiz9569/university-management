const mongoose = require("mongoose");
const connectToMongo = require("./database/db");

// Models
const AdminDetail = require("./models/details/admin-details.model");
const FacultyDetail = require("./models/details/faculty-details.model");
const StudentDetail = require("./models/details/student-details.model");
const Branch = require("./models/branch.model");

const seedData = async () => {
  try {
    await connectToMongo();
    console.log("Connected to MongoDB Successfully");

    // 1. Create or get a Branch
    let branch = await Branch.findOne({ code: "CSE101" });
    if (!branch) {
      branch = await Branch.create({
        name: "Computer Science and Engineering",
        code: "CSE101", // ✅ required
      });
      console.log("Created new branch:", branch.name);
    }

    // 2. Clear old data
    await AdminDetail.deleteMany({});
    await FacultyDetail.deleteMany({});
    await StudentDetail.deleteMany({});

    // 3. Create Admin
    const admin = await AdminDetail.create({
      employeeId: 123456,
      firstName: "Sundar",
      lastName: "Pichai",
      email: "admin@gmail.com",
      phone: "1234567890",
      profile: "Faculty_Profile_123456.jpg",
      address: "123 College Street",
      city: "College City",
      state: "State",
      pincode: "123456",
      country: "India",
      gender: "male",
      dob: new Date("1990-01-01"),
      designation: "System Administrator",
      joiningDate: new Date(),
      salary: 50000,
      status: "active",
      isSuperAdmin: true,
      emergencyContact: {
        name: "Emergency Contact",
        relationship: "Spouse",
        phone: "9876543210",
      },
      bloodGroup: "O+",
      password: "admin123",
    });

    // 4. Create Faculty (linked to branch)
    const faculty = await FacultyDetail.create({
      employeeId: 2001,
      firstName: "John",
      lastName: "Doe",
      email: "faculty@gmail.com",
      phone: "9876543211",
      address: "456 University Road",
      city: "College City",
      state: "State",
      pincode: "654321",
      country: "India",
      gender: "male",
      dob: new Date("1985-05-10"),
      designation: "Assistant Professor",
      joiningDate: new Date(),
      salary: 40000,
      status: "active",
      bloodGroup: "A+",
      password: "faculty123",
      branchId: branch._id, // ✅ Linked to branch
    });

    // 5. Create Student (linked to branch)
    const student = await StudentDetail.create({
      enrollmentNo: 1001,
      firstName: "Alice",
      middleName: "K",
      lastName: "Smith",
      email: "student@gmail.com",
      phone: "9876543212",
      semester: 5,
      address: "789 Hostel Lane",
      city: "College City",
      state: "State",
      pincode: "789123",
      country: "India",
      gender: "female",
      dob: new Date("2002-09-15"),
      status: "active",
      bloodGroup: "B+",
      password: "student123",
      branchId: branch._id, // ✅ Linked to branch
    });

    console.log("\n=== Seeded Accounts ===");
    console.log("Admin ->", admin.email, " / admin123");
    console.log("Faculty ->", faculty.email, " / faculty123");
    console.log("Student ->", student.email, " / student123");
    console.log("========================\n");

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error while seeding:", error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
};

// ✅ Call the function
seedData();
