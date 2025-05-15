const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/create', (req, res) => {
  const {
    rfq_name,
    rfq_description,
    rfq_unit,
    payment_terms,
    delivery_location,
    duration,
    supplier_name_subset,
    OWNER,
  } = req.body;

  const sql = 'CALL InsertRFQ(?, ?, ?, ?, ?, ?, ?, ?)';
  const params = [
    rfq_name,
    rfq_description,
    rfq_unit,
    payment_terms,
    delivery_location,
    duration,
    supplier_name_subset,
    OWNER,
  ];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error calling InsertRFQ:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    // results[0] contains the SELECT result from procedure
    const insertedRfq = results[0][0];

    // Auto-close logic (duration in minutes)
    setTimeout(() => {
      const closeSql = `UPDATE rfqs SET STATUS = 'closed' WHERE id = ?`;
      db.query(closeSql, [insertedRfq.id], (err) => {
        if (err) {
          console.error(`Failed to close RFQ ID ${insertedRfq.id}:`, err);
        } else {
          console.log(`RFQ ID ${insertedRfq.id} auto-closed after ${duration} minutes`);
        }
      });
    }, duration * 60 * 1000);

    res.json({ success: true, rfq: insertedRfq });
  });
});

module.exports = router;
