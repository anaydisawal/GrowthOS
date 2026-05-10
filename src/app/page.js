"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const today = new Date().toLocaleDateString();

  const [maths, setMaths] = useState("0");
  const [coding, setCoding] = useState("0");
  const [exercise, setExercise] = useState("0");
  const [audiobook, setAudiobook] = useState("0");
  const [chanting, setChanting] = useState("0");
  const [reflection, setReflection] = useState("");

  // Load today's data
  useEffect(() => {
    const fetchTodayData = async () => {
      const { data, error } = await supabase
        .from("daily_logs")
        .select("*")
        .eq("date", today)
        .limit(1);

      if (data && data.length > 0) {
        const entry = data[0];

        setMaths(entry.maths || "0");
        setCoding(entry.coding || "0");
        setExercise(entry.exercise || "0");
        setAudiobook(entry.audiobook || "0");
        setChanting(entry.chanting || "0");
        setReflection(entry.reflection || "");
      }
    };

    fetchTodayData();
  }, [today]);

  // Goal Logic
  const mathsDone = Number(maths) >= 2;
  const codingDone = Number(coding) >= 1;
  const exerciseDone = Number(exercise) >= 45;
  const audiobookDone = Number(audiobook) >= 30;
  const chantingDone = Number(chanting) >= 2;

  // Productivity
  const productivity =
    (mathsDone ? 20 : 0) +
    (codingDone ? 20 : 0) +
    (exerciseDone ? 20 : 0) +
    (audiobookDone ? 20 : 0) +
    (chantingDone ? 20 : 0);

  const completedGoals = [
    mathsDone,
    codingDone,
    exerciseDone,
    audiobookDone,
    chantingDone,
  ].filter(Boolean).length;

  // Save Today's Entry
  const saveToCloud = async () => {
    const { data: existing } = await supabase
      .from("daily_logs")
      .select("*")
      .eq("date", today)
      .limit(1);

    if (existing && existing.length > 0) {
      await supabase
        .from("daily_logs")
        .update({
          maths,
          coding,
          exercise,
          audiobook,
          chanting,
          reflection,
        })
        .eq("date", today);
    } else {
      await supabase.from("daily_logs").insert([
        {
          date: today,
          maths,
          coding,
          exercise,
          audiobook,
          chanting,
          reflection,
        },
      ]);
    }

    alert("Saved Successfully 🚀");
  };

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
              {today}
            </p>
          </div>

          <button
            onClick={saveToCloud}
            className="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/20 transition"
          >
            Save Day
          </button>
        </div>

        {/* Stats */}
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
          <h2 className="text-2xl font-bold mb-6">
            Today's Progress
          </h2>

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

        {/* Reflection */}
        <section className="bg-[#0B1220] rounded-3xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold mb-5">
            Daily Reflection
          </h2>

          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="How was your day? What did you learn?"
            className="w-full h-40 bg-[#121B2B] rounded-2xl p-4 border border-white/10 outline-none resize-none"
          ></textarea>

          <button
            onClick={saveToCloud}
            className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-2xl transition"
          >
            Save Entry
          </button>
        </section>
      </main>
    </div>
  );
}