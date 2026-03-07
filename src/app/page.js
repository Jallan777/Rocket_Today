'use client';

import React, { useState, useEffect } from 'react';
import MissionDetails from './MissionDetails';
import Countdown from './Countdown';

//This function fetches the data on the client
async function getLaunchData() {
  try{
    const res = await fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=1&status=1');
    if(!res.ok) throw new Error('Failed to fetch');
    return res.json();
  } catch (err) {
    return null;
  }
}

export default function Page() {
  const [launch, setLaunch] = useState(null);
  const [selectedTimezone, setSelectedTimezone] = useState('UTC');

  useEffect(() => {
    getLaunchData().then(data => {
      setLaunch(data?.results?.[0] || null);
    });
  }, []);

  // List of timezones
  const timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'London (GMT/BST)' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEDT/AEST)' },
    { value: 'Pacific/Auckland', label: 'New Zealand (NZT)' },
  ];

  // Function to convert UTC time to selected timezone
  const convertTime = (utcDateString) => {
    if (!utcDateString) return '';
    const date = new Date(utcDateString);
    return date.toLocaleString('en-US', { timeZone: selectedTimezone, hour: '2-digit', minute: '2-digit' });
  };

  // Function to convert date to selected timezone
  const convertDate = (utcDateString) => {
    if (!utcDateString) return '';
    const date = new Date(utcDateString);
    return date.toLocaleDateString('en-US', { timeZone: selectedTimezone, day: '2-digit', month: 'long' });
  };
  
  // List of static quotes, facts, and fun texts
    const staticTexts = [
      // Space Quotes
      "To confine our attention to terrestrial matters would be to limit the human spirit. — Stephen Hawking",
      "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever. — Konstantin Tsiolkovsky",
      "Houston, we have a liftoff! — NASA Mission Control",
      "Space: the final frontier. — Star Trek",
      "We choose to go to the moon. — John F. Kennedy",
      "That's one small step for man, one giant leap for mankind. — Neil Armstrong",
      "The important achievement of man has been the ability to combine knowledge. — Dr. Wernher von Braun",
      "The universe is under no obligation to make sense to you. — Neil deGrasse Tyson",
      "Curiosity is the essence of our existence. — Gene Cernan",
      "Mars is there, waiting to be reached. — Buzz Aldrin",
      "The sky is not the limit, it’s just the beginning. — Donovan Livingston",
      "Space is big. You just won’t believe how vastly, hugely, mind-bogglingly big it is. — Douglas Adams",
      // General Space Facts
      "Did you know? The fastest rocket ever launched was NASA’s New Horizons.",
      "SpaceX’s Falcon 9 has landed over 100 times.",
      "The ISS orbits Earth every 90 minutes.",
      "Satellites help us track weather, GPS, and more.",
      "The Hubble Space Telescope has been in orbit since 1990.",
      "The first woman in space was Valentina Tereshkova in 1963.",
      "Jupiter has 79 known moons.",
      "The Voyager 1 probe is the farthest human-made object from Earth.",
      "A rocket must travel at least 28,000 km/h to reach orbit.",
      "The largest rocket ever built was the Saturn V.",
      // Fun/Silly Texts
      "Prepare for blastoff! Don’t forget your snacks.",
      "Rocket science? Easy. Waiting for launch? Hard.",
      "Countdown initiated. Please secure your space helmet.",
      "Gravity’s losing today. Up we go!",
      "If you hear a loud boom, it’s just excitement.",
      "Space is cool. Rockets are cooler.",
      "Today’s forecast: 100% chance of liftoff.",
      "Warning: Launch may cause extreme excitement.",
      "Please stand clear of the blast zone. Or don’t, we’re not your boss.",
      "Rocket fuel: Not recommended for breakfast.",
      "If you see aliens, wave hello!",
      "Space suits: Fashion of the future.",
      "Mission control says: Don’t panic!",
      "If you hear a countdown, start cheering!",
      "Launching: The only time being late is not an option.",
      "Space trivia: Rockets are basically controlled explosions.",
      "If you’re reading this, you’re officially part of the launch crew. (Not really)",
    ];

    // Dynamic launch facts
    const dynamicTexts = [];
    if (launch) {
      if (launch.name && launch.mission?.type) dynamicTexts.push(`${launch.name} payload: ${launch.mission.type}`);
      if (launch.name && launch.mission?.name) dynamicTexts.push(`${launch.name} mission: ${launch.mission.name}`);
      // Removed mission details from dynamicTexts
      if (launch.name && launch.launch_service_provider?.name) dynamicTexts.push(`${launch.name} by ${launch.launch_service_provider.name}`);
      if (launch.name && launch.pad?.location?.name) dynamicTexts.push(`${launch.name} launching from ${launch.pad.location.name}`);
      if (launch.name && launch.mission?.orbit?.name) dynamicTexts.push(`${launch.name} targeting orbit: ${launch.mission.orbit.name}`);
      if (launch.name && launch.window_start) dynamicTexts.push(`${launch.name} window opens at: ${convertTime(launch.window_start)} ${timezones.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}`);
      if (launch.name && launch.window_end) dynamicTexts.push(`${launch.name} window closes at: ${convertTime(launch.window_end)} ${timezones.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}`);
      // fallback simple facts
      if (launch.name) dynamicTexts.push(`Today’s rocket: ${launch.name}`);
      if (launch.launch_service_provider?.name) dynamicTexts.push(`Launch provider: ${launch.launch_service_provider.name}`);
      // Removed mission details from dynamicTexts
      if (launch.pad?.location?.name) dynamicTexts.push(`Launch site: ${launch.pad.location.name}`);
      if (launch.mission?.type) dynamicTexts.push(`Payload type: ${launch.mission.type}`);
      if (launch.mission?.orbit?.name) dynamicTexts.push(`Target orbit: ${launch.mission.orbit.name}`);
      if (launch.mission?.name) dynamicTexts.push(`Mission name: ${launch.mission.name}`);
      if (launch.window_start) dynamicTexts.push(`Window opens at: ${convertTime(launch.window_start)} ${timezones.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}`);
      if (launch.window_end) dynamicTexts.push(`Window closes at: ${convertTime(launch.window_end)} ${timezones.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}`);
    }

    // Randomly select from static or dynamic
    function getRandomText() {
      const useDynamic = dynamicTexts.length > 0 && Math.random() < 0.5;
      const list = useDynamic ? dynamicTexts : staticTexts;
      return list[Math.floor(Math.random() * list.length)];
    }


  //Logic: is it happening today?
  const today = new Date().getUTCDate();
  const launchDate = new Date(launch?.net).getUTCDate();
  const isToday = today === launchDate;

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-8 transition-colors duration-700 ${isToday ? 'bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-900' : 'bg-zinc-950'}`}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="max-w-3x1 w-full text-center flex-1 flex flex-col items-center justify-center">
        {/* PAGE QUESTION */}
        <div className="text-lg md:text-2xl font-semibold text-white/80 mb-2">
          Will there be a launch today?
        </div>
        {/* THE BIG ANSWER */}
        <h1 className={`main-title text-[15vw] md:text-[12rem] font-black leading-none tracking-tighter ${isToday ? 'text-teal-200 drop-shadow-lg' : 'text-white'} mb-4`}>
          {isToday ? 'YES.' : 'NO.'}
        </h1>

        {/* TIMEZONE SELECTOR */}
        <div className="mb-4">
          <label htmlFor="timezone-select" className="text-white/80 text-sm mr-2">Select Timezone:</label>
          <select
            id="timezone-select"
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded px-2 py-1"
          >
            {timezones.map(tz => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>

        {/* COUNTDOWN TIMER */}
        {launch && isToday && (
          <div className="countdown-timer">
            <Countdown targetDate={launch.net} />
          </div>
        )}

        <p className={`text-x1 mdLtext-3x1 font-light uppercase tracking-[0.2em] mb-12 ${isToday ? 'text-teal-100' : 'text-white/80'}`}>
          {getRandomText()}
        </p>

        {/* THE MISSION DATA */}
        {launch && (
          <div className={`glass-card mission-data inline-block text-left p-8 rounded-2x1 w-[420px] max-w-full ${isToday ? 'bg-white/20 border-teal-300 text-teal-50' : 'text-white'}`}> 
            <p className={`text-xs font-bold opacity-40 uppercase tracking-wideset mb-4 ${isToday ? 'text-teal-200' : ''}`}>Upcoming Mission</p>
            <h2 className={`text-3x1 font-bold mb-1 italic ${isToday ? 'text-teal-100' : ''}`}>
              {launch.name}
            </h2>
            <p className={`text-lg opacity-90 ${isToday ? 'text-teal-200' : ''}`}>
              {launch.launch_service_provider.name}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <div className={`flex justify-between border-b pb-2 ${isToday ? 'border-teal-200' : 'border-white/10'}`}> 
                <span className={`opacity-50 ${isToday ? 'text-teal-100' : ''}`}>When </span>
                <span className="font-mono">{convertDate(launch.net)} at {convertTime(launch.net)} {timezones.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone}</span>
              </div>
              <div className={`flex justify-between border-b pb-2 ${isToday ? 'border-teal-200' : 'border-white/10'}`}> 
                <span className={`opacity-50 ${isToday ? 'text-teal-100' : ''}`}>Where </span>
                <span>{launch.pad.location.name}</span>
              </div>
              {launch.mission?.description && (
                <MissionDetails description={launch.mission.description} />
              )}
            </div>

            {/* SHARE BUTTON*/}
            <a href={`https://twitter.com/intent/tweet?text=Is there a rocket launching today? ${isToday ? 'YES!' : 'NO.'} Check it at rocket-today.com`}
              className={`share-btn mt-8 block text-center py-3 px-6 ${isToday ? 'bg-teal-400 text-white font-bold rounded-full hover:bg-teal-500' : 'bg-white text-black font-bold rounded-full hover:bg-orange-400'}`}>
                Spread the word
            </a>
          </div>
        )}
      </div>
      <footer className="mt-8 text-white/30 text-xs tracking-widest uppercase">
        Data via <a href="https://thespacedevs.com/llapi" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-400">Launch Library 2 API</a> | Created in 48 Hours
      </footer>
    </main>
  );
}