"use client";
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div className="header-content">
                <div className="logo">DevMatch</div>
                <nav className="nav-menu">
                    <Link href="/" className="btn">프로젝트 찾기</Link>
                    <Link href="#" className="btn">팀원 찾기</Link>
                    <Link href="#" className="btn">질문</Link>
                </nav>
                <div className="auth-buttons">
                    <button className="btn btn-outline">로그인</button>
                    <button className="btn btn-primary">회원가입</button>
                </div>
            </div>
        </header>
    );
}