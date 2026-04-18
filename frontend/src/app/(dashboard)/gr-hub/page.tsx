"use client";

import React from "react";
import { Gavel, Search, Filter, Calendar, Users, AlertTriangle, ExternalLink } from "lucide-react";

const programs = [
  { id: 1, title: "2024년 시스템 반도체 기술개발 지원사업", agency: "산업부", type: "R&D", budget: "25억", status: "In Progress", deadline: "2024-05-15" },
  { id: 2, title: "에너지 탄소중립 기술 혁신 과제", agency: "환경부", type: "R&D", budget: "1.2억", status: "Draft", deadline: "2024-06-01" },
  { id: 3, title: "수출 유망 중소기업 글로벌 마케팅 지원", agency: "KOTRA", type: "Voucher", budget: "0.5억", status: "Submitted", deadline: "2024-04-30" },
  { id: 4, title: "제조업 AI 융합 생산성 향상 과제", agency: "기재부", type: "Incentive", budget: "미정", status: "Radar", deadline: "2024-07-20" },
];

export default function GRHubPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cmtx-blue text-white rounded-2xl shadow-lg shadow-cmtx-blue/20">
            <Gavel className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-cmtx-navy">GR Hub</h2>
            <p className="text-cmtx-secondary font-medium">대외협력 및 정부과제 오퍼레이션 센터</p>
          </div>
        </div>
        <div className="flex gap-2">
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search programs..."
                    className="pl-10 pr-4 py-2 bg-white border border-cmtx-border rounded-lg text-sm focus:ring-2 focus:ring-cmtx-blue/20 outline-none w-64"
                />
            </div>
            <button className="p-2 border border-cmtx-border bg-white rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4 text-cmtx-secondary" />
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-6">
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-cmtx-navy uppercase text-sm tracking-wider">Opportunity Inbox</h3>
                    <span className="px-2.5 py-1 bg-cmtx-blue/10 text-cmtx-blue rounded text-[10px] font-bold">4 NEW PROGRAMS</span>
                </div>
                <div className="overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-cmtx-border">
                                <th className="pb-4 text-[10px] font-bold text-cmtx-secondary uppercase">Program Name</th>
                                <th className="pb-4 text-[10px] font-bold text-cmtx-secondary uppercase">Agency</th>
                                <th className="pb-4 text-[10px] font-bold text-cmtx-secondary uppercase">Budget</th>
                                <th className="pb-4 text-[10px] font-bold text-cmtx-secondary uppercase text-right">Deadline</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-cmtx-border">
                            {programs.map((p) => (
                                <tr key={p.id} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                                    <td className="py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-cmtx-navy group-hover:text-cmtx-blue transition-colors line-clamp-1">{p.title}</span>
                                            <span className="text-[10px] text-cmtx-secondary font-medium mt-1">{p.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-xs font-bold text-cmtx-navy">{p.agency}</td>
                                    <td className="py-4 text-xs font-medium text-cmtx-secondary">{p.budget}</td>
                                    <td className="py-4 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-bold text-cmtx-navy">{p.deadline}</span>
                                            <span className="text-[10px] font-bold text-rose-500 mt-1 uppercase">D-14</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
            <div className="card border-l-4 border-l-cmtx-blue">
                <h3 className="font-bold text-cmtx-navy text-sm mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cmtx-blue" />
                    Deadline Radar
                </h3>
                <div className="space-y-4">
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-rose-600 uppercase">Immediate</span>
                            <span className="text-[10px] font-bold text-rose-600">D-3</span>
                        </div>
                        <p className="text-xs font-bold text-cmtx-navy mb-2">글로벌 강소기업 육성 프로젝트</p>
                        <div className="w-full bg-rose-200 h-1 rounded-full overflow-hidden">
                            <div className="bg-rose-600 h-full w-[80%]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 className="font-bold text-cmtx-navy text-sm mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-cmtx-blue" />
                    Stakeholder CRM
                </h3>
                <div className="space-y-3">
                    {[
                        { name: "김정훈 과장", org: "산업통상자원부", tag: "Main" },
                        { name: "이소연 주무관", org: "중소벤처기업부", tag: "Support" },
                        { name: "박준서 센터장", org: "KIAT", tag: "Tech" },
                    ].map((person, i) => (
                        <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-cmtx-navy">
                                    {person.name[0]}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-cmtx-navy">{person.name}</p>
                                    <p className="text-[10px] text-cmtx-secondary">{person.org}</p>
                                </div>
                            </div>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-tighter">
                                {person.tag}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card bg-cmtx-navy text-white border-none shadow-xl shadow-cmtx-navy/20">
                <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <h3 className="font-bold text-sm text-white">Policy Alert</h3>
                </div>
                <p className="text-[11px] leading-relaxed text-gray-400 mb-4">
                    국가전산 인프라 현대화 사업 예산이 차기 분기 15% 삭감될 가능성이 보고되었습니다. 관련 대비 시나리오 기획이 필요합니다.
                </p>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                    View Briefing <ExternalLink className="w-3 h-3" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
