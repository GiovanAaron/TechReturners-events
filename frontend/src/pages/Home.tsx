import react from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import HeaderNavBar from "../components/header-nav-bar/HeaderNavBar";
import SmallEvent from "../components/event-views/small-event/SmallEvent";

import styles from "./pages.module.css"

const Home: React.FC = () => {
  return (
    <>
    <HeaderNavBar/>
    <div className={styles.body}>
      <h4>The Job Fair for...</h4>
      <h4>Tech, AI & Digital Professionals</h4>
      <p style={{maxWidth: '40rem'}} >
  {`Tech Jobs Fair connects over 60k+ attendees, 500+ companies and 400+ partners in 16 countries. It serves as a juncture for advancing careers and finding top talent in the AI, IT, and Digital industries, providing opportunities to engage with industry experts and network with professionals worldwide.`.replace(/  +/g, "\n")}
</p>
      <h4>Next Event:
      14th of May 2025 13:09 to 19:00 (GMT)</h4>
      <button>Free TR Manchester Ticket</button>
      <div className={styles.divider}></div>
      <h4>Upcoming Events</h4>
      <SmallEvent region="England" date="17th Mar 2025" eventType="Job Fair" />
    </div>
    </>
  );
};

export default Home;
