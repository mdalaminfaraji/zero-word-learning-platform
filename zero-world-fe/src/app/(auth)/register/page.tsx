"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const { register, loading } = useAuthStore();
  const router = useRouter();

  const handleClickShowPassword = (field: 'password' | 'confirmPassword') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (name === "confirmPassword" || name === "password") {
      const otherField = name === "password" ? formData.confirmPassword : formData.password;
      setPasswordError(
        value && otherField && value !== otherField ? "Passwords do not match" : ""
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    const res = await register(
      formData.username,
      formData.email,
      formData.password
    );
    console.log(res);
    router.push("/");
  };

  const renderPasswordField = (
    name: 'password' | 'confirmPassword',
    label: string,
    error?: string
  ) => (
    <TextField
      margin="normal"
      required
      fullWidth
      name={name}
      label={label}
      type={showPassword[name] ? "text" : "password"}
      id={name}
      value={formData[name]}
      onChange={handleChange}
      error={!!error && name === 'confirmPassword'}
      helperText={name === 'confirmPassword' ? error : ''}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword(name)}
                edge="end"
              >
                {showPassword[name] ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
    />
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            padding: { xs: 3, sm: 6 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <PersonAddOutlinedIcon sx={{ color: "white" }} />
          </Box>
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 1,
              fontWeight: 600,
              background: "linear-gradient(to right, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
            Join us to get started
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              {renderPasswordField('password', 'Password')}
              {renderPasswordField('confirmPassword', 'Confirm Password', passwordError)}
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1.1rem",
                background: "linear-gradient(to right, #667eea, #764ba2)",
                '&:hover': {
                  background: "linear-gradient(to right, #5c72d4, #6a4494)",
                },
              }}
              disabled={loading || !!passwordError}
            >
              {loading ? <CircularProgress size={24} /> : "Create Account"}
            </Button>
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  style={{ 
                    color: "#667eea",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage;
