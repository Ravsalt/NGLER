import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    // Check if user exists on NGL
    try {
      const nglLinkResponse = await axios.get(`https://ngl.link/${username}`);
      if (nglLinkResponse.data.includes('Could not find user') || nglLinkResponse.data.includes('404 Not Found')) {
        return res.status(404).json({ error: 'User not found', message: `The user "${username}" could not be found on NGL. Please check the username and try again.` });
      }
    } catch (error) {
      console.error('Error checking NGL user:', error);
      return res.status(500).json({ error: 'Error checking user', message: 'An error occurred while checking the username. Please try again.' });
    }

    try {
      const response = await fetch('https://ngler-api.vercel.app/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      
      // Forward the response with CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      return res.status(response.status).json({
        success: response.ok,
        ...data,
        error: response.ok ? undefined : (data.error || 'Request failed')
      });
    } catch (error) {
      console.error('Error forwarding request to NGLer API:', error);
      return res.status(500).json({
        error: 'connection_error',
        message: 'Failed to connect to the NGLer service. Please try again later.'
      });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
