import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function VideoAnalysis() {
    const [detections, setDetections] = useState([]);
    const [currentDetections, setCurrentDetections] = useState([]);
    const [yoloData, setYoloData] = useState(null);
    const videoRef = useRef(null);

    // Load YOLO detection data
    useEffect(() => {
        fetch('/yolo_detections.json')
            .then(res => res.json())
            .then(data => {
                setYoloData(data);
                // Initialize with first frame detections
                if (data.detections && data.detections.length > 0) {
                    updateDetections(data.detections[0].objects);
                }
            })
            .catch(err => console.error('Error loading YOLO data:', err));
    }, []);

    // Map class names to Korean
    const classNameMap = {
        'car': '승용차',
        'truck': '트럭',
        'traffic_light': '신호등',
        'pedestrian': '보행자',
        'motorcycle': '오토바이'
    };

    // Map class names to icons and colors
    const classStyleMap = {
        'car': { icon: 'directions_car', text: 'text-blue-500', bg: 'bg-blue-500' },
        'truck': { icon: 'local_shipping', text: 'text-gray-500', bg: 'bg-gray-500' },
        'traffic_light': { icon: 'traffic', text: 'text-blue-400', bg: 'bg-blue-400' },
        'pedestrian': { icon: 'pedestrian', text: 'text-yellow-400', bg: 'bg-yellow-400' },
        'motorcycle': { icon: 'two_wheeler', text: 'text-gray-400', bg: 'bg-gray-400' }
    };

    // Update detections based on video time
    const updateDetections = (objects) => {
        const detectionArray = objects.map(obj => {
            const percent = obj.risk_score !== undefined ? Math.round(obj.risk_score * 100) : 0;
            const defaultBg = classStyleMap[obj.class]?.bg || 'bg-gray-400';
            const bgClass = percent >= 70 ? 'bg-red-500' : defaultBg;

            return {
                name: `${classNameMap[obj.class] || obj.class} ${obj.id}`,
                icon: classStyleMap[obj.class]?.icon || 'help',
                textClass: classStyleMap[obj.class]?.text || 'text-gray-400',
                bgClass: bgClass,
                percent: percent,
                isRisk: true
            };
        });
        setDetections(detectionArray);
    };

    // Handle video time update
    const handleTimeUpdate = () => {
        if (!videoRef.current || !yoloData) return;

        const currentTime = videoRef.current.currentTime;

        // Find the closest detection frame
        const closest = yoloData.detections.reduce((prev, curr) => {
            return Math.abs(curr.timestamp - currentTime) < Math.abs(prev.timestamp - currentTime) ? curr : prev;
        });

        if (closest) {
            updateDetections(closest.objects);
        }
    };

    return (
        <div className="px-4 md:px-10 lg:px-20 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1400px] flex-1 gap-6 mb-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-base">
                    <Link to="/" className="text-primary hover:underline flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        대시보드로 돌아가기
                    </Link>
                </div>

                {/* Page Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-slate-900 text-[36px] font-bold leading-tight">모델 1 결과 - 영상 분석</h1>
                    <p className="text-slate-600 text-lg">블랙박스 영상 데이터 입력 및 사고 확률 검증 결과 보고서</p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Video Player - 2 columns */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {/* Video Player */}
                        <div className="rounded-xl overflow-hidden bg-white border border-slate-200 shadow-xl">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
                                <div className="flex items-center gap-2 text-base">
                                    <span className="material-symbols-outlined text-red-500 text-[18px] animate-pulse">fiber_manual_record</span>
                                    <span className="text-slate-900 font-medium">재생 // 전방 카메라</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-slate-500 hover:text-slate-900 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">settings</span>
                                    </button>
                                    <button className="text-slate-500 hover:text-slate-900 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                                    </button>
                                </div>
                            </div>
                            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
                                {/* Actual Video Player */}
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-cover"
                                    controls
                                    autoPlay
                                    loop
                                    muted
                                    onTimeUpdate={handleTimeUpdate}
                                >
                                    <source src="/result_real.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>

                    {/* Right: Detection Results - 1 column */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        {/* Accident Probability */}
                        <div className="rounded-xl p-5 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="material-symbols-outlined text-[24px]">analytics</span>
                                <h3 className="font-bold text-xl">사고 확률</h3>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-6xl font-bold">
                                    {yoloData?.model_prediction_prob !== undefined
                                        ? Math.round(yoloData.model_prediction_prob * 100)
                                        : 0}
                                </span>
                                <span className="text-3xl mb-1">%</span>
                            </div>
                            <p className="text-blue-100 text-base mt-2">AI 모델 예측 결과</p>
                        </div>

                        {/* Real-time Object Detection */}
                        <div className="rounded-xl p-5 bg-white border border-slate-200 shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-slate-900 font-bold text-xl">실시간 객체 감지</h3>
                            </div>

                            <div className="space-y-4">
                                {detections.map((detection, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`material-symbols-outlined ${detection.textClass} text-[24px]`}>{detection.icon}</span>
                                                <span className="text-slate-900 text-lg font-medium">{detection.name}</span>
                                            </div>
                                            <span className="text-slate-900 font-bold text-lg">
                                                {detection.isRisk ? 'Risk ' : ''}{detection.percent}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                            <div
                                                className={`${detection.bgClass} h-full rounded-full transition-all duration-500`}
                                                style={{ width: `${detection.percent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Navigation */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-200 mt-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-900 font-bold hover:border-primary hover:text-primary transition-all group"
                    >
                        <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        대시보드
                    </Link>
                    <Link
                        to="/context-analysis"
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold hover:bg-blue-600 transition-all group"
                    >
                        맥락 분석
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
