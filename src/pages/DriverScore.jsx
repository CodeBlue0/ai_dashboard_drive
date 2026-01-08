import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function DriverScore() {
    const [isComparing, setIsComparing] = useState(false);

    const handleCompare = () => {
        setIsComparing(true);
        setTimeout(() => setIsComparing(false), 1500);
    };

    return (
        <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1400px] flex-1 gap-6 mb-10">
                {/* Page Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-slate-900 text-[32px] font-bold leading-tight">모델 3 분석 결과 - 정당성 판단</h1>
                        <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-lg text-xs font-bold">모델 3</span>
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
                                        strokeDasharray={`${87 * 5.34} ${100 * 5.34}`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-6xl font-bold text-slate-900 leading-none">87%</span>

                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="mt-6 text-center">
                                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-500 px-6 py-3 rounded-lg">
                                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                    <span className="text-base font-bold">정당한 운전 행동</span>
                                </div>
                                <p className="text-sm text-slate-600 mt-4">
                                    분석 결과, 해당 상황에서의 운전 행동은<br />
                                    87%의 확률로 정당한 것으로 판단됩니다.
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
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-500 mt-1">•</span>
                                            <span>주간 시간대로 시야 확보가 양호한 상태</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-500 mt-1">•</span>
                                            <span>고속도로 환경에서 일관된 차선 유지</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-500 mt-1">•</span>
                                            <span>전방 차량들과의 안전거리 확보 노력</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-500 mt-1">•</span>
                                            <span>주변 차량(세단, SUV, 트럭) 인지 및 대응</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Areas for Improvement */}
                                <div>
                                    <h4 className="text-amber-600 font-bold mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[18px]">warning</span>
                                        개선 권장 사항
                                    </h4>
                                    <ul className="space-y-2 text-slate-700 text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500 mt-1">•</span>
                                            <span>00:00~00:04 구간에서 전방 차량과의 거리가 급격히 감소</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500 mt-1">•</span>
                                            <span>선행 차량의 감속 상황을 조기에 인지하고 미리 속도 조절 필요</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-amber-500 mt-1">•</span>
                                            <span>교통 흐름 예측을 통한 사전 대응으로 안전성 향상 가능</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Conclusion */}
                                <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg">
                                    <h4 className="text-slate-900 font-bold mb-2">종합 평가</h4>
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        전체적으로 정당한 운전 행동으로 판단되나, 전방 교통 흐름에 대한 예측력을 높여 보다 안전한 주행을 권장합니다.
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
