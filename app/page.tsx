"use client";

import { useEffect, useState, FormEvent } from "react";

type Job = {
  id: number;
  title: string;
  company: string;
  city: string;
  salary: number;
  job_type: string;
};

const API_URL = "http://localhost:8080/api/jobs";
const AUTH_HEADERS = {
  Authorization: `Basic ${btoa("admin:admin123")}`,
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [salary, setSalary] = useState("");
  const [job_type, setJobType] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function loadJobs() {
    try {
      const response = await fetch(API_URL, {
        headers: AUTH_HEADERS,
      });

      if (!response.ok) {
        throw new Error("Could not load jobs.");
      }

      const data: Job[] = await response.json();
      setJobs(data);
      setError("");
    } catch {
      setError("Cannot connect to the API. Check Spring Boot.");
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  function clearForm() {
    setTitle("");
    setCompany("");
    setCity("");
    setSalary("");
    setJobType("");
    setEditingId(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const job = {
      title,
      company,
      city,
      salary: Number(salary),
      job_type,
    };

    try {
      const response = await fetch(
        editingId === null ? API_URL : `${API_URL}/${editingId}`,
        {
          method: editingId === null ? "POST" : "PUT",
          headers: {
            ...AUTH_HEADERS,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        },
      );

      if (!response.ok) {
        throw new Error("Could not save job.");
      }

      clearForm();
      await loadJobs();
    } catch {
      setError("Failed to save the job.");
    }
  }

  function editJob(job: Job) {
    setEditingId(job.id);
    setTitle(job.title);
    setCompany(job.company);
    setCity(job.city);
    setSalary(String(job.salary));
    setJobType(job.job_type);
  }

  async function deleteJob(id: number) {
    if (!window.confirm("Delete this job?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: AUTH_HEADERS,
      });

      if (!response.ok) {
        throw new Error("Could not delete job.");
      }

      await loadJobs();
    } catch {
      setError("Failed to delete the job.");
    }
  }

  return (
    <main className="container">
      <h1>Job Management System</h1>

      <h2>{editingId === null ? "Add Job" : "Update Job"}</h2>

      <form onSubmit={handleSubmit} className="job-form">
        <input
          placeholder="Job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />

        <select
          value={job_type}
          onChange={(e) => setJobType(e.target.value)}
          required
        >
          <option value="">Select Job Type</option>
          <option value="FULL_TIME">Full Time</option>
          <option value="PART_TIME">Part Time</option>
          <option value="CONTRACT">Contract</option>
          <option value="INTERNSHIP">Internship</option>
        </select>

        <button type="submit">
          {editingId === null ? "Add Job" : "Save Changes"}
        </button>

        {editingId !== null && (
          <button type="button" onClick={clearForm}>
            Cancel
          </button>
        )}
      </form>

      {error && <p className="error">{error}</p>}

      <h2>All Jobs</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Company</th>
              <th>City</th>
              <th>Salary</th>
              <th>Job Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.city}</td>
                <td>{Number(job.salary).toFixed(2)}</td>
                <td>{job.job_type}</td>
                <td>
                  <button onClick={() => editJob(job)}>Edit</button>{" "}
                  <button
                    className="delete-button"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {jobs.length === 0 && (
              <tr>
                <td colSpan={7}>No jobs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
