// routes/user.js
const express = require('express');
const router = express.Router();
const db = require('../db');



// Update user profile
router.post('/update-profile', (req, res) => {
  const { mobile, username, email, owner_number, purchase_number, gst_numbers, addresses } = req.body;

  if (!mobile) return res.status(400).json({ success: false, message: 'Mobile number is required' });

  const updateQuery = `
    UPDATE users
    SET username = ?, email = ?, trusted_supplier = ?, address = ?
    WHERE mobile = ?
  `;

  const jsonSuppliers = JSON.stringify({
    gst_numbers: gst_numbers || [],
    purchase_number,
    owner_number,
  });

  const fullAddress = Array.isArray(addresses) ? addresses.join('; ') : addresses;

  db.query(
    updateQuery,
    [username, email, jsonSuppliers, fullAddress, mobile],
    (err) => {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ success: false, message: 'Database error' });
      }
      res.json({ success: true, message: 'Profile updated successfully' });
    }
  );
});

// module.exports = router;


// Update company info
router.post('/update-company', (req, res) => {
  const { mobile, company_name, gst_number, pan_number, address, email, employee_number } = req.body;

  // Identify missing fields
  const missingFields = [];
  if (!mobile) missingFields.push('mobile');
  if (!company_name) missingFields.push('company_name');
  if (!gst_number) missingFields.push('gst_number');
  if (!email) missingFields.push('email');

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  const query = `
    UPDATE users SET
      company_name = ?,
      gst_number = ?,
      pan_number = ?,
      address = ?,
      email = ?,
      employee_number = ?
    WHERE mobile = ?
  `;

  db.query(
    query,
    [company_name, gst_number, pan_number, address, email, employee_number, mobile],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY' && err.sqlMessage.includes('email')) {
          return res.status(400).json({
            success: false,
            message: 'The email address is already in use. Please use a different email.'
          });
        }

        console.error('DB Update Error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error'
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        message: 'Company info updated successfully'
      });
    }
  );
});



// module.exports = router;

router.post('/create-user', async (req, res) => {
  const { mobile, username, role } = req.body;

  if (!mobile || !username || !role) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Step 1: Check if user already exists
  const checkQuery = 'SELECT id FROM users WHERE mobile = ?';
  db.query(checkQuery, [mobile], async (checkErr, results) => {
      if (checkErr) {
          console.error('DB Check Error:', checkErr);
          return res.status(500).json({ success: false, message: 'Database error during check' });
      }

      if (results.length > 0) {
          // User already exists, update
          const updateQuery = `
              UPDATE users SET username = ?, description = ? WHERE mobile = ?
          `;
          db.query(updateQuery, [username, role, mobile], (updateErr) => {
              if (updateErr) {
                  console.error('DB Update Error:', updateErr);
                  return res.status(500).json({ success: false, message: 'Database error during update' });
              }
              return res.json({ success: true, message: 'User updated' });
          });
      } else {
          // Step 2: Insert with retry mechanism
          try {
              const maxRetries = 5;
              let success = false;
              let newId;
              let attempt = 0;

              while (!success && attempt < maxRetries) {
                  newId = generateRandomId();
                  const insertQuery = `
                      INSERT INTO users (id, mobile, username, description)
                      VALUES (?, ?, ?, ?)
                  `;

                  try {
                      await new Promise((resolve, reject) => {
                          db.query(insertQuery, [newId, mobile, username, role], (insertErr) => {
                              if (insertErr) {
                                  if (insertErr.code === 'ER_DUP_ENTRY') {
                                      attempt++;
                                      console.warn(`ID collision detected, retrying... (${attempt})`);
                                      resolve(); // Retry loop continues
                                  } else {
                                      reject(insertErr);
                                  }
                              } else {
                                  success = true;
                                  resolve();
                              }
                          });
                      });
                  } catch (insertErr) {
                      console.error('DB Insert Error:', insertErr);
                      return res.status(500).json({ success: false, message: 'Database error during insert' });
                  }
              }

              if (success) {
                  return res.json({ success: true, message: 'User created', id: newId });
              } else {
                  return res.status(500).json({ success: false, message: 'Failed to create unique user ID after multiple attempts' });
              }
          } catch (error) {
              console.error('Unexpected Error:', error);
              return res.status(500).json({ success: false, message: 'Unexpected server error' });
          }
      }
  });
});

// ID generator
function generateRandomId(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}



router.post('/check-info', (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ success: false, message: 'Mobile number is required' });
  }

  const sql = 'CALL CheckCompanyInfo(?)';

  db.query(sql, [mobile], (err, results) => {
    if (err) {
      console.error('Stored procedure error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    const resultSet = results[0]; // Stored procedures return an array of result sets
    if (!resultSet || resultSet.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = resultSet[0]; // Extract user from the result set
    const hasCompanyInfo = Boolean(user.hasCompanyInfo);

    // Prepare response data
    const responseUser = {
      mobile: user.mobile,            // Include mobile
      username: user.username,        // Include username
      description: user.role,         // Use the alias 'role' for 'description'
    };

    return res.json({
      success: true,
      hasCompanyInfo,
      user: responseUser,             // Send the extracted user info
    });
  });
});




module.exports = router;