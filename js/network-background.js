// Network Background Animation
// Adapted from NetworkBackground.vue component

let network = null;
let animationFrame = null;

// Generate network data for industrial/energy themed network
function generateNetworkData() {
    const nodes = [
        // Central node
        { id: 1, label: 'Context Labs' },

        // Operations cluster
        { id: 2, label: 'Operations' },
        { id: 3, label: 'Production' },
        { id: 4, label: 'Logistics' },
        { id: 5, label: 'Supply Chain' },
        { id: 21, label: 'Manufacturing' },
        { id: 22, label: 'Distribution' },
        { id: 23, label: 'Quality Control' },

        // Safety & Compliance cluster
        { id: 6, label: 'Safety' },
        { id: 7, label: 'Compliance' },
        { id: 8, label: 'Environmental' },
        { id: 24, label: 'Regulations' },
        { id: 25, label: 'Audits' },
        { id: 26, label: 'Standards' },

        // Financials cluster
        { id: 9, label: 'Financials' },
        { id: 10, label: 'Revenue' },
        { id: 11, label: 'Investments' },
        { id: 27, label: 'Expenses' },
        { id: 28, label: 'Budgets' },
        { id: 29, label: 'Assets' },

        // Projects cluster
        { id: 12, label: 'Projects' },
        { id: 13, label: 'Infrastructure' },
        { id: 14, label: 'Development' },
        { id: 30, label: 'Planning' },
        { id: 31, label: 'Execution' },
        { id: 32, label: 'Monitoring' },

        // Market cluster
        { id: 15, label: 'Market' },
        { id: 16, label: 'Competitors' },
        { id: 17, label: 'Trends' },
        { id: 33, label: 'Analysis' },
        { id: 34, label: 'Strategy' },
        { id: 35, label: 'Forecasting' },

        // Sustainability cluster
        { id: 18, label: 'Sustainability' },
        { id: 19, label: 'Emissions' },
        { id: 20, label: 'Renewable' },
        { id: 36, label: 'Carbon' },
        { id: 37, label: 'Green Energy' },
        { id: 38, label: 'Impact' },

        // Technology cluster
        { id: 39, label: 'Technology' },
        { id: 40, label: 'Innovation' },
        { id: 41, label: 'Digital' },
        { id: 42, label: 'Automation' },
        { id: 43, label: 'Data' },

        // Workforce cluster
        { id: 44, label: 'Workforce' },
        { id: 45, label: 'Training' },
        { id: 46, label: 'Talent' },
        { id: 47, label: 'Culture' },
        { id: 48, label: 'Development' },
    ];

    const edges = [
        // Central connections
        { from: 1, to: 2 },
        { from: 1, to: 6 },
        { from: 1, to: 9 },
        { from: 1, to: 12 },
        { from: 1, to: 15 },
        { from: 1, to: 18 },
        { from: 1, to: 39 },
        { from: 1, to: 44 },

        // Operations connections
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 2, to: 21 },
        { from: 2, to: 22 },
        { from: 3, to: 4 },
        { from: 3, to: 21 },
        { from: 4, to: 5 },
        { from: 4, to: 22 },
        { from: 21, to: 23 },
        { from: 22, to: 23 },

        // Safety connections
        { from: 6, to: 7 },
        { from: 6, to: 8 },
        { from: 6, to: 24 },
        { from: 7, to: 8 },
        { from: 7, to: 24 },
        { from: 7, to: 25 },
        { from: 24, to: 26 },
        { from: 25, to: 26 },

        // Finance connections
        { from: 9, to: 10 },
        { from: 9, to: 11 },
        { from: 9, to: 27 },
        { from: 9, to: 28 },
        { from: 10, to: 11 },
        { from: 10, to: 29 },
        { from: 27, to: 28 },
        { from: 28, to: 29 },

        // Projects connections
        { from: 12, to: 13 },
        { from: 12, to: 14 },
        { from: 12, to: 30 },
        { from: 13, to: 14 },
        { from: 13, to: 31 },
        { from: 30, to: 31 },
        { from: 31, to: 32 },

        // Market connections
        { from: 15, to: 16 },
        { from: 15, to: 17 },
        { from: 15, to: 33 },
        { from: 16, to: 17 },
        { from: 16, to: 33 },
        { from: 33, to: 34 },
        { from: 34, to: 35 },

        // Sustainability connections
        { from: 18, to: 19 },
        { from: 18, to: 20 },
        { from: 18, to: 36 },
        { from: 19, to: 36 },
        { from: 20, to: 37 },
        { from: 36, to: 38 },
        { from: 37, to: 38 },

        // Technology connections
        { from: 39, to: 40 },
        { from: 39, to: 41 },
        { from: 39, to: 42 },
        { from: 40, to: 41 },
        { from: 41, to: 43 },
        { from: 42, to: 43 },

        // Workforce connections
        { from: 44, to: 45 },
        { from: 44, to: 46 },
        { from: 44, to: 47 },
        { from: 45, to: 48 },
        { from: 46, to: 47 },
        { from: 47, to: 48 },

        // Cross-cluster connections
        { from: 2, to: 6 },
        { from: 2, to: 9 },
        { from: 2, to: 39 },
        { from: 6, to: 18 },
        { from: 9, to: 12 },
        { from: 9, to: 15 },
        { from: 12, to: 18 },
        { from: 12, to: 39 },
        { from: 15, to: 9 },
        { from: 18, to: 39 },
        { from: 39, to: 2 },
        { from: 44, to: 2 },
        { from: 44, to: 39 },
        { from: 21, to: 42 },
        { from: 23, to: 7 },
        { from: 28, to: 12 },
        { from: 33, to: 43 },
    ];

    return { nodes, edges };
}

function initNetwork() {
    const container = document.getElementById('network-background');
    if (!container) return;

    const data = generateNetworkData();

    const options = {
        nodes: {
            shape: 'dot',
            size: 5,
            font: {
                size: 0,
            },
            borderWidth: 1,
            color: {
                background: '#215FFF',
                border: '#215FFF',
            },
            shadow: false,
        },
        edges: {
            width: 1,
            color: '#215FFF',
            smooth: {
                type: 'continuous',
            },
            shadow: false,
            scaling: {
                min: 1,
                max: 1,
            },
        },
        physics: {
            enabled: false,
        },
        interaction: {
            hover: false,
            dragNodes: false,
            dragView: false,
            zoomView: false,
        },
    };

    network = new vis.Network(container, data, options);

    // Start animation loop
    startAnimation();
}

function startAnimation() {
    // Start with time offset to begin with nodes already spread out
    let time = 5;

    const animate = () => {
        if (network) {
            time += 0.002;

            const nodeIds = network.body.data.nodes.getIds();

            nodeIds.forEach((nodeId, index) => {
                const node = network.body.nodes[nodeId];
                if (node) {
                    // Create smooth sine/cosine wave motion for each node
                    const offset = index * 0.5;
                    const speedX = 0.3 + (index % 3) * 0.1;
                    const speedY = 0.2 + (index % 5) * 0.1;

                    // Calculate new position using sine waves
                    const deltaX = Math.sin(time * speedX + offset) * 0.3;
                    const deltaY = Math.cos(time * speedY + offset) * 0.3;

                    // Move node
                    node.x += deltaX;
                    node.y += deltaY;
                }
            });

            // Redraw the network
            network.body.emitter.emit('_dataChanged');
            network.redraw();
        }

        animationFrame = requestAnimationFrame(animate);
    };

    animate();
}

function stopAnimation() {
    if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNetwork();
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    stopAnimation();
    if (network) {
        network.destroy();
    }
});
