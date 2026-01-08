import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DriverScore() {
    const [isComparing, setIsComparing] = useState(false);
    const [scoreData, setScoreData] = useState(null);

    useEffect(() => {
        fetch('/model3.json')
            .then(res => res.json())
            .then(data => setScoreData(data))
            .catch(err => console.error('Error fetching model3 data:', err));
    }, []);

    const handleCompare = () => {
        setIsComparing(true);
        setTimeout(() => setIsComparing(false), 1500);
    };

    if (!scoreData) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1400px] flex-1 gap-6 mb-10">
                {/* Page Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-slate-900 text-[32px] font-bold leading-tight">모델 3 분석 결과 - 정당성 판단</h1>
                    </div>
                    <p className="text-slate-600 text-sm">운전 행동의 정당성을 평가하고 분석합니다</p>
                </div>

                {/* Main Grid - 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Probability Gauge */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl p-6 bg-white border border-slate-200 shadow-sm h-full">
                            <h3 className="text-slate-900 font-bold mb-6 text-xl">정당성 확률</h3>

                            {/* Circular Gauge */}
                            <div className="relative w-full aspect-square max-w-[280px] mx-auto">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                                    {/* Background circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="85"
                                        fill="none"
                                        stroke="#e2e8f0"
                                        strokeWidth="20"
                                    />
                                    {/* Progress circle */}
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="85"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="20"
                                        strokeDasharray={`${scoreData.justification_score * 5.34} ${100 * 5.34}`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-6xl font-bold text-slate-900 leading-none">{scoreData.justification_score}%</span>

                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="mt-6 text-center">
                                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-6 py-3 rounded-lg">
                                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                    <span className="text-base font-bold">{scoreData.justification_level}</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                                    {scoreData.analysis_result_text}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Analysis Text */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl p-6 bg-white border border-slate-200 shadow-sm h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
                                <h3 className="text-slate-900 font-bold text-xl">AI 분석 의견</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Positive Factors */}
                                <div>
                                    <h4 className="text-emerald-600 font-bold mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                                        긍정적 요인
                                    </h4>
                                    <ul className="space-y-2 text-slate-700 text-sm">
                                        {scoreData.positive_factors.map((factor, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-emerald-500 mt-1">•</span>
                                                <span>{factor}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Areas for Improvement */}
                                <div>
                                    <h4 className="text-amber-600 font-bold mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">warning</span>
                                        개선 권장 사항
                                    </h4>
                                    <ul className="space-y-2 text-slate-700 text-sm">
                                        {scoreData.improvement_recommendations.map((rec, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-amber-500 mt-1">•</span>
                                                <span>{rec}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Conclusion */}
                                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                                    <h4 className="text-slate-900 font-bold mb-2">종합 평가</h4>
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        {scoreData.comprehensive_evaluation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Navigation */}
                <div className="flex justify-between items-center pt-8 mt-6 border-t border-slate-200">
                    <Link
                        to="/context-analysis"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-900 font-bold hover:border-primary hover:text-primary transition-all group"
                    >
                        <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        맥락 분석
                    </Link>
                </div>
            </div>
        </div>
    );
}
