
'use client';
import React, { useState } from 'react';
import InfographicPreview from "@/components/InfographicPreview";

export default function GPXUploader() {
  const [gpxFile, setGpxFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [spotifyTrack, setSpotifyTrack] = useState('');
  const [mood, setMood] = useState('🔥');
  const [theme, setTheme] = useState('classic');
  const [previewData, setPreviewData] = useState(null);

  const handleSubmit = () => {
    const mockStats = {
      name: "Nathan Holton",
      event: "HBF Run for a Reason 2025",
      location: "Perth, WA",
      distance: "21.1 km",
      duration: "1:58:45",
      pace: "5:37 /km",
      elevationGain: "88 m",
      calories: "1,762 kcal",
      cadence: "162 spm",
      heartRate: "151 bpm avg",
      mood,
      spotifyTrack,
      fastestSplit: "4:42 /km",
      quote: "You don’t find willpower, you create it.",
      badges: ["Official Finisher", "Sub-2 Hour Half", "Early Riser"],
      weather: { temp: 17, condition: "Sunny" }
    };
    setPreviewData(mockStats);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div>
        <label>GPX File</label>
        <input type="file" accept=".gpx" onChange={e => setGpxFile(e.target.files[0])} />
      </div>
      <div>
        <label>Workout Photo</label>
        <input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files[0])} />
      </div>
      <div>
        <label>Spotify Track</label>
        <input type="text" value={spotifyTrack} onChange={e => setSpotifyTrack(e.target.value)} />
      </div>
      <div>
        <label>Mood</label>
        <select value={mood} onChange={e => setMood(e.target.value)}>
          <option value="🔥">🔥 On Fire</option>
          <option value="😅">😅 Tough but Done</option>
          <option value="😎">😎 Chill Vibes</option>
          <option value="🤢">🤢 Never Again</option>
          <option value="💀">💀 Dead</option>
        </select>
      </div>
      <div>
        <label>Theme</label>
        <select value={theme} onChange={e => setTheme(e.target.value)}>
          <option value="classic">Classic</option>
          <option value="banner">Banner</option>
          <option value="split">Split</option>
          <option value="dark">Dark</option>
          <option value="branded">Branded</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Generate Infographic</button>

      {previewData && (
        <div className="mt-6">
          <InfographicPreview
            data={previewData}
            photo={photoFile}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
}
