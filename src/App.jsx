import './App.css';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        { emailContent, tone }
      );
      setGeneratedReply(
        typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      
      {/* Header */}
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Email Reply Generator
      </Typography>

      {/* Main Card */}
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "#fafafa"
        }}
      >

        {/* Input Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Original Email
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder="Paste the email you received..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />
        </Box>

        {/* Tone Selector */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Tone</InputLabel>
          <Select
            value={tone}
            label="Tone"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Formal">Formal</MenuItem>
            <MenuItem value="Informal">Informal</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
          </Select>
        </FormControl>

        {/* Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold"
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Paper>

      {/* Output Card */}
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 3
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Generated Reply
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={5}
          value={generatedReply}
          InputProps={{ readOnly: true }}
        />

        <Button
          variant="outlined"
          sx={{ mt: 2, borderRadius: 2 }}
          onClick={() => navigator.clipboard.writeText(generatedReply)}
        >
          Copy to Clipboard
        </Button>
      </Paper>

    </Container>
  );
}

export default App;