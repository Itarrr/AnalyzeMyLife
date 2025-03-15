import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Plus, ZoomIn, ZoomOut, Move } from 'lucide-react';
import type { KnowledgeNode, KnowledgeLink } from '../types';

// Sample data for demonstration
const sampleNodes: KnowledgeNode[] = [
  { id: '1', label: 'Active Recall', category: 'Learning Technique', strength: 0.8 },
  { id: '2', label: 'Spaced Repetition', category: 'Learning Technique', strength: 0.7 },
  { id: '3', label: 'Memory Palace', category: 'Memorization', strength: 0.6 },
  { id: '4', label: 'Chunking', category: 'Learning Technique', strength: 0.9 },
  { id: '5', label: 'Feynman Technique', category: 'Understanding', strength: 0.75 },
];

const sampleLinks: KnowledgeLink[] = [
  { source: '1', target: '2', strength: 0.9, type: 'related' },
  { source: '2', target: '3', strength: 0.5, type: 'related' },
  { source: '1', target: '4', strength: 0.7, type: 'related' },
  { source: '4', target: '5', strength: 0.6, type: 'related' },
  { source: '3', target: '5', strength: 0.4, type: 'related' },
];

export function KnowledgeGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .append("g")
      .attr("transform", `scale(${zoom})`);

    // Create forces
    const simulation = d3.forceSimulation()
      .nodes(sampleNodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(sampleLinks)
        .id((d: any) => d.id)
        .distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create links
    const links = svg.append("g")
      .selectAll("line")
      .data(sampleLinks)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", d => d.strength * 2);

    // Create nodes
    const nodes = svg.append("g")
      .selectAll("g")
      .data(sampleNodes)
      .enter()
      .append("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        setSelectedNode(d);
        event.stopPropagation();
      });

    // Add circles to nodes
    nodes.append("circle")
      .attr("r", d => 20 + d.strength * 10)
      .attr("fill", d => {
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        return color(d.category);
      })
      .attr("fill-opacity", 0.7);

    // Add labels to nodes
    nodes.append("text")
      .text(d => d.label)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#fff")
      .attr("font-size", "12px");

    // Add zoom behavior
    const zoomBehavior = d3.zoom()
      .on("zoom", (event) => {
        svg.attr("transform", event.transform);
        setZoom(event.transform.k);
      });

    d3.select(svgRef.current)
      .call(zoomBehavior as any);

    // Update positions on each tick
    simulation.on("tick", () => {
      links
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      nodes
        .attr("transform", d => `translate(${(d as any).x},${(d as any).y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [zoom]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Knowledge Graph</h1>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50"
            onClick={() => setZoom(z => Math.min(z + 0.2, 3))}
          >
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50"
            onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}
          >
            <ZoomOut className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50"
            onClick={() => setZoom(1)}
          >
            <Move className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '70vh' }}>
          <svg
            ref={svgRef}
            className="w-full h-full"
            onClick={() => setSelectedNode(null)}
          />
        </div>

        <div className="w-80">
          {selectedNode ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedNode.label}</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="text-sm text-gray-900">{selectedNode.category}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Strength</dt>
                  <dd className="text-sm text-gray-900">{Math.round(selectedNode.strength * 100)}%</dd>
                </div>
                {selectedNode.lastReviewed && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last Reviewed</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(selectedNode.lastReviewed).toLocaleDateString()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-500 text-sm">Select a node to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}