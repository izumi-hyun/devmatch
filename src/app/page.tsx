import styles from "../styles/page.module.css";
import HeroSection from "../components/HeroSection";
import SearchSection from "../components/SearchSection";
import ProjectGrid from "../components/ProjectGrid";
export default function Home() {
  return (
    <div className={styles.page}>
      
      <HeroSection/>
      <SearchSection />
      <ProjectGrid />
    </div>
  );
}
