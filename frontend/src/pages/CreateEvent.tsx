
import styles from "./pages.module.css";
import CreateEventTool from "../components/event-administration/create-event/createEventTool";


const CreateEvent: React.FC = () => {

    


  return (
    <div className={styles.body}>
      <CreateEventTool />
    </div>
  );
};

export default CreateEvent;
