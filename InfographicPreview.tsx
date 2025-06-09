
import React from 'react';

export default function InfographicPreview({ data, photo, theme }) {
  const layoutClass = {
    classic: "flex flex-col md:flex-row bg-white text-black",
    banner: "flex flex-col bg-gray-100 text-black",
    split: "grid grid-cols-2 gap-4 bg-white",
    dark: "flex flex-col bg-black text-white border border-gray-700",
    branded: "relative bg-white border-4 border-blue-400",
  }[theme];

  return (
    <div className={`w-full max-w-[1080px] p-4 rounded-lg shadow ${layoutClass}`}>
      {(theme === "classic" || theme === "split") && photo && (
        <img
          src={URL.createObjectURL(photo)}
          alt="Uploaded"
          className="w-full md:w-1/2 object-cover rounded"
        />
      )}
      {theme === "banner" && photo && (
        <img
          src={URL.createObjectURL(photo)}
          alt="Uploaded"
          className="w-full object-cover rounded"
        />
      )}
      <div className="flex-1 p-4 space-y-2 text-sm">
        <h2 className="text-xl font-bold">{data.name}</h2>
        <p className="italic">{data.event} • {data.location}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div><strong>Distance:</strong> {data.distance}</div>
          <div><strong>Time:</strong> {data.duration}</div>
          <div><strong>Pace:</strong> {data.pace}</div>
          <div><strong>Elevation:</strong> {data.elevationGain}</div>
          <div><strong>Calories:</strong> {data.calories}</div>
          <div><strong>Cadence:</strong> {data.cadence}</div>
          <div><strong>Heart Rate:</strong> {data.heartRate}</div>
          <div><strong>Fastest Split:</strong> {data.fastestSplit}</div>
          <div><strong>Mood:</strong> {data.mood}</div>
        </div>
        {data.spotifyTrack && <div>🎵 <strong>Track:</strong> {data.spotifyTrack}</div>}
        {data.quote && <div className="italic text-center pt-2">“{data.quote}”</div>}
        <div className="pt-2 flex flex-wrap gap-2">
          {data.badges.map((badge, idx) => (
            <span key={idx} className="bg-yellow-200 text-black text-xs px-3 py-1 rounded-full">{badge}</span>
          ))}
        </div>
        {theme === "branded" && (
          <div className="mt-4 text-xs bg-blue-500 text-white px-3 py-1 inline-block rounded">🏁 HBF Finisher</div>
        )}
      </div>
    </div>
  );
}
