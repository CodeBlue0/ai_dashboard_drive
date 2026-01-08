import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ContextAnalysis() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/model2.json')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error('Error loading Model 2 data:', err));
    }, []);

    if (!data) return <div className="flex flex-1 items-center justify-center">Loading...</div>;

    // Parse object movements for cards
    const vehicleContextItems = data.object_movements ? data.object_movements.map(item => ({
        title: item.id || 'Unknown',
        desc: item.description || ''
    })) : [];

    return (
        <div className="px-4 md:px-8 lg:px-12 flex flex-col py-4">
            <div className="layout-content-container flex flex-col max-w-[1600px] w-full mx-auto flex-1 gap-4">
                {/* Header & Metrics Compact Row */}
                <div className="flex items-end justify-between gap-6 shrink-0">
                    <div className="flex flex-col gap-1">
                        <Link to="/" className="text-primary hover:underline flex items-center gap-1 text-sm mb-1">
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                            대시보드로 돌아가기
                        </Link>
                        <h1 className="text-slate-900 text-[32px] font-bold leading-none">모델 2 분석 결과 - 맥락 이해</h1>
                        <p className="text-slate-600 text-lg">비디오 맥락 이해 및 시나리오 설명</p>
                    </div>

                    {/* Metrics - Compact */}
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center justify-center px-6 py-2 rounded-lg bg-purple-50 border border-purple-100">
                            <span className="text-xs text-purple-700 font-bold uppercase">프레임</span>
                            <span className="text-xl font-bold text-purple-900 leading-none">15개</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col gap-4">

                    {/* Upper Section: Summary + Short Items */}
                    <div className="grid grid-cols-12 gap-4">
                        {/* Situation Summary (Left 7/12) */}
                        <div className="col-span-12 lg:col-span-7 flex flex-col rounded-xl p-5 bg-white border border-slate-200 shadow-sm overflow-y-auto">
                            <div className="flex items-center gap-2 mb-3 shrink-0">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-blue-500 text-[20px]">summarize</span>
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">상황 요약</h2>
                            </div>
                            <p className="text-slate-700 text-lg leading-relaxed">
                                {data.overall_situation || data.situation_summary}
                            </p>
                        </div>

                        {/* Right Stack (Right 5/12) */}
                        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
                            {/* Pedestrian */}
                            <div className="flex-1 rounded-xl p-5 bg-white border border-slate-200 shadow-sm flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-amber-600 text-[20px]">directions_walk</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900">돌발 이벤트</h2>
                                </div>
                                <div className="bg-amber-50 border-l-4 border-amber-500 px-4 py-2 rounded-r-lg">
                                    <p className="text-slate-700 text-lg">
                                        {Array.isArray(data.sudden_events)
                                            ? data.sudden_events.join(' ')
                                            : (data.sudden_events || data.pedestrian_events)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lower Section: Vehicle Context (Horizontal) */}
                    <div className="rounded-xl p-5 bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-indigo-500 text-[20px]">directions_car</span>
                            </div>
                            <h2 className="text-xl font-bold text-slate-900">차량 맥락</h2>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                            {vehicleContextItems.map((item, index) => (
                                <div key={index} className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-lg">
                                    <h4 className="font-bold text-indigo-900 mb-1 text-lg">{item.title}</h4>
                                    <p className="text-slate-600 text-base leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Navigation Compact */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 shrink-0">
                    <Link
                        to="/video-analysis"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all text-base font-bold"
                    >
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        영상 분석
                    </Link>
                    <Link
                        to="/driver-score"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-base font-bold hover:bg-blue-600 transition-all shadow-sm hover:shadow-md"
                    >
                        운전자 점수
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
