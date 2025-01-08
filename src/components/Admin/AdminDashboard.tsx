"use client";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type EventData = {
    titolo: string;
    capienza: number;
    stato: string;
    prenotazioni: number;
};

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<EventData[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/AdminDashboard/events-more-book");
                if (!response.ok) throw new Error("Errore nel caricamento dei dati");
                const result = await response.json();
                if (!result.events) throw new Error("Dati degli eventi mancanti dall'API");
                setData(result.events);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) return <div className="p-6 text-center">Caricamento in corso...</div>;
    if (error) return <div className="p-6 text-center text-red-500">Errore: {error}</div>;

    const topEvents = data?.slice(0, 5) || [];

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Dashboard Insights</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h2 className="text-base sm:text-lg font-medium mb-2">Top 5 Eventi per Prenotazioni</h2>
                    <Pie
                        data={{
                            labels: topEvents.map(event => event.titolo),
                            datasets: [
                                {
                                    label: "Prenotazioni",
                                    data: topEvents.map(event => event.prenotazioni),
                                    backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#4BC0C0", "#66BB6A"],
                                },
                            ],
                        }}
                        options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
                    />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-lg font-medium mb-4">Capacità e Stato Eventi</h2>
    <ul className="divide-y divide-gray-200">
        {topEvents.map((event) => (
            <li key={event.titolo} className="py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="block text-gray-800 font-semibold">{event.titolo}</span>
                        <span className="block text-gray-500 text-sm">Stato: {event.stato}</span>
                    </div>
                    <span className="text-gray-600 text-sm">
                        Capienza: <strong>{event.capienza}</strong>
                    </span>
                </div>
            </li>
        ))}
    </ul>
</div>

            </section>
        </div>
    );
};

export default Dashboard;