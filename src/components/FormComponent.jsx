import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Snackbar,
  Alert,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

const FormComponent = () => {
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    date: today,
    person_name: "",
    profile: "",
    company_name: "",
    progress: `connection request sent on: ${today}`,
    additional: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    if (name === "additional") {
      updatedData.progress = `connection request sent on: ${today}`;
      updatedData.additional = `${value}`;
    }
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      await axios.post("https://sheet-entry-backend-git-master-nilesh133s-projects.vercel.app/api/save", {
        Date: formData.date,
        Person: formData.person_name,
        Profile: formData.profile,
        Company: formData.company_name,
        Progress: formData.progress,
        Additional: formData.additional,
      });
      setSuccess(true);
      setFormData({
        date: today,
        person_name: "",
        profile: "",
        company_name: "",
        progress: `connection request sent on: ${today}`,
        additional: "",
      });
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} style={{ height: "100vh" }}>
        <Grid item xs={6}>
        {loading && <LinearProgress />}
        <form onSubmit={handleSubmit} style={{width: "400px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                name="date"
                value={formData.date}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="person_name"
                value={formData.person_name}
                onChange={handleChange}
                error={!!errors.person_name}
                helperText={errors.person_name || ""}
                placeholder="Enter Person Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="profile"
                value={formData.profile}
                onChange={handleChange}
                error={!!errors.profile}
                helperText={errors.profile || ""}
                placeholder="Enter Profile"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                error={!!errors.company_name}
                helperText={errors.company_name || ""}
                placeholder="Enter Company Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="progress"
                value={formData.progress}
                disabled
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="additional"
                value={formData.additional}
                onChange={handleChange}
                error={!!errors.additional}
                helperText={errors.additional || ""}
                placeholder="Enter Email ID"
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" type="submit" disabled={loading}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
          <Alert severity="success">Form submitted successfully!</Alert>
        </Snackbar>
        </Grid>
    </Grid>
  );
};

export default FormComponent;
