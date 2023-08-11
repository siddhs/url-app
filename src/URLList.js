import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Link, Button, AppBar, Toolbar, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Stats() {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await axios.get('http://127.0.0.1:5000/stats');
                const sortedUrls = response.data.urls.sort((a, b) => b.clicks - a.clicks);
                setUrls(sortedUrls);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchStats();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/delete/${id}`);
            const updatedUrls = urls.filter(url => url.id !== id);
            setUrls(updatedUrls);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Container maxWidth="md">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" component={RouterLink} to="/">
                        &#8592; Home
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1, marginLeft: '200px' }}>
                        URL Shortener App Statistics
                    </Typography>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} style={{ marginTop: '2rem', padding: '1rem', width: '100%' }}>
                <TableContainer>
                    <Table sx={{ '& tbody tr:hover': { backgroundColor: '#f5f5f5' } }}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', color: '#1976d2' }}>Clicks</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: '#1976d2' }}>Clicks (24 hrs)</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: '#1976d2' }}>Clicks (1 wk)</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: '#1976d2' }}>Short URL</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: '#1976d2' }}>Original URL</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: '#1976d2' }}>Created</TableCell>
                                <TableCell style={{ fontWeight: 'bold', color: '#1976d2' }}>Expiry</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {urls.map((url) => (
                                <TableRow key={url.id}>
                                    <TableCell>{url.clicks}</TableCell>
                                    <TableCell>{url.clicks_last_24h}</TableCell>
                                    <TableCell>{url.clicks_past_week}</TableCell>
                                    <TableCell>
                                        <Link href={url.short_url} target="_blank" rel="noopener noreferrer">
                                            {url.short_url}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{url.original_url}</TableCell>
                                    <TableCell>{url.created}</TableCell>
                                    <TableCell>{url.expiry}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="secondary" onClick={() => handleDelete(url.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}

export default Stats;
