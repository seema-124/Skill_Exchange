import React from 'react'
import ReactDOM from 'react-dom/client' 
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

//Google Client ID
const GOOGLE_CLIENT_ID = "134185513807-bv7vkce3cobdkaignq5oeq1e1v9a25n5.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)