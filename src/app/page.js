"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [maths, setMaths] = useState("2");
  const [coding, setCoding] = useState("1");
  const [exercise, setExercise] = useState("45");
  const [audiobook, setAudiobook] = useState("30");
  const [chanting, setChanting] = useState("2");

  // Load Saved Data
  useEffect(() => {
    const savedMaths = localStorage.getItem("maths");
    const savedCoding = localStorage.getItem("coding");
    const savedExercise = localStorage.getItem("exercise");
    const savedAudiobook = localStorage.getItem("audiobook");
    const savedChanting = localStorage.getItem("chanting");

    if (savedMaths) setMaths(savedMaths);
    if (savedCoding) setCoding(savedCoding);
    if (savedExercise) setExercise(savedExercise);
    if (savedAudiobook) setAudiobook(savedAudiobook);
    if (savedChanting) setChanting(savedChanting);
  }, []);

  // Save Data Automatically
  useEffect(() => {
    localStorage.setItem("maths", maths);
    localStorage.setItem("coding", coding);
    localStorage.setItem("exercise", exercise);
    localStorage.setItem("audiobook", audiobook);
    localStorage.setItem("chanting", chanting);
  }, [maths, coding, exercise, audiobook, chanting]);

  // Goal Logic
  const mathsDone = Number(maths) >= 2;
  const codingDone = Number(coding) >= 1;
  const exerciseDone = Number(exercise) >= 45;
  const audiobookDone = Number(audiobook) >= 30;
  const chantingDone = Number(chanting) >= 2;

  // Productivity Score
  const productivity =
    (mathsDone ? 20 : 0) +
    (codingDone ? 20 : 0) +
    (exerciseDone ? 20 : 0) +
    (audiobookDone ? 20 : 0) +
    (chantingDone ? 20 : 0);

  // Goals Completed
  const completedGoals = [
    mathsDone,
    codingDone,
    exerciseDone,
    audiobookDone,
    chantingDone,
  ].filter(Boolean).length;

  const goalCards = [
    {
      title: "Maths",
      value: `${maths}/2 hrs`,
      done: mathsDone,
    },
    {
      title: "Coding",
      value: `${coding}/1 hr`,
      done: codingDone,
    },
    {
      title: "Exercise",
      value: `${exercise}/45 mins`,
      done: exerciseDone,
    },
    {
      title: "Audiobook",
      value: `${audiobook}/30 mins`,
      done: audiobookDone,
    },
    {
      title: "Chanting",
      value: `${chanting}/2 rounds`,
      done: chantingDone,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-[#0B1220] border-r border-white/10 flex-col p-6">
        <h1 className="text-3xl font-bold mb-10 text-green-400">
          GrowthOS
        </h1>

        <nav className="space-y-3 text-gray-300">
          {[
            "Dashboard",
            "Daily Log",
            "Projects",
            "Audiobooks",
            "Analytics",
            "Journal",
            "Achievements",
          ].map((item) => (
            <div
              key={item}
              className="px-4 py-3 rounded-xl hover:bg-blue-500/20 cursor-pointer transition"
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Hey, Anay 👋
            </h1>

            <p className="text-gray-400 mt-1">
              Become 1% better every day.
            </p>
          </div>

          <button className="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/20 transition">
            Share Dashboard
          </button>
        </div>

        {/* Top Stats */}
        <section className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0B1220] rounded-3xl p-6 border border-white/10">
            <h2 className="text-gray-400 mb-3">
              Productivity
            </h2>

            <div
              className={`text-5xl font-bold ${
                productivity >= 80
                  ? "text-green-400"
                  : productivity >= 50
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {productivity}%
            </div>
          </div>

          <div className="bg-[#0B1220] rounded-3xl p-6 border border-white/10">
            <h2 className="text-gray-400 mb-3">
              Goals Completed
            </h2>

            <div className="text-5xl font-bold text-blue-400">
              {completedGoals}/5
            </div>
          </div>

          <div className="bg-[#0B1220] rounded-3xl p-6 border border-white/10">
            <h2 className="text-gray-400 mb-3">
              Current Streak
            </h2>

            <div className="text-5xl font-bold text-purple-400">
              14
            </div>
          </div>
        </section>

        {/* Progress Cards */}
        <section className="bg-[#0B1220] rounded-3xl p-6 border border-white/10 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Today's Progress
              </h2>

              <p className="text-gray-400">
                {completedGoals} / 5 goals completed
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {goalCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl p-5 text-center border ${
                  card.done
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <div className="text-3xl mb-3">
                  {card.done ? "✅" : "❌"}
                </div>

                <h3 className="font-semibold">
                  {card.title}
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Update */}
        <section className="bg-[#0B1220] rounded-3xl p-6 border border-white/10 mb-8">
          <h2 className="text-2xl font-bold mb-5">
            Quick Update
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
            <input
              type="number"
              value={maths}
              onChange={(e) => setMaths(e.target.value)}
              placeholder="Maths Hours"
              className="bg-[#121B2B] border border-white/10 rounded-2xl p-4 outline-none"
            />

            <input
              type="number"
              value={coding}
              onChange={(e) => setCoding(e.target.value)}
              placeholder="Coding Hours"
              className="bg-[#121B2B] border border-white/10 rounded-2xl p-4 outline-none"
            />

            <input
              type="number"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="Exercise Minutes"
              className="bg-[#121B2B] border border-white/10 rounded-2xl p-4 outline-none"
            />

            <input
              type="number"
              value={audiobook}
              onChange={(e) => setAudiobook(e.target.value)}
              placeholder="Audiobook Minutes"
              className="bg-[#121B2B] border border-white/10 rounded-2xl p-4 outline-none"
            />

            <input
              type="number"
              value={chanting}
              onChange={(e) => setChanting(e.target.value)}
              placeholder="Chanting Rounds"
              className="bg-[#121B2B] border border-white/10 rounded-2xl p-4 outline-none"
            />
          </div>
        </section>

        {/* Audiobook */}
        <section className="bg-[#0B1220] rounded-3xl p-6 border border-white/10 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Currently Listening
          </h2>

          <div className="flex gap-5 items-center">
            <div className="w-24 h-32 rounded-2xl bg-gray-700 flex items-center justify-center text-center text-sm p-2">
              Psychology of Money
            </div>

            <div>
              <h3 className="text-2xl font-semibold">
                The Psychology of Money
              </h3>

              <p className="text-gray-400 mb-4">
                Morgan Housel
              </p>

              <div className="w-64 bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full"
                  style={{
                    width: `${Math.min(
                      Number(audiobook) * 2,
                      100
                    )}%`,
                  }}
                ></div>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                Listening Today: {audiobook} mins
              </p>
            </div>
          </div>
        </section>

        {/* Heatmap */}
        <section className="bg-[#0B1220] rounded-3xl p-6 border border-white/10 mb-8">
          <h2 className="text-2xl font-bold mb-5">
            Activity Heatmap
          </h2>

          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: 70 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-md ${
                  i % 5 === 0
                    ? "bg-green-300"
                    : i % 3 === 0
                    ? "bg-green-500/70"
                    : "bg-green-900/40"
                }`}
              ></div>
            ))}
          </div>
        </section>

        {/* Reflection */}
        <section className="bg-[#0B1220] rounded-3xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold mb-5">
            Daily Reflection
          </h2>

          <textarea
            placeholder="How was your day? What did you learn?"
            className="w-full h-40 bg-[#121B2B] rounded-2xl p-4 border border-white/10 outline-none resize-none"
          ></textarea>

          <button className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl transition">
            Save Entry
          </button>
        </section>
      </main>
    </div>
  );
}