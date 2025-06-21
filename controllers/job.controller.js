const db = require("../config/db");

// Create a new job application
exports.createJob = (req, res) => {
  const { company_name, job_title, application_date, status, notes } = req.body;
  const user_id = req.user.id; 

  const query = `
    INSERT INTO job_applications (user_id, company_name, job_title, application_date, status, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [user_id, company_name, job_title, application_date, status, notes], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Job application added!" });
  });
};

// Get all jobs for the logged-in user
exports.getJobs = (req, res) => {
  const user_id = req.user.id;
  db.query("SELECT * FROM job_applications WHERE user_id = ?", [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Update a job application
exports.updateJob = (req, res) => {
  const { id } = req.params;
  const { company_name, job_title, application_date, status, notes } = req.body;

  const query = `
    UPDATE job_applications 
    SET company_name=?, job_title=?, application_date=?, status=?, notes=? 
    WHERE id=?
  `;
  db.query(query, [company_name, job_title, application_date, status, notes, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Job application updated!" });
  });
};

// Delete a job application
exports.deleteJob = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM job_applications WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Job application deleted!" });
  });
};
