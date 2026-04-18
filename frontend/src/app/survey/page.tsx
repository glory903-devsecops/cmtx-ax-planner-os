"use client";

import React, { useState } from "react";
import { ClipboardCheck, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

const randomQuestions = [
  "현재 업무 프로세스에서 가장 많은 시간이 소요되는 단순 반복 작업은 무엇인가요?",
  "부서 내에서 생성되는 데이터 중 디지털화가 시급하다고 느끼는 항목은?",
  "결재나 보고 과정에서 발생하는 비효율적인 단계가 있다면?",
  "AI가 도입된다면 본인의 업무 중 어떤 부분을 가장 먼저 대체하고 싶나요?",
  "협업 부서와의 정보 공유 시 발생하는 가장 큰 병목 현상은?",
];

export default function SurveyPage() {
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [id, setId] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const [questions] = useState(() => {
    return [...randomQuestions].sort(() => 0.5 - Math.random()).slice(0, 3);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || id.length < 4) {
      setError("올바른 직원코드를 입력해주세요.");
      return;
    }
    if (!consent) {
      setError("개인정보 활용 동의가 필요합니다.");
      return;
    }
    
    // Simulate API call
    console.log("Submitting survey for:", id);
    setStep(2);
  };

  if (step === 2) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-cmtx-navy">설문 제출 완료</h2>
        <p className="text-cmtx-secondary text-lg">
          제출해주신 소중한 의견은 CMTX AX 기획 및 업무 프로세스 개선의 핵심 기초 자료로 활용됩니다.<br/>
          참여해주셔서 감사합니다.
        </p>
        <button 
          onClick={() => window.location.href = "/"}
          className="mt-10 px-8 py-3 bg-cmtx-navy text-white rounded-xl font-bold hover:bg-cmtx-navy/90 transition-all shadow-xl shadow-cmtx-navy/20"
        >
          대시보드로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-cmtx-blue/10 text-cmtx-blue rounded-2xl">
          <ClipboardCheck className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-cmtx-navy tracking-tight">AX Friction Survey</h2>
          <p className="text-cmtx-secondary font-medium mt-1">사내 업무 혁신을 위한 병목 지점(Friction) 발굴 설문</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Verification Section */}
        <div className="card space-y-6">
          <div className="flex items-center gap-2 text-sm font-bold text-cmtx-navy border-b border-cmtx-border pb-4">
             <ShieldCheck className="w-4 h-4 text-cmtx-blue" />
             기본 정보 및 동의
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-cmtx-navy uppercase">직원코드</label>
              <input 
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Ex. 20240101"
                className="w-full px-4 py-3 rounded-lg border border-cmtx-border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cmtx-blue/20 focus:border-cmtx-blue outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-cmtx-border rounded-xl space-y-3">
            <div className="flex items-start gap-3">
              <input 
                type="checkbox" 
                id="consent" 
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-cmtx-blue focus:ring-cmtx-blue"
              />
              <label htmlFor="consent" className="text-xs leading-relaxed text-cmtx-secondary font-medium">
                본 설문은 익명으로 처리되지 않으며, 사내 인사 정보와 결합되어 AX 기획 및 업무 프로세스 개선 목적의 분석에 활용됩니다. 개인 평가 목적으로 사용되지 않습니다.
              </label>
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="card space-y-8">
          <div className="flex items-center gap-2 text-sm font-bold text-cmtx-navy border-b border-cmtx-border pb-4">
             <CheckCircle2 className="w-4 h-4 text-cmtx-blue" />
             설문 항목
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-bold text-cmtx-navy flex gap-2">
                <span className="text-cmtx-blue">Q1.</span>
                현재 수행 중인 업무 중 가장 비효율적이라고 느껴지는 부분에 대해 자유롭게 기술해주세요.
              </p>
              <textarea 
                rows={4}
                placeholder="업무 명칭, 소요 시간, 비효율의 원인 등을 구체적으로 적어주세요."
                className="w-full px-4 py-3 rounded-lg border border-cmtx-border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cmtx-blue/20 focus:border-cmtx-blue outline-none transition-all font-medium text-sm"
              />
            </div>

            {questions.map((q, idx) => (
              <div key={idx} className="space-y-3 pt-4 border-t border-cmtx-border/50">
                <p className="text-sm font-bold text-cmtx-navy flex gap-2">
                  <span className="text-cmtx-blue">Q{idx + 2}.</span>
                  {q}
                </p>
                <textarea 
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg border border-cmtx-border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-cmtx-blue/20 focus:border-cmtx-blue outline-none transition-all font-medium text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold animate-pulse">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <button 
          type="submit"
          className="w-full py-4 bg-cmtx-blue text-white rounded-xl font-bold text-lg hover:bg-cmtx-blue/90 shadow-xl shadow-cmtx-blue/20 transition-all transform active:scale-[0.98]"
        >
          설문 제출하기
        </button>
      </form>
    </div>
  );
}
