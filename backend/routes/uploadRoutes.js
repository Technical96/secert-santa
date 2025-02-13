const express = require('express');
const multer = require('multer');
const AssignmentService = require('../services/AssignmentService');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.fields([{ name: 'employeeFile' }, { name: 'previousAssignmentsFile' }]), async (req, res) => {
    try {
      const result = await AssignmentService.processFiles(req.files);
      res.json(result);
    } catch (error) {
      console.error('Error processing files:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;