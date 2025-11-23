#!/usr/bin/env python3
"""
Simple HTTP server for the Weather App
Run this to serve the weather application locally
"""

import http.server
import socketserver
import webbrowser
import os
import sys

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def run_server(port=8000):
    # Change to the Weather directory
    weather_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(weather_dir)
    
    handler = CORSHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"🌤️  Weather App Server Starting...")
            print(f"📍 Serving at: http://localhost:{port}")
            print(f"📁 Directory: {weather_dir}")
            print(f"🚀 Opening browser...")
            print(f"⏹️  Press Ctrl+C to stop the server")
            
            # Open browser automatically
            webbrowser.open(f'http://localhost:{port}')
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped by user")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} is already in use. Trying port {port + 1}...")
            run_server(port + 1)
        else:
            print(f"❌ Error starting server: {e}")
            sys.exit(1)

if __name__ == "__main__":
    run_server()