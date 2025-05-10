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

module.exports = router;


// Update company info
router.post('/update-company', (req, res) => {
  const { mobile, username, gst_number, pan_number, address, email, employee_number } = req.body;

  if (!mobile || !username || !gst_number || !email) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const query = `
    UPDATE users SET
      username = ?,
      gst_number = ?,
      pan_number = ?,
      address = ?,
      email = ?,
      employee_number = ?
    WHERE mobile = ?
  `;

  db.query(query, [username, gst_number, pan_number, address, email, employee_number, mobile], (err, result) => {
    if (err) {
      console.error('DB Update Error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Company info updated' });
  });
});

module.exports = router;

router.post('/create-user', (req, res) => {
  const { mobile, username, role } = req.body;

  if (!mobile || !username || !role) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const query = `
    INSERT INTO users (mobile, username, description)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE username = VALUES(username), description = VALUES(description)
  `;

  db.query(query, [mobile, username, role], (err) => {
    if (err) {
      console.error('DB Insert Error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true, message: 'User saved' });
  });
});

module.exports = router;

// Check if user's company information exists
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
      return res.status(404).json({ success: true, hasCompanyInfo: false, message: 'User not found' });
    }

    const user = resultSet[0];
    const hasCompanyInfo = Boolean(user.hasCompanyInfo);

    return res.json({
      success: true,
      hasCompanyInfo,
      user: hasCompanyInfo ? user : null
    });
  });
});

module.exports = router;