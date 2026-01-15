// Dashboard Functionality - Backend Integration
const API_BASE_URL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const flowchartCanvas = document.getElementById('flowchartCanvas');
    const generateBtn = document.getElementById('generateBtn');
    const diagramTypeSelect = document.getElementById('diagramType');
    const exportBtn = document.getElementById('exportBtn');
    const clearBtn = document.getElementById('clearBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    let zoomLevel = 100;
    let currentMermaidCode = '';

    // Check if user is logged in (simple check for demo)
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }

    // Check backend API status
    checkAPIStatus();

    // Generate button click
    generateBtn?.addEventListener('click', async function() {
        const text = textInput.value.trim();
        const type = diagramTypeSelect.value;

        if (!text) {
            showError('Please enter a description for your diagram');
            return;
        }

        await generateDiagram(text, type);
    });

    // Check API health
    async function checkAPIStatus() {
        const statusElement = document.getElementById('apiStatus');
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            if (response.ok) {
                statusElement.textContent = 'Connected ✓';
                statusElement.className = 'status-online';
            } else {
                statusElement.textContent = 'Error';
                statusElement.className = 'status-offline';
            }
        } catch (error) {
            statusElement.textContent = 'Offline (Start server: python backend/main.py)';
            statusElement.className = 'status-offline';
        }
    }

    // Generate diagram from backend API
    async function generateDiagram(text, type) {
        showLoading();

        try {
            const response = await fetch(`${API_BASE_URL}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, type })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to generate diagram');
            }

            const data = await response.json();
            currentMermaidCode = data.code;
            
            // Render the Mermaid diagram
            renderMermaidDiagram(data.code);

        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'Failed to generate diagram. Make sure the backend is running.');
        }
    }

    // Render Mermaid diagram
    async function renderMermaidDiagram(mermaidCode) {
        try {
            flowchartCanvas.innerHTML = '<div id="mermaidDiagram" class="mermaid-container"></div>';
            const container = document.getElementById('mermaidDiagram');
            
            // Use Mermaid to render
            const { svg } = await window.mermaid.render('generatedDiagram', mermaidCode);
            container.innerHTML = svg;
            
            // Apply zoom
            container.style.transform = `scale(${zoomLevel / 100})`;
            
        } catch (error) {
            console.error('Mermaid rendering error:', error);
            showError('Failed to render diagram. The generated code may have errors.');
        }
    }

    // Show loading state
    function showLoading() {
        flowchartCanvas.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <h3>Generating Diagram...</h3>
                <p>AI is creating your diagram</p>
            </div>
        `;
    }

    // Show error message
    function showError(message) {
        flowchartCanvas.innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }

    // Zoom controls
    document.getElementById('zoomInBtn')?.addEventListener('click', function() {
        zoomLevel = Math.min(200, zoomLevel + 10);
        updateZoom();
    });

    document.getElementById('zoomOutBtn')?.addEventListener('click', function() {
        zoomLevel = Math.max(50, zoomLevel - 10);
        updateZoom();
    });

    function updateZoom() {
        document.getElementById('zoomLevel').textContent = zoomLevel + '%';
        const mermaidContainer = document.getElementById('mermaidDiagram');
        if (mermaidContainer) {
            mermaidContainer.style.transform = `scale(${zoomLevel / 100})`;
        }
    }

    // Download diagram as PNG
    downloadBtn?.addEventListener('click', async function() {
        const svg = flowchartCanvas.querySelector('svg');
        if (!svg) {
            alert('No diagram to download. Generate a diagram first.');
            return;
        }

        try {
            // Get SVG data
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            // Set canvas size based on SVG viewBox
            const viewBox = svg.getAttribute('viewBox')?.split(' ') || [0, 0, 800, 600];
            canvas.width = parseFloat(viewBox[2]) || 800;
            canvas.height = parseFloat(viewBox[3]) || 600;

            img.onload = function() {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                
                // Download
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `flowgen-diagram-${Date.now()}.png`;
                    a.click();
                    URL.revokeObjectURL(url);
                });
            };

            img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download diagram');
        }
    });

    // Clear button
    clearBtn?.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear the diagram?')) {
            textInput.value = '';
            currentMermaidCode = '';
            flowchartCanvas.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🤖</div>
                    <h3>AI-Powered Diagram Generation</h3>
                    <p>Describe your diagram in plain text and click Generate</p>
                    <p class="api-status">Backend: <span id="apiStatus" class="status-checking">Checking...</span></p>
                </div>
            `;
            checkAPIStatus();
        }
    });

    // Export button (enhanced)
    exportBtn?.addEventListener('click', function() {
        if (!currentMermaidCode) {
            alert('No diagram to export. Generate a diagram first.');
            return;
        }

        const exportMenu = document.createElement('div');
        exportMenu.className = 'export-menu';
        exportMenu.innerHTML = `
            <div class="export-option" data-format="png">
                <span class="icon">🖼️</span>
                <div>
                    <strong>PNG Image</strong>
                    <p>Download as raster image</p>
                </div>
            </div>
            <div class="export-option" data-format="svg">
                <span class="icon">📐</span>
                <div>
                    <strong>SVG Vector</strong>
                    <p>Download as vector graphic</p>
                </div>
            </div>
            <div class="export-option" data-format="mermaid">
                <span class="icon">📝</span>
                <div>
                    <strong>Mermaid Code</strong>
                    <p>Copy source code</p>
                </div>
            </div>
        `;

        const existingMenu = document.querySelector('.export-menu');
        if (existingMenu) existingMenu.remove();

        exportBtn.parentElement.appendChild(exportMenu);

        exportMenu.querySelectorAll('.export-option').forEach(option => {
            option.addEventListener('click', function() {
                const format = this.dataset.format;
                
                if (format === 'png') {
                    downloadBtn.click();
                } else if (format === 'svg') {
                    downloadSVG();
                } else if (format === 'mermaid') {
                    copyMermaidCode();
                }
                
                exportMenu.remove();
            });
        });

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!exportMenu.contains(e.target) && e.target !== exportBtn) {
                    exportMenu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
    });

    function downloadSVG() {
        const svg = flowchartCanvas.querySelector('svg');
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flowgen-diagram-${Date.now()}.svg`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function copyMermaidCode() {
        navigator.clipboard.writeText(currentMermaidCode).then(() => {
            alert('Mermaid code copied to clipboard!');
        }).catch(() => {
            prompt('Copy this Mermaid code:', currentMermaidCode);
        });
    }

    // Diagram type selection from sidebar
    document.querySelectorAll('.diagram-type-item').forEach(item => {
        item.addEventListener('click', function() {
            const type = this.dataset.type;
            diagramTypeSelect.value = type;
            
            // Update active state
            document.querySelectorAll('.diagram-type-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Update placeholder
            updatePlaceholder(type);
        });
    });

    function updatePlaceholder(type) {
        const placeholders = {
            'flowchart': 'User logs in, system validates credentials, if valid show dashboard else show error message',
            'sequence': 'User sends request to API, API processes request, API queries Database, Database returns data, API sends response to User',
            'mindmap': 'Project Planning: Requirements (Gather needs, Stakeholder input), Design (Architecture, UI/UX), Development (Frontend, Backend), Testing (Unit tests, Integration), Deployment',
            'entity-relationship': 'Customer has Orders, Order contains Products, Product belongs to Category',
            'class': 'User class with name and email properties, methods login and logout. Order class with items and total',
            'state': 'Idle state, when start event moves to Running, when pause moves to Paused, when stop moves to Stopped'
        };
        
        textInput.placeholder = `Describe your ${type} diagram in plain text...\n\nExample:\n${placeholders[type] || 'Describe your diagram here'}`;
    }

    // User menu dropdown
    const userMenu = document.querySelector('.user-menu');
    const userAvatar = document.querySelector('.user-avatar');
    
    if (userAvatar) {
        userAvatar.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenu.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            userMenu.classList.remove('active');
        });
    }

    // Logout
    document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });

    // Project cards click
    document.querySelectorAll('.project-card:not(.new-project)').forEach(card => {
        card.addEventListener('click', function() {
            alert('Opening project... (Demo mode)');
        });
    });

    // Initialize with flowchart example
    setTimeout(() => {
        textInput.value = 'User logs in, system validates credentials, if valid show dashboard else show error message';
        diagramTypeSelect.value = 'flowchart';
        document.querySelector('.diagram-type-item[data-type="flowchart"]')?.classList.add('active');
    }, 500);
});
