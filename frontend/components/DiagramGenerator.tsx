'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import mermaid from 'mermaid';
import { Sparkles, ZoomIn, ZoomOut, Download, Copy, Trash2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function DiagramGenerator() {
  const [text, setText] = useState('');
  const [diagramType, setDiagramType] = useState('flowchart');
  const [mermaidCode, setMermaidCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [zoom, setZoom] = useState(100);
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });

    checkAPIStatus();
  }, []);

  useEffect(() => {
    if (mermaidCode && diagramRef.current) {
      renderDiagram();
    }
  }, [mermaidCode, zoom]);

  const checkAPIStatus = async () => {
    try {
      await axios.get(`${API_URL}/health`);
      setApiStatus('online');
    } catch {
      setApiStatus('offline');
    }
  };

  const renderDiagram = async () => {
    if (!diagramRef.current) return;

    try {
      const { svg } = await mermaid.render('mermaid-diagram', mermaidCode);
      diagramRef.current.innerHTML = svg;
      
      const svgElement = diagramRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.style.transform = `scale(${zoom / 100})`;
        svgElement.style.transformOrigin = 'top center';
      }
    } catch (err) {
      console.error('Mermaid render error:', err);
      setError('Failed to render diagram');
    }
  };

  const generateDiagram = async () => {
    if (!text.trim()) {
      setError('Please enter a description');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/generate`, {
        text,
        type: diagramType,
      });

      setMermaidCode(response.data.code);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to generate diagram. Make sure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPNG = () => {
    const svg = diagramRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const viewBox = svg.getAttribute('viewBox')?.split(' ') || ['0', '0', '800', '600'];
    canvas.width = parseFloat(viewBox[2]) || 800;
    canvas.height = parseFloat(viewBox[3]) || 600;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `flowgen-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
          }
        });
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const copyCode = () => {
    navigator.clipboard.writeText(mermaidCode);
    alert('Mermaid code copied!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Create Your Diagram</h1>
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            apiStatus === 'online' ? 'bg-green-100 text-green-700' :
            apiStatus === 'offline' ? 'bg-red-100 text-red-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            Backend: {apiStatus === 'online' ? '✓ Connected' : apiStatus === 'offline' ? '✗ Offline' : 'Checking...'}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Text Input</h3>
            <div className="flex items-center space-x-2">
              <select
                value={diagramType}
                onChange={(e) => setDiagramType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="flowchart">Flowchart</option>
                <option value="sequence">Sequence</option>
                <option value="mindmap">Mindmap</option>
                <option value="entity-relationship">ER Diagram</option>
                <option value="class">Class Diagram</option>
                <option value="state">State Diagram</option>
              </select>
              <button
                onClick={generateDiagram}
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? 'Generating...' : 'Generate'}</span>
              </button>
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your diagram in plain text...&#10;&#10;Example for Flowchart:&#10;User logs in, system validates credentials, if valid show dashboard else show error message"
            className="w-full h-[500px] p-6 focus:outline-none resize-none"
          />
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Preview</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom(Math.max(50, zoom - 10))}
                className="p-2 hover:bg-gray-200 rounded-lg transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom(Math.min(200, zoom + 10))}
                className="p-2 hover:bg-gray-200 rounded-lg transition"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <button
                onClick={copyCode}
                disabled={!mermaidCode}
                className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
                title="Copy Code"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={downloadPNG}
                disabled={!mermaidCode}
                className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50"
                title="Download PNG"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setText(''); setMermaidCode(''); }}
                className="p-2 hover:bg-gray-200 rounded-lg transition text-red-600"
                title="Clear"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="h-[500px] p-6 overflow-auto flex items-center justify-center bg-gray-50">
            {isLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Diagram...</h3>
                <p className="text-gray-600">AI is creating your diagram</p>
              </div>
            ) : error ? (
              <div className="text-center text-red-600">
                <div className="text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold mb-2">Error</h3>
                <p>{error}</p>
              </div>
            ) : mermaidCode ? (
              <div ref={diagramRef} className="w-full"></div>
            ) : (
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Diagram Generation</h3>
                <p>Describe your diagram in plain text and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
