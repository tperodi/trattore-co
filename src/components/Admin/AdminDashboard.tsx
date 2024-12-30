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
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Insights</h1>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Top 5 Eventi per Prenotazioni</h2>
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
                    <ul className="space-y-2">
                        {topEvents.map(event => (
                            <li key={event.titolo} className="flex justify-between">
                                <span className="font-medium text-gray-700">{event.titolo}</span>
                                <span className="text-gray-500">Capienza: {event.capienza} | Stato: {event.stato}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
