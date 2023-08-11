import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Link, Container, Box, Alert } from '@mui/material';

function Home() {
    const [url, setUrl] = useState('');
    const [expiry, setExpiry] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isValidUrl = (inputUrl) => {
        try {
            new URL(inputUrl);
            return true;
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidUrl(url)) {
            setErrorMessage('Invalid URL format');
            setShortenedUrl('');
            return;
        }

        try {
            const headers = {
                'Content-Type': 'multipart/form-data',
            };
            const formData = new FormData();
            formData.append('url', url);
            formData.append('expiry', expiry);

            const response = await axios.post('http://127.0.0.1:5000/', formData, {
                headers: headers,
            });

            if (response.status === 200) {
                setShortenedUrl(response.data.shortened_url);
                setErrorMessage('');
            } else {
                setShortenedUrl('');
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const currentDate = new Date().toISOString().split('T')[0];

    return (
        <Container maxWidth="sm">
            <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to URL Shortener App!!
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="URL"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                        margin="normal"
                        error={errorMessage !== ''}
                        helperText={errorMessage || ' '}
                    />
                    <TextField
                        fullWidth
                        label="Expiry (MM/DD/YYYY optional)"
                        type="date"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        inputProps={{
                            min: currentDate, // Set the min attribute to prevent backdates
                        }}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
                        Shorten URL
                    </Button>
                </form>
                {shortenedUrl && (
                    <Alert severity="success" sx={{ marginTop: '1rem' }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Your shortened URL:</strong>
                        </Typography>
                        <Typography variant="body2">
                            <Link href={shortenedUrl} target="_blank" rel="noopener noreferrer" underline="hover">
                                <strong>{shortenedUrl}</strong>
                            </Link>
                        </Typography>
                    </Alert>
                )}
            </Box>
        </Container>
    );
}

export default Home;
