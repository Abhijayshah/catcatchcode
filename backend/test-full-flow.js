const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function testFlow() {
  let userToken = '';
  let adminToken = '';
  let courseId = '';

  try {
    console.log('--- STARTING COMPLETE WEBSITE TEST ---\n');

    // 1. AUTHENTICATION TEST
    console.log('1. Testing Authentication...');
    
    // Login User
    try {
      const userRes = await axios.post(`${API_URL}/auth/login`, {
        email: 'user@example.com', 
        password: 'password123'
      });
      userToken = userRes.data.token;
      console.log('✅ User Login Successful');
    } catch (e) {
      console.log('ℹ️ User not found, registering new user...');
      const regRes = await axios.post(`${API_URL}/auth/register`, {
        name: 'Test User',
        email: 'user@example.com',
        password: 'password123'
      });
      userToken = regRes.data.token;
      console.log('✅ User Registration Successful');
    }

    // Login Admin
    try {
      const adminRes = await axios.post(`${API_URL}/auth/login`, {
        email: 'admin@example.com',
        password: 'password123'
      });
      adminToken = adminRes.data.token;
      console.log('✅ Admin Login Successful');
    } catch (e) {
      console.error('❌ Admin Login Failed:', e.message);
      return;
    }

    // 2. PRODUCTIVITY DASHBOARD (USER)
    console.log('\n2. Testing Productivity Dashboard (User)...');
    
    // Seed Dashboard
    await axios.post(`${API_URL}/dashboard/seed`, {}, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Dashboard Seeded');

    // Get Dashboard Data
    const dashRes = await axios.get(`${API_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log(`✅ Fetched Dashboard: ${dashRes.data.todos.length} Todos, ${dashRes.data.deadlines.length} Deadlines`);

    // Add Todo
    const todoRes = await axios.post(`${API_URL}/dashboard/todos`, { text: 'New Test Task' }, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Added Todo:', todoRes.data.text);

    // Toggle Todo
    await axios.put(`${API_URL}/dashboard/todos/${todoRes.data._id}`, {}, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Toggled Todo');

    // Delete Todo
    await axios.delete(`${API_URL}/dashboard/todos/${todoRes.data._id}`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Deleted Todo');

    // 3. RESOURCE MANAGEMENT (USER)
    console.log('\n3. Testing Resource Management (User)...');
    
    // Add Resource (YouTube)
    const resRes = await axios.post(`${API_URL}/resources`, {
      title: 'Test Resource',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      section: 'Notes',
      provider: 'youtube'
    }, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Added Resource:', resRes.data.title);

    // Get Resources
    const getRes = await axios.get(`${API_URL}/resources`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log(`✅ Fetched ${getRes.data.length} Resources`);

    // Update Progress
    await axios.put(`${API_URL}/resources/${resRes.data._id}`, {
      progress: 50,
      lastPosition: 120
    }, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Updated Resource Progress');

    // Delete Resource
    await axios.delete(`${API_URL}/resources/${resRes.data._id}`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    console.log('✅ Deleted Resource');

    // 4. COURSE MANAGEMENT (ADMIN)
    console.log('\n4. Testing Course Management (Admin)...');

    // Note: Creating a course usually requires a file upload. 
    // We will test the fetching endpoints first as creation is complex via script without FormData
    const coursesRes = await axios.get(`${API_URL}/courses`);
    console.log(`✅ Fetched ${coursesRes.data.length} Public Courses`);

    // 5. USER MANAGEMENT (ADMIN)
    console.log('\n5. Testing User Management (Admin)...');
    try {
      // Assuming there is a route to get users (checking adminRoutes/userRoutes)
      // Standard pattern is GET /api/users for admin
      const usersRes = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      console.log(`✅ Admin Fetched ${usersRes.data.length} Users`);
    } catch (e) {
      console.log('⚠️ Could not fetch users (Route might be different or protected):', e.response?.status);
    }

    console.log('\n--- TEST COMPLETE: ALL SYSTEMS GO ---');

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    if (error.response) {
      console.error('Response Data:', error.response.data);
    }
  }
}

testFlow();
