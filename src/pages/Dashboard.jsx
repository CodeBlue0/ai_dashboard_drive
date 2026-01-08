import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'video/mp4' || file.type === 'video/x-msvideo')) {
            setSelectedFile(file);
        } else {
            alert('Please select a valid video file (MP4 or AVI)');
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && (file.type === 'video/mp4' || file.type === 'video/x-msvideo')) {
            setSelectedFile(file);
        } else {
            alert('Please drop a valid video file (MP4 or AVI)');
        }
    };

    const handleAnalyze = () => {
        if (!selectedFile) {
            alert('Please select a video file first');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    // Navigate to video analysis page after upload
                    setTimeout(() => {
                        navigate('/video-analysis');
                    }, 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[800px] flex-1 gap-6">
                {/* Video Upload Section */}
                <div className="flex flex-col gap-4">
                    <div className="@container">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-slate-900 tracking-light text-[28px] font-bold leading-tight">영상 입력</h1>

                            {/* Video Player / Upload Area */}
                            <div
                                className="relative group w-full aspect-video rounded-xl overflow-hidden bg-white border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all shadow-lg"
                                style={{
                                    backgroundImage: selectedFile ? 'none' : "linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDy6XXR4XTS2VO1Wrr4XOXSQCupszU3e-n_fdL3kqlejdjgaPv7bPJx83wyeispXwxFZhMTPgmeqfGU-WVsevIwho_9_mZ75K131sAAxN3IKvaZZ061QqJeWUTkrkvkYTqEOqgFm43mWDqQoaMY70XRMKawoB0VLvHfT4wl4bhheO1cRgepH_KeNKy5svYkWATaBOHtDJqdat65S6hQ3dhfv91Zy8JpwhKEHerNyqS0ro7U9_Bl2GhvHJ8tZ3TfrPKm46zuwLR0m_4')",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundColor: selectedFile ? '#f8f9fa' : 'transparent'
                                }}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={() => !isUploading && document.getElementById('file-input').click()}
                            >
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
                                <div className="relative z-10 flex flex-col items-center gap-4 text-center p-6">
                                    {selectedFile ? (
                                        <>
                                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-emerald-500 text-4xl">check_circle</span>
                                            </div>
                                            <div>
                                                <p className="text-white text-xl font-bold">{selectedFile.name}</p>
                                                <p className="text-gray-300 text-sm mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                            </div>
                                            {isUploading && (
                                                <div className="w-full max-w-xs mt-2">
                                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                                        <div
                                                            className="bg-primary h-2 rounded-full transition-all duration-300"
                                                            style={{ width: `${uploadProgress}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-white text-sm mt-2">Uploading... {uploadProgress}%</p>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-primary text-4xl">upload_file</span>
                                            </div>
                                            <div>
                                                <p className="text-white text-xl font-bold">블랙박스 동영상 업로드</p>
                                                <p className="text-gray-300 text-sm">MP4, AVI 형식 지원</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <input
                                    id="file-input"
                                    type="file"
                                    accept="video/mp4,video/x-msvideo"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analyze Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleAnalyze}
                        disabled={!selectedFile || isUploading}
                        className={`px-8 py-3 rounded-lg text-white font-bold text-base transition-all flex items-center gap-2 ${selectedFile && !isUploading
                            ? 'bg-primary hover:bg-blue-600 shadow-lg'
                            : 'bg-slate-300 cursor-not-allowed'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">play_circle</span>
                        {isUploading ? '처리 중...' : '동영상 분석'}
                    </button>
                </div>

                {/* Info Section */}
                <div className="mt-4 rounded-xl p-6 bg-white border border-slate-200 shadow-sm">
                    <h3 className="text-slate-900 font-bold mb-3">분석 프로세스</h3>
                    <div className="space-y-2 text-sm text-slate-600">
                        <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                            <p><strong>Model 1:</strong> 영상 분석 및 객체 감지</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                            <p><strong>Model 2:</strong> 맥락 이해 및 텍스트 생성</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">check_circle</span>
                            <p><strong>Model 3:</strong> 운전자 점수 평가</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
