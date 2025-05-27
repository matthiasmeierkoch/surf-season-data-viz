import React from 'react';
import D3WorldMap from './maps';
import D3TimelineChart from './data-viz';
import { destinationsInfo } from './data';
import './App.css';
import './index.css'; // Ensure global styles are imported

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 to-indigo-600 flex flex-col font-sans">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <header className="text-center mb-8 sm:mb-12 w-full">
          <h1 className="text-6xl sm:text-5xl font-bold text-white drop-shadow-lg">
            Global Surf Season Guide
          </h1>
          <p className="text-lg text-sky-100 mt-2">
            Explore surf seasons, swell sizes, and locations.
          </p>
        </header>
        <main className="w-full max-w-4xl flex flex-col gap-8 items-center">
          <section className="w-full">
            <D3WorldMap destinations={destinationsInfo} />
          </section>
          <section className="w-full">
            <D3TimelineChart destinations={destinationsInfo} />
          </section>
        </main>
        <footer className="text-center mt-8 sm:mt-12 text-sm text-sky-200 w-full">
          <p>&copy; {new Date().getFullYear()} Surf Season Guide. Plan your next wave!</p>
        </footer>
      </div>
      <style>{`
        .d3-tooltip {
          text-align: left;
          padding: 8px;
          font: 12px sans-serif;
          background: rgba(0,0,0,0.8);
          color: white;
          border: 0px;
          border-radius: 8px;
          transition: opacity 0.2s; 
          z-index: 10; 
        }
        .y-axis .tick text tspan.country-label { 
            fill: #6B7280; 
            font-size: 9px;
        }
        .d3-map-container {
            min-height: 400px;
        }
      `}</style>
    </div>
  );
}

export default App;